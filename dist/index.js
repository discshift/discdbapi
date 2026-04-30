// package.json
var version = "1.0.0";

// src/constants.ts
var DISCDB_ORIGIN = "https://thediscdb.com";

// src/genql/runtime/error.ts
class GenqlError extends Error {
  errors = [];
  data;
  constructor(errors, data) {
    let message = Array.isArray(errors) ? errors.map((x) => x?.message || "").join(`
`) : "";
    if (!message) {
      message = "GraphQL error";
    }
    super(message);
    this.errors = errors;
    this.data = data;
  }
}

// src/genql/runtime/batcher.ts
function dispatchQueueBatch(client, queue) {
  let batchedQuery = queue.map((item) => item.request);
  if (batchedQuery.length === 1) {
    batchedQuery = batchedQuery[0];
  }
  (() => {
    try {
      return client.fetcher(batchedQuery);
    } catch (e) {
      return Promise.reject(e);
    }
  })().then((responses) => {
    if (queue.length === 1 && !Array.isArray(responses)) {
      if (responses.errors && responses.errors.length) {
        queue[0].reject(new GenqlError(responses.errors, responses.data));
        return;
      }
      queue[0].resolve(responses);
      return;
    } else if (responses.length !== queue.length) {
      throw new Error("response length did not match query length");
    }
    for (let i = 0;i < queue.length; i++) {
      if (responses[i].errors && responses[i].errors.length) {
        queue[i].reject(new GenqlError(responses[i].errors, responses[i].data));
      } else {
        queue[i].resolve(responses[i]);
      }
    }
  }).catch((e) => {
    for (let i = 0;i < queue.length; i++) {
      queue[i].reject(e);
    }
  });
}
function dispatchQueue(client, options) {
  const queue = client._queue;
  const maxBatchSize = options.maxBatchSize || 0;
  client._queue = [];
  if (maxBatchSize > 0 && maxBatchSize < queue.length) {
    for (let i = 0;i < queue.length / maxBatchSize; i++) {
      dispatchQueueBatch(client, queue.slice(i * maxBatchSize, (i + 1) * maxBatchSize));
    }
  } else {
    dispatchQueueBatch(client, queue);
  }
}

class QueryBatcher {
  fetcher;
  _options;
  _queue;
  constructor(fetcher, {
    batchInterval = 6,
    shouldBatch = true,
    maxBatchSize = 0
  } = {}) {
    this.fetcher = fetcher;
    this._options = {
      batchInterval,
      shouldBatch,
      maxBatchSize
    };
    this._queue = [];
  }
  fetch(query, variables, operationName, overrides = {}) {
    const request = {
      query
    };
    const options = Object.assign({}, this._options, overrides);
    if (variables) {
      request.variables = variables;
    }
    if (operationName) {
      request.operationName = operationName;
    }
    const promise = new Promise((resolve, reject) => {
      this._queue.push({
        request,
        resolve,
        reject
      });
      if (this._queue.length === 1) {
        if (options.shouldBatch) {
          setTimeout(() => dispatchQueue(this, options), options.batchInterval);
        } else {
          dispatchQueue(this, options);
        }
      }
    });
    return promise;
  }
  forceFetch(query, variables, operationName, overrides = {}) {
    const request = {
      query
    };
    const options = Object.assign({}, this._options, overrides, {
      shouldBatch: false
    });
    if (variables) {
      request.variables = variables;
    }
    if (operationName) {
      request.operationName = operationName;
    }
    const promise = new Promise((resolve, reject) => {
      const client = new QueryBatcher(this.fetcher, this._options);
      client._queue = [
        {
          request,
          resolve,
          reject
        }
      ];
      dispatchQueue(client, options);
    });
    return promise;
  }
}

// src/genql/runtime/fetcher.ts
var DEFAULT_BATCH_OPTIONS = {
  maxBatchSize: 10,
  batchInterval: 40
};
var createFetcher = ({
  url,
  headers = {},
  fetcher,
  fetch: _fetch,
  batch = false,
  ...rest
}) => {
  if (!url && !fetcher) {
    throw new Error("url or fetcher is required");
  }
  fetcher = fetcher || (async (body) => {
    let headersObject = typeof headers == "function" ? await headers() : headers;
    headersObject = headersObject || {};
    if (typeof fetch === "undefined" && !_fetch) {
      throw new Error("Global `fetch` function is not available, pass a fetch polyfill to Genql `createClient`");
    }
    let fetchImpl = _fetch || fetch;
    const res = await fetchImpl(url, {
      headers: {
        "Content-Type": "application/json",
        ...headersObject
      },
      method: "POST",
      body: JSON.stringify(body),
      ...rest
    });
    if (!res.ok) {
      throw new Error(`${res.statusText}: ${await res.text()}`);
    }
    const json = await res.json();
    return json;
  });
  if (!batch) {
    return async (body) => {
      const json = await fetcher(body);
      if (Array.isArray(json)) {
        return json.map((json2) => {
          if (json2?.errors?.length) {
            throw new GenqlError(json2.errors || [], json2.data);
          }
          return json2.data;
        });
      } else {
        if (json?.errors?.length) {
          throw new GenqlError(json.errors || [], json.data);
        }
        return json.data;
      }
    };
  }
  const batcher = new QueryBatcher(async (batchedQuery) => {
    const json = await fetcher(batchedQuery);
    return json;
  }, batch === true ? DEFAULT_BATCH_OPTIONS : batch);
  return async ({ query, variables }) => {
    const json = await batcher.fetch(query, variables);
    if (json?.data) {
      return json.data;
    }
    throw new Error("Genql batch fetcher returned unexpected result " + JSON.stringify(json));
  };
};

// src/genql/runtime/generateGraphqlOperation.ts
var parseRequest = (request, ctx, path) => {
  if (typeof request === "object" && "__args" in request) {
    const args = request.__args;
    let fields = { ...request };
    delete fields.__args;
    const argNames = Object.keys(args);
    if (argNames.length === 0) {
      return parseRequest(fields, ctx, path);
    }
    const field = getFieldFromPath(ctx.root, path);
    const argStrings = argNames.map((argName) => {
      ctx.varCounter++;
      const varName = `v${ctx.varCounter}`;
      const typing = field.args && field.args[argName];
      if (!typing) {
        throw new Error(`no typing defined for argument \`${argName}\` in path \`${path.join(".")}\``);
      }
      ctx.variables[varName] = {
        value: args[argName],
        typing
      };
      return `${argName}:$${varName}`;
    });
    return `(${argStrings})${parseRequest(fields, ctx, path)}`;
  } else if (typeof request === "object" && Object.keys(request).length > 0) {
    const fields = request;
    const fieldNames = Object.keys(fields).filter((k) => Boolean(fields[k]));
    if (fieldNames.length === 0) {
      throw new Error(`field selection should not be empty: ${path.join(".")}`);
    }
    const type = path.length > 0 ? getFieldFromPath(ctx.root, path).type : ctx.root;
    const scalarFields = type.scalar;
    let scalarFieldsFragment;
    if (fieldNames.includes("__scalar")) {
      const falsyFieldNames = new Set(Object.keys(fields).filter((k) => !Boolean(fields[k])));
      if (scalarFields?.length) {
        ctx.fragmentCounter++;
        scalarFieldsFragment = `f${ctx.fragmentCounter}`;
        ctx.fragments.push(`fragment ${scalarFieldsFragment} on ${type.name}{${scalarFields.filter((f) => !falsyFieldNames.has(f)).join(",")}}`);
      }
    }
    const fieldsSelection = fieldNames.filter((f) => !["__scalar", "__name"].includes(f)).map((f) => {
      const parsed = parseRequest(fields[f], ctx, [...path, f]);
      if (f.startsWith("on_")) {
        ctx.fragmentCounter++;
        const implementationFragment = `f${ctx.fragmentCounter}`;
        const typeMatch = f.match(/^on_(.+)/);
        if (!typeMatch || !typeMatch[1])
          throw new Error("match failed");
        ctx.fragments.push(`fragment ${implementationFragment} on ${typeMatch[1]}${parsed}`);
        return `...${implementationFragment}`;
      } else {
        return `${f}${parsed}`;
      }
    }).concat(scalarFieldsFragment ? [`...${scalarFieldsFragment}`] : []).join(",");
    return `{${fieldsSelection}}`;
  } else {
    return "";
  }
};
var generateGraphqlOperation = (operation, root, fields) => {
  const ctx = {
    root,
    varCounter: 0,
    variables: {},
    fragmentCounter: 0,
    fragments: []
  };
  const result = parseRequest(fields, ctx, []);
  const varNames = Object.keys(ctx.variables);
  const varsString = varNames.length > 0 ? `(${varNames.map((v) => {
    const variableType = ctx.variables[v].typing[1];
    return `$${v}:${variableType}`;
  })})` : "";
  const operationName = fields?.__name || "";
  return {
    query: [
      `${operation} ${operationName}${varsString}${result}`,
      ...ctx.fragments
    ].join(","),
    variables: Object.keys(ctx.variables).reduce((r, v) => {
      r[v] = ctx.variables[v].value;
      return r;
    }, {}),
    ...operationName ? { operationName: operationName.toString() } : {}
  };
};
var getFieldFromPath = (root, path) => {
  let current;
  if (!root)
    throw new Error("root type is not provided");
  if (path.length === 0)
    throw new Error(`path is empty`);
  path.forEach((f) => {
    const type = current ? current.type : root;
    if (!type.fields)
      throw new Error(`type \`${type.name}\` does not have fields`);
    const possibleTypes = Object.keys(type.fields).filter((i) => i.startsWith("on_")).reduce((types, fieldName) => {
      const field2 = type.fields && type.fields[fieldName];
      if (field2)
        types.push(field2.type);
      return types;
    }, [type]);
    let field = null;
    possibleTypes.forEach((type2) => {
      const found = type2.fields && type2.fields[f];
      if (found)
        field = found;
    });
    if (!field)
      throw new Error(`type \`${type.name}\` does not have a field \`${f}\``);
    current = field;
  });
  return current;
};

// src/genql/runtime/createClient.ts
var createClient = ({
  queryRoot,
  mutationRoot,
  subscriptionRoot,
  ...options
}) => {
  const fetcher = createFetcher(options);
  const client = {};
  if (queryRoot) {
    client.query = (request) => {
      if (!queryRoot)
        throw new Error("queryRoot argument is missing");
      const resultPromise = fetcher(generateGraphqlOperation("query", queryRoot, request));
      return resultPromise;
    };
  }
  if (mutationRoot) {
    client.mutation = (request) => {
      if (!mutationRoot)
        throw new Error("mutationRoot argument is missing");
      const resultPromise = fetcher(generateGraphqlOperation("mutation", mutationRoot, request));
      return resultPromise;
    };
  }
  return client;
};
// src/genql/runtime/linkTypeMap.ts
var linkTypeMap = (typeMap) => {
  const indexToName = Object.assign({}, ...Object.keys(typeMap.types).map((k, i) => ({ [i]: k })));
  let intermediaryTypeMap = Object.assign({}, ...Object.keys(typeMap.types || {}).map((k) => {
    const type = typeMap.types[k];
    const fields = type || {};
    return {
      [k]: {
        name: k,
        scalar: Object.keys(fields).filter((f) => {
          const [type2] = fields[f] || [];
          const isScalar = type2 && typeMap.scalars.includes(type2);
          if (!isScalar) {
            return false;
          }
          const args = fields[f]?.[1];
          const argTypes = Object.values(args || {}).map((x) => x?.[1]).filter(Boolean);
          const hasRequiredArgs = argTypes.some((str) => str && str.endsWith("!"));
          if (hasRequiredArgs) {
            return false;
          }
          return true;
        }),
        fields: Object.assign({}, ...Object.keys(fields).map((f) => {
          const [typeIndex, args] = fields[f] || [];
          if (typeIndex == null) {
            return {};
          }
          return {
            [f]: {
              type: indexToName[typeIndex],
              args: Object.assign({}, ...Object.keys(args || {}).map((k2) => {
                if (!args || !args[k2]) {
                  return;
                }
                const [
                  argTypeName,
                  argTypeString
                ] = args[k2];
                return {
                  [k2]: [
                    indexToName[argTypeName],
                    argTypeString || indexToName[argTypeName]
                  ]
                };
              }))
            }
          };
        }))
      }
    };
  }));
  const res = resolveConcreteTypes(intermediaryTypeMap);
  return res;
};
var resolveConcreteTypes = (linkedTypeMap) => {
  Object.keys(linkedTypeMap).forEach((typeNameFromKey) => {
    const type = linkedTypeMap[typeNameFromKey];
    if (!type.fields) {
      return;
    }
    const fields = type.fields;
    Object.keys(fields).forEach((f) => {
      const field = fields[f];
      if (field.args) {
        const args = field.args;
        Object.keys(args).forEach((key) => {
          const arg = args[key];
          if (arg) {
            const [typeName2] = arg;
            if (typeof typeName2 === "string") {
              if (!linkedTypeMap[typeName2]) {
                linkedTypeMap[typeName2] = { name: typeName2 };
              }
              arg[0] = linkedTypeMap[typeName2];
            }
          }
        });
      }
      const typeName = field.type;
      if (typeof typeName === "string") {
        if (!linkedTypeMap[typeName]) {
          linkedTypeMap[typeName] = { name: typeName };
        }
        field.type = linkedTypeMap[typeName];
      }
    });
  });
  return linkedTypeMap;
};
// src/genql/types.ts
var types_default = {
  scalars: [
    0,
    1,
    2,
    17,
    26,
    40
  ],
  types: {
    String: {},
    Boolean: {},
    Int: {},
    Query: {
      mediaItems: [
        8,
        {
          first: [
            2
          ],
          after: [
            0
          ],
          last: [
            2
          ],
          before: [
            0
          ],
          where: [
            4
          ],
          order: [
            5,
            "[MediaItemSortInput!]"
          ]
        }
      ],
      boxsets: [
        9,
        {
          first: [
            2
          ],
          after: [
            0
          ],
          last: [
            2
          ],
          before: [
            0
          ],
          where: [
            6
          ],
          order: [
            7,
            "[BoxsetSortInput!]"
          ]
        }
      ],
      mediaItemsByGroup: [
        10,
        {
          slug: [
            0,
            "String!"
          ],
          role: [
            0
          ],
          first: [
            2
          ],
          after: [
            0
          ],
          last: [
            2
          ],
          before: [
            0
          ],
          where: [
            4
          ],
          order: [
            5,
            "[MediaItemSortInput!]"
          ]
        }
      ],
      __typename: [
        0
      ]
    },
    MediaItemFilterInput: {
      and: [
        4
      ],
      or: [
        4
      ],
      id: [
        11
      ],
      title: [
        12
      ],
      slug: [
        12
      ],
      fullTitle: [
        12
      ],
      sortTitle: [
        12
      ],
      year: [
        11
      ],
      type: [
        12
      ],
      imageUrl: [
        12
      ],
      externalids: [
        13
      ],
      externalIdsId: [
        11
      ],
      releases: [
        14
      ],
      mediaItemGroups: [
        15
      ],
      plot: [
        12
      ],
      tagline: [
        12
      ],
      directors: [
        12
      ],
      writers: [
        12
      ],
      stars: [
        12
      ],
      genres: [
        12
      ],
      runtimeMinutes: [
        11
      ],
      runtime: [
        12
      ],
      contentRating: [
        12
      ],
      releaseDate: [
        16
      ],
      latestReleaseDate: [
        16
      ],
      dateAdded: [
        16
      ],
      __typename: [
        0
      ]
    },
    MediaItemSortInput: {
      id: [
        17
      ],
      title: [
        17
      ],
      slug: [
        17
      ],
      fullTitle: [
        17
      ],
      sortTitle: [
        17
      ],
      year: [
        17
      ],
      type: [
        17
      ],
      imageUrl: [
        17
      ],
      externalids: [
        18
      ],
      externalIdsId: [
        17
      ],
      plot: [
        17
      ],
      tagline: [
        17
      ],
      directors: [
        17
      ],
      writers: [
        17
      ],
      stars: [
        17
      ],
      genres: [
        17
      ],
      runtimeMinutes: [
        17
      ],
      runtime: [
        17
      ],
      contentRating: [
        17
      ],
      releaseDate: [
        17
      ],
      latestReleaseDate: [
        17
      ],
      dateAdded: [
        17
      ],
      __typename: [
        0
      ]
    },
    BoxsetFilterInput: {
      and: [
        6
      ],
      or: [
        6
      ],
      id: [
        11
      ],
      title: [
        12
      ],
      sortTitle: [
        12
      ],
      slug: [
        12
      ],
      imageUrl: [
        12
      ],
      release: [
        19
      ],
      releaseId: [
        11
      ],
      type: [
        12
      ],
      __typename: [
        0
      ]
    },
    BoxsetSortInput: {
      id: [
        17
      ],
      title: [
        17
      ],
      sortTitle: [
        17
      ],
      slug: [
        17
      ],
      imageUrl: [
        17
      ],
      release: [
        20
      ],
      releaseId: [
        17
      ],
      type: [
        17
      ],
      __typename: [
        0
      ]
    },
    MediaItemsConnection: {
      pageInfo: [
        21
      ],
      edges: [
        22
      ],
      nodes: [
        45
      ],
      __typename: [
        0
      ]
    },
    BoxsetsConnection: {
      pageInfo: [
        21
      ],
      edges: [
        23
      ],
      nodes: [
        44
      ],
      __typename: [
        0
      ]
    },
    MediaItemsByGroupConnection: {
      pageInfo: [
        21
      ],
      edges: [
        24
      ],
      nodes: [
        45
      ],
      __typename: [
        0
      ]
    },
    IntOperationFilterInput: {
      eq: [
        2
      ],
      neq: [
        2
      ],
      in: [
        2
      ],
      nin: [
        2
      ],
      gt: [
        2
      ],
      ngt: [
        2
      ],
      gte: [
        2
      ],
      ngte: [
        2
      ],
      lt: [
        2
      ],
      nlt: [
        2
      ],
      lte: [
        2
      ],
      nlte: [
        2
      ],
      __typename: [
        0
      ]
    },
    StringOperationFilterInput: {
      and: [
        12
      ],
      or: [
        12
      ],
      eq: [
        0
      ],
      neq: [
        0
      ],
      contains: [
        0
      ],
      ncontains: [
        0
      ],
      in: [
        0
      ],
      nin: [
        0
      ],
      startsWith: [
        0
      ],
      nstartsWith: [
        0
      ],
      endsWith: [
        0
      ],
      nendsWith: [
        0
      ],
      __typename: [
        0
      ]
    },
    ExternalIdsFilterInput: {
      and: [
        13
      ],
      or: [
        13
      ],
      id: [
        11
      ],
      tmdb: [
        12
      ],
      imdb: [
        12
      ],
      tvdb: [
        12
      ],
      mediaItem: [
        4
      ],
      __typename: [
        0
      ]
    },
    ListFilterInputTypeOfReleaseFilterInput: {
      all: [
        19
      ],
      none: [
        19
      ],
      some: [
        19
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    ListFilterInputTypeOfMediaItemGroupFilterInput: {
      all: [
        25
      ],
      none: [
        25
      ],
      some: [
        25
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    DateTimeOperationFilterInput: {
      eq: [
        26
      ],
      neq: [
        26
      ],
      in: [
        26
      ],
      nin: [
        26
      ],
      gt: [
        26
      ],
      ngt: [
        26
      ],
      gte: [
        26
      ],
      ngte: [
        26
      ],
      lt: [
        26
      ],
      nlt: [
        26
      ],
      lte: [
        26
      ],
      nlte: [
        26
      ],
      __typename: [
        0
      ]
    },
    SortEnumType: {},
    ExternalIdsSortInput: {
      id: [
        17
      ],
      tmdb: [
        17
      ],
      imdb: [
        17
      ],
      tvdb: [
        17
      ],
      mediaItem: [
        5
      ],
      __typename: [
        0
      ]
    },
    ReleaseFilterInput: {
      and: [
        19
      ],
      or: [
        19
      ],
      id: [
        11
      ],
      slug: [
        12
      ],
      title: [
        12
      ],
      regionCode: [
        12
      ],
      locale: [
        12
      ],
      year: [
        11
      ],
      upc: [
        12
      ],
      isbn: [
        12
      ],
      asin: [
        12
      ],
      imageUrl: [
        12
      ],
      backImageUrl: [
        12
      ],
      releaseDate: [
        16
      ],
      dateAdded: [
        16
      ],
      fullTitle: [
        12
      ],
      type: [
        12
      ],
      discs: [
        27
      ],
      releaseGroups: [
        28
      ],
      mediaItem: [
        4
      ],
      boxset: [
        6
      ],
      contributors: [
        29
      ],
      __typename: [
        0
      ]
    },
    ReleaseSortInput: {
      id: [
        17
      ],
      slug: [
        17
      ],
      title: [
        17
      ],
      regionCode: [
        17
      ],
      locale: [
        17
      ],
      year: [
        17
      ],
      upc: [
        17
      ],
      isbn: [
        17
      ],
      asin: [
        17
      ],
      imageUrl: [
        17
      ],
      backImageUrl: [
        17
      ],
      releaseDate: [
        17
      ],
      dateAdded: [
        17
      ],
      fullTitle: [
        17
      ],
      type: [
        17
      ],
      mediaItem: [
        5
      ],
      boxset: [
        7
      ],
      __typename: [
        0
      ]
    },
    PageInfo: {
      hasNextPage: [
        1
      ],
      hasPreviousPage: [
        1
      ],
      startCursor: [
        0
      ],
      endCursor: [
        0
      ],
      __typename: [
        0
      ]
    },
    MediaItemsEdge: {
      cursor: [
        0
      ],
      node: [
        45
      ],
      __typename: [
        0
      ]
    },
    BoxsetsEdge: {
      cursor: [
        0
      ],
      node: [
        44
      ],
      __typename: [
        0
      ]
    },
    MediaItemsByGroupEdge: {
      cursor: [
        0
      ],
      node: [
        45
      ],
      __typename: [
        0
      ]
    },
    MediaItemGroupFilterInput: {
      and: [
        25
      ],
      or: [
        25
      ],
      id: [
        11
      ],
      mediaItemId: [
        11
      ],
      groupId: [
        11
      ],
      role: [
        12
      ],
      isFeatured: [
        30
      ],
      mediaItem: [
        4
      ],
      group: [
        31
      ],
      __typename: [
        0
      ]
    },
    DateTime: {},
    ListFilterInputTypeOfDiscFilterInput: {
      all: [
        32
      ],
      none: [
        32
      ],
      some: [
        32
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    ListFilterInputTypeOfReleaseGroupFilterInput: {
      all: [
        33
      ],
      none: [
        33
      ],
      some: [
        33
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    ListFilterInputTypeOfContributorFilterInput: {
      all: [
        34
      ],
      none: [
        34
      ],
      some: [
        34
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    BooleanOperationFilterInput: {
      eq: [
        1
      ],
      neq: [
        1
      ],
      __typename: [
        0
      ]
    },
    GroupFilterInput: {
      and: [
        31
      ],
      or: [
        31
      ],
      id: [
        11
      ],
      imdbId: [
        12
      ],
      name: [
        12
      ],
      slug: [
        12
      ],
      imageUrl: [
        12
      ],
      mediaItemGroups: [
        15
      ],
      releaseGroups: [
        28
      ],
      __typename: [
        0
      ]
    },
    DiscFilterInput: {
      and: [
        32
      ],
      or: [
        32
      ],
      id: [
        11
      ],
      index: [
        11
      ],
      slug: [
        12
      ],
      name: [
        12
      ],
      format: [
        12
      ],
      contentHash: [
        12
      ],
      titles: [
        35
      ],
      release: [
        19
      ],
      __typename: [
        0
      ]
    },
    ReleaseGroupFilterInput: {
      and: [
        33
      ],
      or: [
        33
      ],
      id: [
        11
      ],
      releaseId: [
        11
      ],
      groupId: [
        11
      ],
      release: [
        19
      ],
      group: [
        31
      ],
      __typename: [
        0
      ]
    },
    ContributorFilterInput: {
      and: [
        34
      ],
      or: [
        34
      ],
      id: [
        11
      ],
      name: [
        12
      ],
      releases: [
        14
      ],
      userId: [
        12
      ],
      source: [
        12
      ],
      __typename: [
        0
      ]
    },
    ListFilterInputTypeOfTitleFilterInput: {
      all: [
        36
      ],
      none: [
        36
      ],
      some: [
        36
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    TitleFilterInput: {
      and: [
        36
      ],
      or: [
        36
      ],
      index: [
        11
      ],
      disc: [
        32
      ],
      id: [
        11
      ],
      comment: [
        12
      ],
      sourceFile: [
        12
      ],
      segmentMap: [
        12
      ],
      duration: [
        12
      ],
      size: [
        37
      ],
      displaySize: [
        12
      ],
      item: [
        38
      ],
      discItemReferenceId: [
        11
      ],
      tracks: [
        39
      ],
      description: [
        12
      ],
      itemType: [
        12
      ],
      season: [
        12
      ],
      episode: [
        12
      ],
      hasItem: [
        30
      ],
      __typename: [
        0
      ]
    },
    LongOperationFilterInput: {
      eq: [
        40
      ],
      neq: [
        40
      ],
      in: [
        40
      ],
      nin: [
        40
      ],
      gt: [
        40
      ],
      ngt: [
        40
      ],
      gte: [
        40
      ],
      ngte: [
        40
      ],
      lt: [
        40
      ],
      nlt: [
        40
      ],
      lte: [
        40
      ],
      nlte: [
        40
      ],
      __typename: [
        0
      ]
    },
    DiscItemReferenceFilterInput: {
      and: [
        38
      ],
      or: [
        38
      ],
      id: [
        11
      ],
      title: [
        12
      ],
      type: [
        12
      ],
      description: [
        12
      ],
      chapters: [
        41
      ],
      season: [
        12
      ],
      episode: [
        12
      ],
      discItem: [
        36
      ],
      __typename: [
        0
      ]
    },
    ListFilterInputTypeOfTrackFilterInput: {
      all: [
        42
      ],
      none: [
        42
      ],
      some: [
        42
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    Long: {},
    ListFilterInputTypeOfChapterFilterInput: {
      all: [
        43
      ],
      none: [
        43
      ],
      some: [
        43
      ],
      any: [
        1
      ],
      __typename: [
        0
      ]
    },
    TrackFilterInput: {
      and: [
        42
      ],
      or: [
        42
      ],
      id: [
        11
      ],
      index: [
        11
      ],
      name: [
        12
      ],
      type: [
        12
      ],
      resolution: [
        12
      ],
      aspectRatio: [
        12
      ],
      audioType: [
        12
      ],
      languageCode: [
        12
      ],
      language: [
        12
      ],
      description: [
        12
      ],
      title: [
        36
      ],
      __typename: [
        0
      ]
    },
    ChapterFilterInput: {
      and: [
        43
      ],
      or: [
        43
      ],
      id: [
        11
      ],
      index: [
        11
      ],
      title: [
        12
      ],
      __typename: [
        0
      ]
    },
    Boxset: {
      id: [
        2
      ],
      title: [
        0
      ],
      sortTitle: [
        0
      ],
      slug: [
        0
      ],
      imageUrl: [
        0
      ],
      release: [
        49
      ],
      releaseId: [
        2
      ],
      type: [
        0
      ],
      __typename: [
        0
      ]
    },
    MediaItem: {
      id: [
        2
      ],
      title: [
        0
      ],
      slug: [
        0
      ],
      fullTitle: [
        0
      ],
      sortTitle: [
        0
      ],
      year: [
        2
      ],
      type: [
        0
      ],
      imageUrl: [
        0
      ],
      externalids: [
        48
      ],
      externalIdsId: [
        2
      ],
      releases: [
        49,
        {
          where: [
            19
          ],
          order: [
            20,
            "[ReleaseSortInput!]"
          ]
        }
      ],
      mediaItemGroups: [
        50,
        {
          where: [
            25
          ],
          order: [
            46,
            "[MediaItemGroupSortInput!]"
          ]
        }
      ],
      plot: [
        0
      ],
      tagline: [
        0
      ],
      directors: [
        0
      ],
      writers: [
        0
      ],
      stars: [
        0
      ],
      genres: [
        0
      ],
      runtimeMinutes: [
        2
      ],
      runtime: [
        0
      ],
      contentRating: [
        0
      ],
      releaseDate: [
        26
      ],
      latestReleaseDate: [
        26
      ],
      dateAdded: [
        26
      ],
      __typename: [
        0
      ]
    },
    MediaItemGroupSortInput: {
      id: [
        17
      ],
      mediaItemId: [
        17
      ],
      groupId: [
        17
      ],
      role: [
        17
      ],
      isFeatured: [
        17
      ],
      mediaItem: [
        5
      ],
      group: [
        47
      ],
      __typename: [
        0
      ]
    },
    GroupSortInput: {
      id: [
        17
      ],
      imdbId: [
        17
      ],
      name: [
        17
      ],
      slug: [
        17
      ],
      imageUrl: [
        17
      ],
      __typename: [
        0
      ]
    },
    ExternalIds: {
      id: [
        2
      ],
      tmdb: [
        0
      ],
      imdb: [
        0
      ],
      tvdb: [
        0
      ],
      mediaItem: [
        45
      ],
      __typename: [
        0
      ]
    },
    Release: {
      id: [
        2
      ],
      slug: [
        0
      ],
      title: [
        0
      ],
      regionCode: [
        0
      ],
      locale: [
        0
      ],
      year: [
        2
      ],
      upc: [
        0
      ],
      isbn: [
        0
      ],
      asin: [
        0
      ],
      imageUrl: [
        0
      ],
      backImageUrl: [
        0
      ],
      releaseDate: [
        26
      ],
      dateAdded: [
        26
      ],
      fullTitle: [
        0
      ],
      type: [
        0
      ],
      discs: [
        55,
        {
          where: [
            32
          ],
          order: [
            51,
            "[DiscSortInput!]"
          ]
        }
      ],
      releaseGroups: [
        54,
        {
          where: [
            33
          ],
          order: [
            52,
            "[ReleaseGroupSortInput!]"
          ]
        }
      ],
      mediaItem: [
        45
      ],
      boxset: [
        44
      ],
      contributors: [
        53
      ],
      __typename: [
        0
      ]
    },
    MediaItemGroup: {
      id: [
        2
      ],
      mediaItemId: [
        2
      ],
      groupId: [
        2
      ],
      role: [
        0
      ],
      isFeatured: [
        1
      ],
      mediaItem: [
        45,
        {
          where: [
            4
          ],
          order: [
            5,
            "[MediaItemSortInput!]"
          ]
        }
      ],
      group: [
        56,
        {
          where: [
            31
          ],
          order: [
            47,
            "[GroupSortInput!]"
          ]
        }
      ],
      __typename: [
        0
      ]
    },
    DiscSortInput: {
      id: [
        17
      ],
      index: [
        17
      ],
      slug: [
        17
      ],
      name: [
        17
      ],
      format: [
        17
      ],
      contentHash: [
        17
      ],
      release: [
        20
      ],
      __typename: [
        0
      ]
    },
    ReleaseGroupSortInput: {
      id: [
        17
      ],
      releaseId: [
        17
      ],
      groupId: [
        17
      ],
      release: [
        20
      ],
      group: [
        47
      ],
      __typename: [
        0
      ]
    },
    Contributor: {
      id: [
        2
      ],
      name: [
        0
      ],
      releases: [
        49
      ],
      userId: [
        0
      ],
      source: [
        0
      ],
      __typename: [
        0
      ]
    },
    ReleaseGroup: {
      id: [
        2
      ],
      releaseId: [
        2
      ],
      groupId: [
        2
      ],
      release: [
        49,
        {
          where: [
            19
          ],
          order: [
            20,
            "[ReleaseSortInput!]"
          ]
        }
      ],
      group: [
        56,
        {
          where: [
            31
          ],
          order: [
            47,
            "[GroupSortInput!]"
          ]
        }
      ],
      __typename: [
        0
      ]
    },
    Disc: {
      id: [
        2
      ],
      index: [
        2
      ],
      slug: [
        0
      ],
      name: [
        0
      ],
      format: [
        0
      ],
      contentHash: [
        0
      ],
      titles: [
        59,
        {
          where: [
            36
          ],
          order: [
            57,
            "[TitleSortInput!]"
          ]
        }
      ],
      release: [
        49
      ],
      __typename: [
        0
      ]
    },
    Group: {
      id: [
        2
      ],
      imdbId: [
        0
      ],
      name: [
        0
      ],
      slug: [
        0
      ],
      imageUrl: [
        0
      ],
      mediaItemGroups: [
        50,
        {
          where: [
            25
          ],
          order: [
            46,
            "[MediaItemGroupSortInput!]"
          ]
        }
      ],
      releaseGroups: [
        54,
        {
          where: [
            33
          ],
          order: [
            52,
            "[ReleaseGroupSortInput!]"
          ]
        }
      ],
      __typename: [
        0
      ]
    },
    TitleSortInput: {
      index: [
        17
      ],
      disc: [
        51
      ],
      id: [
        17
      ],
      comment: [
        17
      ],
      sourceFile: [
        17
      ],
      segmentMap: [
        17
      ],
      duration: [
        17
      ],
      size: [
        17
      ],
      displaySize: [
        17
      ],
      item: [
        58
      ],
      discItemReferenceId: [
        17
      ],
      description: [
        17
      ],
      itemType: [
        17
      ],
      season: [
        17
      ],
      episode: [
        17
      ],
      hasItem: [
        17
      ],
      __typename: [
        0
      ]
    },
    DiscItemReferenceSortInput: {
      id: [
        17
      ],
      title: [
        17
      ],
      type: [
        17
      ],
      description: [
        17
      ],
      season: [
        17
      ],
      episode: [
        17
      ],
      discItem: [
        57
      ],
      __typename: [
        0
      ]
    },
    Title: {
      index: [
        2
      ],
      disc: [
        55
      ],
      id: [
        2
      ],
      comment: [
        0
      ],
      sourceFile: [
        0
      ],
      segmentMap: [
        0
      ],
      duration: [
        0
      ],
      size: [
        40
      ],
      displaySize: [
        0
      ],
      item: [
        62
      ],
      discItemReferenceId: [
        2
      ],
      tracks: [
        61,
        {
          where: [
            42
          ],
          order: [
            60,
            "[TrackSortInput!]"
          ]
        }
      ],
      description: [
        0
      ],
      itemType: [
        0
      ],
      season: [
        0
      ],
      episode: [
        0
      ],
      hasItem: [
        1
      ],
      __typename: [
        0
      ]
    },
    TrackSortInput: {
      id: [
        17
      ],
      index: [
        17
      ],
      name: [
        17
      ],
      type: [
        17
      ],
      resolution: [
        17
      ],
      aspectRatio: [
        17
      ],
      audioType: [
        17
      ],
      languageCode: [
        17
      ],
      language: [
        17
      ],
      description: [
        17
      ],
      title: [
        57
      ],
      __typename: [
        0
      ]
    },
    Track: {
      id: [
        2
      ],
      index: [
        2
      ],
      name: [
        0
      ],
      type: [
        0
      ],
      resolution: [
        0
      ],
      aspectRatio: [
        0
      ],
      audioType: [
        0
      ],
      languageCode: [
        0
      ],
      language: [
        0
      ],
      description: [
        0
      ],
      title: [
        59
      ],
      __typename: [
        0
      ]
    },
    DiscItemReference: {
      id: [
        2
      ],
      title: [
        0
      ],
      type: [
        0
      ],
      description: [
        0
      ],
      chapters: [
        64,
        {
          where: [
            43
          ],
          order: [
            63,
            "[ChapterSortInput!]"
          ]
        }
      ],
      season: [
        0
      ],
      episode: [
        0
      ],
      discItem: [
        59
      ],
      __typename: [
        0
      ]
    },
    ChapterSortInput: {
      id: [
        17
      ],
      index: [
        17
      ],
      title: [
        17
      ],
      __typename: [
        0
      ]
    },
    Chapter: {
      id: [
        2
      ],
      index: [
        2
      ],
      title: [
        0
      ],
      __typename: [
        0
      ]
    }
  }
};

// src/genql/schema.ts
var enumSortEnumType = {
  ASC: "ASC",
  DESC: "DESC"
};
// src/genql/index.ts
var typeMap = linkTypeMap(types_default);
var createClient2 = function(options) {
  return createClient({
    url: "https://thediscdb.com/graphql",
    ...options,
    queryRoot: typeMap.Query,
    mutationRoot: typeMap.Mutation,
    subscriptionRoot: typeMap.Subscription
  });
};
// src/types/media.ts
var MediaItemType;
((MediaItemType2) => {
  MediaItemType2["Movie"] = "Movie";
  MediaItemType2["Series"] = "Series";
})(MediaItemType ||= {});
var DiscFormat;
((DiscFormat2) => {
  DiscFormat2["DVD"] = "DVD";
  DiscFormat2["Bluray"] = "Blu-Ray";
  DiscFormat2["UHD"] = "UHD";
})(DiscFormat ||= {});
var MediaItemGroupRole;
((MediaItemGroupRole2) => {
  MediaItemGroupRole2["Company"] = "Company";
  MediaItemGroupRole2["Genre"] = "Genre";
  MediaItemGroupRole2["Actor"] = "Actor";
  MediaItemGroupRole2["Writer"] = "Writer";
  MediaItemGroupRole2["Director"] = "Director";
})(MediaItemGroupRole ||= {});
// src/types/search.ts
var MediaTypeExtended;
((MediaTypeExtended2) => {
  MediaTypeExtended2["Boxset"] = "Boxset";
})(MediaTypeExtended ||= {});
var SearchType = { ...MediaItemType, ...MediaTypeExtended };
// src/types/title.ts
var ItemType;
((ItemType2) => {
  ItemType2["MainMovie"] = "MainMovie";
  ItemType2["DeletedScene"] = "DeletedScene";
  ItemType2["Trailer"] = "Trailer";
  ItemType2["Extra"] = "Extra";
  ItemType2["Episode"] = "Episode";
})(ItemType ||= {});
// src/common.ts
var getImageUrl = (path, options) => {
  const origin = options?.origin ?? DISCDB_ORIGIN;
  const url = new URL(path, path.startsWith("/") ? origin : `${origin}/images/`);
  if (options?.width !== undefined) {
    url.searchParams.set("width", String(options.width));
  }
  if (options?.height !== undefined) {
    url.searchParams.set("height", String(options.height));
  }
  return url.href;
};
var fixMediaTypes = (items, key) => {
  for (const item of items) {
    if (item[key].toLowerCase() === "series") {
      item[key] = "Series" /* Series */;
    } else if (item[key].toLowerCase() === "movie") {
      item[key] = "Movie" /* Movie */;
    }
  }
  return items;
};
var unifyPageInfo = (input, info) => {
  if (!input || "first" in input || "after" in input) {
    return { cursor: info.endCursor, hasMoreData: info.hasNextPage };
  }
  return { cursor: info.startCursor, hasMoreData: info.hasPreviousPage };
};
var unifyPageArgs = (input) => {
  return {
    first: input ? "first" in input ? input.first : null : null,
    last: input ? "last" in input ? input.last : null : null,
    after: input ? "after" in input ? input.after : null : null,
    before: input ? "before" in input ? input.before : null : null,
    where: input?.query,
    order: input?.sort
  };
};
var slugify = (value) => value.replace(/&/g, "and").replace(/\s/g, "-").replace(/\w/g, (v) => v.toLowerCase()).replace(/[^-a-z0-9]/g, "");

// src/client.ts
class DiscDBClient {
  origin = DISCDB_ORIGIN;
  userAgent = `discdbapi/${version}`;
  gql;
  constructor(options) {
    if (options?.origin) {
      this.origin = options.origin;
    }
    if (options?.userAgent !== undefined) {
      this.userAgent = options.userAgent;
    }
    this.gql = createClient2({
      url: new URL("/graphql", this.origin ?? DISCDB_ORIGIN).href,
      headers: { "User-Agent": this.userAgent }
    });
  }
  getImageUrl(path, options) {
    return getImageUrl(path, { origin: this.origin, ...options });
  }
  getBarcodeImageUrl(code, options) {
    const params = new URLSearchParams({
      data: String(code),
      width: options?.width?.toString() ?? "300",
      showLabel: options?.label !== undefined ? String(options.label) : "false"
    });
    return getImageUrl(`/api/barcode?${params}`, { origin: this.origin });
  }
  async fetch(path, options) {
    const headers = new Headers;
    headers.set("User-Agent", this.userAgent);
    const response = await fetch(new URL(path, this.origin), {
      method: options?.method ?? "GET",
      ...options,
      headers: {
        ...Object.fromEntries(headers.entries()),
        ...options?.headers
      }
    });
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}: ${await response.text()}`);
    }
    const data = await response.json();
    return data;
  }
  async search(query, options) {
    const params = new URLSearchParams({ q: query });
    if (options?.limit !== undefined) {
      params.set("limit", String(options.limit));
    }
    const data = await this.fetch(`/api/search?${params}`, {
      method: "GET"
    });
    const results = data.map((result) => {
      const newResult = {
        key: result.id,
        title: result.title,
        slug: result.mediaItem.slug,
        imageUrl: result.imageUrl,
        type: result.type,
        relativeUrl: result.relativeUrl,
        externalIds: {},
        externalIdsRaw: result.identifiers,
        groups: result.groups
      };
      if (result.type === SearchType.Boxset) {
        newResult.key = `boxset-${result.mediaItem.slug}`;
      }
      let i = -1;
      for (const id of result.identifiers) {
        i += 1;
        if (id.startsWith("tt") && i === 0) {
          newResult.externalIds.imdb = id;
          continue;
        }
        if (!Number.isNaN(Number(id))) {
          const nextId = result.identifiers[i + 1];
          if ((newResult.externalIds.imdb && i === 1 || i === 0) && (!nextId || (!Number.isNaN(Number(nextId)) ? nextId?.length === 12 : true))) {
            newResult.externalIds.tmdb = Number(id);
          } else if (id.length === 12) {
            newResult.externalIds.upc = Number(id);
          }
        } else if (id.length === 10) {
          newResult.externalIds.asin = id;
        }
      }
      return newResult;
    });
    return results;
  }
  async getMediaItemByDiscHash(hash2) {
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            releases: {
              some: { discs: { some: { contentHash: { eq: hash2 } } } }
            }
          }
        },
        nodes: GQL_NODE_QUERY
      }
    });
    const node = data.mediaItems?.nodes?.[0];
    if (!node) {
      throw Error(`No such disc with hash "${hash2}"`);
    }
    return node;
  }
  async getMediaItemsByDiscHashes(hashes) {
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            releases: {
              some: { discs: { some: { contentHash: { in: hashes } } } }
            }
          }
        },
        nodes: GQL_NODE_QUERY
      }
    });
    const nodes = data.mediaItems?.nodes ?? [];
    const results = Object.fromEntries(hashes.map((hash2) => [hash2, []]));
    for (const node of nodes) {
      for (const release of node.releases) {
        for (const disc of release.discs) {
          if (disc.contentHash && hashes.includes(disc.contentHash)) {
            if (results[disc.contentHash]) {
              results[disc.contentHash]?.push(node);
            } else {
              results[disc.contentHash] = [node];
            }
          }
        }
      }
    }
    return results;
  }
  async getMediaItemsByGroup(slug, role, input) {
    const data = await this.gql.query({
      mediaItemsByGroup: {
        __args: { slug, role, ...unifyPageArgs(input) },
        nodes: {
          slug: true,
          year: true,
          title: true,
          type: true,
          imageUrl: true,
          mediaItemGroups: {
            __args: { where: { group: { slug: { eq: slug } } } },
            role: true,
            group: {
              name: true,
              slug: true,
              imageUrl: true,
              on_Group: { id: true }
            },
            on_MediaItemGroup: { id: true }
          },
          releases: {
            slug: true,
            locale: true,
            year: true,
            title: true,
            discs: {
              index: true,
              name: true,
              format: true,
              on_Disc: { id: true }
            },
            on_Release: { id: true }
          },
          on_MediaItem: { id: true }
        },
        pageInfo: { __scalar: true }
      }
    });
    return {
      mediaItems: data.mediaItemsByGroup?.nodes ?? [],
      page: data.mediaItemsByGroup ? unifyPageInfo(input, data.mediaItemsByGroup.pageInfo) : undefined
    };
  }
  async getReleaseBySlug(mediaItemSlug, slug) {
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            and: [
              { slug: { eq: mediaItemSlug } },
              { releases: { some: { slug: { eq: slug } } } }
            ]
          }
        },
        nodes: GQL_NODE_QUERY
      }
    });
    const node = data.mediaItems?.nodes?.[0];
    if (!node) {
      throw Error(`No such release matching slugs ${mediaItemSlug} / ${slug}`);
    }
    const release = node.releases.find((r) => r.slug === slug);
    if (!release) {
      throw Error(`No such release for item ${mediaItemSlug} with slug ${slug}`);
    }
    return {
      ...release,
      mediaItem: {
        ...node,
        releases: node.releases.filter((r) => r.slug !== release.slug)
      }
    };
  }
  async getMediaItemByExternalIds(ids) {
    const ors = [];
    if (ids.imdbId)
      ors.push({ imdb: { eq: ids.imdbId } });
    if (ids.tmdbId)
      ors.push({ tmdb: { eq: ids.tmdbId } });
    if (ids.tvdbId)
      ors.push({ tvdb: { eq: ids.tvdbId } });
    const data = await this.gql.query({
      mediaItems: {
        __args: { where: { externalids: { or: ors } } },
        nodes: GQL_NODE_QUERY
      }
    });
    const node = data.mediaItems?.nodes?.[0];
    if (!node) {
      throw Error(`No media item matching any external IDs from ${JSON.stringify(ids)}`);
    }
    return node;
  }
  async hash(files) {
    const data = await this.fetch("/api/hash", {
      method: "POST",
      body: JSON.stringify({
        Files: files.map((file, i) => file instanceof File ? {
          Index: i + 1,
          Name: file.name,
          Size: file.size,
          CreationTime: new Date(file.lastModified).toISOString()
        } : {
          Index: file.index,
          Name: file.name,
          Size: file.size,
          CreationTime: new Date(file.created).toISOString()
        })
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data.hash;
  }
  async getBoxsets(input, select) {
    const data = await this.gql.query({
      boxsets: {
        __args: unifyPageArgs(input),
        nodes: select ?? {
          title: true,
          slug: true,
          sortTitle: true,
          imageUrl: true,
          type: true,
          release: {
            title: true,
            slug: true,
            year: true,
            imageUrl: true
          }
        },
        pageInfo: { __scalar: true }
      }
    });
    return {
      boxsets: fixMediaTypes(data.boxsets?.nodes ?? [], "type"),
      page: data.boxsets ? unifyPageInfo(input, data.boxsets.pageInfo) : undefined
    };
  }
  async getBoxsetBySlug(slug) {
    const data = await this.getBoxsets({ query: { slug: { eq: slug } } }, {
      title: true,
      slug: true,
      sortTitle: true,
      imageUrl: true,
      type: true,
      release: GQL_NODE_QUERY.releases
    });
    if (data.boxsets.length === 0) {
      throw Error(`No such boxset with slug "${slug}"`);
    }
    return data.boxsets[0];
  }
}
var GQL_NODE_QUERY = {
  title: true,
  year: true,
  slug: true,
  imageUrl: true,
  type: true,
  externalids: {
    tmdb: true,
    imdb: true,
    tvdb: true
  },
  releases: {
    slug: true,
    locale: true,
    regionCode: true,
    year: true,
    title: true,
    imageUrl: true,
    discs: {
      __args: { order: [{ index: enumSortEnumType.ASC }] },
      contentHash: true,
      index: true,
      name: true,
      format: true,
      slug: true,
      titles: {
        __args: { order: [{ index: enumSortEnumType.ASC }] },
        index: true,
        duration: true,
        displaySize: true,
        sourceFile: true,
        size: true,
        segmentMap: true,
        item: {
          title: true,
          season: true,
          episode: true,
          type: true,
          chapters: {
            __args: { order: [{ index: enumSortEnumType.ASC }] },
            index: true,
            title: true
          }
        }
      }
    }
  }
};
// src/genql-contributions/runtime/error.ts
class GenqlError2 extends Error {
  errors = [];
  data;
  constructor(errors, data) {
    let message = Array.isArray(errors) ? errors.map((x) => x?.message || "").join(`
`) : "";
    if (!message) {
      message = "GraphQL error";
    }
    super(message);
    this.errors = errors;
    this.data = data;
  }
}

// src/genql-contributions/runtime/batcher.ts
function dispatchQueueBatch2(client, queue) {
  let batchedQuery = queue.map((item) => item.request);
  if (batchedQuery.length === 1) {
    batchedQuery = batchedQuery[0];
  }
  (() => {
    try {
      return client.fetcher(batchedQuery);
    } catch (e) {
      return Promise.reject(e);
    }
  })().then((responses) => {
    if (queue.length === 1 && !Array.isArray(responses)) {
      if (responses.errors && responses.errors.length) {
        queue[0].reject(new GenqlError2(responses.errors, responses.data));
        return;
      }
      queue[0].resolve(responses);
      return;
    } else if (responses.length !== queue.length) {
      throw new Error("response length did not match query length");
    }
    for (let i = 0;i < queue.length; i++) {
      if (responses[i].errors && responses[i].errors.length) {
        queue[i].reject(new GenqlError2(responses[i].errors, responses[i].data));
      } else {
        queue[i].resolve(responses[i]);
      }
    }
  }).catch((e) => {
    for (let i = 0;i < queue.length; i++) {
      queue[i].reject(e);
    }
  });
}
function dispatchQueue2(client, options) {
  const queue = client._queue;
  const maxBatchSize = options.maxBatchSize || 0;
  client._queue = [];
  if (maxBatchSize > 0 && maxBatchSize < queue.length) {
    for (let i = 0;i < queue.length / maxBatchSize; i++) {
      dispatchQueueBatch2(client, queue.slice(i * maxBatchSize, (i + 1) * maxBatchSize));
    }
  } else {
    dispatchQueueBatch2(client, queue);
  }
}

class QueryBatcher2 {
  fetcher;
  _options;
  _queue;
  constructor(fetcher, {
    batchInterval = 6,
    shouldBatch = true,
    maxBatchSize = 0
  } = {}) {
    this.fetcher = fetcher;
    this._options = {
      batchInterval,
      shouldBatch,
      maxBatchSize
    };
    this._queue = [];
  }
  fetch(query, variables, operationName, overrides = {}) {
    const request = {
      query
    };
    const options = Object.assign({}, this._options, overrides);
    if (variables) {
      request.variables = variables;
    }
    if (operationName) {
      request.operationName = operationName;
    }
    const promise = new Promise((resolve, reject) => {
      this._queue.push({
        request,
        resolve,
        reject
      });
      if (this._queue.length === 1) {
        if (options.shouldBatch) {
          setTimeout(() => dispatchQueue2(this, options), options.batchInterval);
        } else {
          dispatchQueue2(this, options);
        }
      }
    });
    return promise;
  }
  forceFetch(query, variables, operationName, overrides = {}) {
    const request = {
      query
    };
    const options = Object.assign({}, this._options, overrides, {
      shouldBatch: false
    });
    if (variables) {
      request.variables = variables;
    }
    if (operationName) {
      request.operationName = operationName;
    }
    const promise = new Promise((resolve, reject) => {
      const client = new QueryBatcher2(this.fetcher, this._options);
      client._queue = [
        {
          request,
          resolve,
          reject
        }
      ];
      dispatchQueue2(client, options);
    });
    return promise;
  }
}

// src/genql-contributions/runtime/fetcher.ts
var DEFAULT_BATCH_OPTIONS2 = {
  maxBatchSize: 10,
  batchInterval: 40
};
var createFetcher2 = ({
  url,
  headers = {},
  fetcher,
  fetch: _fetch,
  batch = false,
  ...rest
}) => {
  if (!url && !fetcher) {
    throw new Error("url or fetcher is required");
  }
  fetcher = fetcher || (async (body) => {
    let headersObject = typeof headers == "function" ? await headers() : headers;
    headersObject = headersObject || {};
    if (typeof fetch === "undefined" && !_fetch) {
      throw new Error("Global `fetch` function is not available, pass a fetch polyfill to Genql `createClient`");
    }
    let fetchImpl = _fetch || fetch;
    const res = await fetchImpl(url, {
      headers: {
        "Content-Type": "application/json",
        ...headersObject
      },
      method: "POST",
      body: JSON.stringify(body),
      ...rest
    });
    if (!res.ok) {
      throw new Error(`${res.statusText}: ${await res.text()}`);
    }
    const json = await res.json();
    return json;
  });
  if (!batch) {
    return async (body) => {
      const json = await fetcher(body);
      if (Array.isArray(json)) {
        return json.map((json2) => {
          if (json2?.errors?.length) {
            throw new GenqlError2(json2.errors || [], json2.data);
          }
          return json2.data;
        });
      } else {
        if (json?.errors?.length) {
          throw new GenqlError2(json.errors || [], json.data);
        }
        return json.data;
      }
    };
  }
  const batcher = new QueryBatcher2(async (batchedQuery) => {
    const json = await fetcher(batchedQuery);
    return json;
  }, batch === true ? DEFAULT_BATCH_OPTIONS2 : batch);
  return async ({ query, variables }) => {
    const json = await batcher.fetch(query, variables);
    if (json?.data) {
      return json.data;
    }
    throw new Error("Genql batch fetcher returned unexpected result " + JSON.stringify(json));
  };
};

// src/genql-contributions/runtime/generateGraphqlOperation.ts
var parseRequest2 = (request, ctx, path) => {
  if (typeof request === "object" && "__args" in request) {
    const args = request.__args;
    let fields = { ...request };
    delete fields.__args;
    const argNames = Object.keys(args);
    if (argNames.length === 0) {
      return parseRequest2(fields, ctx, path);
    }
    const field = getFieldFromPath2(ctx.root, path);
    const argStrings = argNames.map((argName) => {
      ctx.varCounter++;
      const varName = `v${ctx.varCounter}`;
      const typing = field.args && field.args[argName];
      if (!typing) {
        throw new Error(`no typing defined for argument \`${argName}\` in path \`${path.join(".")}\``);
      }
      ctx.variables[varName] = {
        value: args[argName],
        typing
      };
      return `${argName}:$${varName}`;
    });
    return `(${argStrings})${parseRequest2(fields, ctx, path)}`;
  } else if (typeof request === "object" && Object.keys(request).length > 0) {
    const fields = request;
    const fieldNames = Object.keys(fields).filter((k) => Boolean(fields[k]));
    if (fieldNames.length === 0) {
      throw new Error(`field selection should not be empty: ${path.join(".")}`);
    }
    const type = path.length > 0 ? getFieldFromPath2(ctx.root, path).type : ctx.root;
    const scalarFields = type.scalar;
    let scalarFieldsFragment;
    if (fieldNames.includes("__scalar")) {
      const falsyFieldNames = new Set(Object.keys(fields).filter((k) => !Boolean(fields[k])));
      if (scalarFields?.length) {
        ctx.fragmentCounter++;
        scalarFieldsFragment = `f${ctx.fragmentCounter}`;
        ctx.fragments.push(`fragment ${scalarFieldsFragment} on ${type.name}{${scalarFields.filter((f) => !falsyFieldNames.has(f)).join(",")}}`);
      }
    }
    const fieldsSelection = fieldNames.filter((f) => !["__scalar", "__name"].includes(f)).map((f) => {
      const parsed = parseRequest2(fields[f], ctx, [...path, f]);
      if (f.startsWith("on_")) {
        ctx.fragmentCounter++;
        const implementationFragment = `f${ctx.fragmentCounter}`;
        const typeMatch = f.match(/^on_(.+)/);
        if (!typeMatch || !typeMatch[1])
          throw new Error("match failed");
        ctx.fragments.push(`fragment ${implementationFragment} on ${typeMatch[1]}${parsed}`);
        return `...${implementationFragment}`;
      } else {
        return `${f}${parsed}`;
      }
    }).concat(scalarFieldsFragment ? [`...${scalarFieldsFragment}`] : []).join(",");
    return `{${fieldsSelection}}`;
  } else {
    return "";
  }
};
var generateGraphqlOperation2 = (operation, root, fields) => {
  const ctx = {
    root,
    varCounter: 0,
    variables: {},
    fragmentCounter: 0,
    fragments: []
  };
  const result = parseRequest2(fields, ctx, []);
  const varNames = Object.keys(ctx.variables);
  const varsString = varNames.length > 0 ? `(${varNames.map((v) => {
    const variableType = ctx.variables[v].typing[1];
    return `$${v}:${variableType}`;
  })})` : "";
  const operationName = fields?.__name || "";
  return {
    query: [
      `${operation} ${operationName}${varsString}${result}`,
      ...ctx.fragments
    ].join(","),
    variables: Object.keys(ctx.variables).reduce((r, v) => {
      r[v] = ctx.variables[v].value;
      return r;
    }, {}),
    ...operationName ? { operationName: operationName.toString() } : {}
  };
};
var getFieldFromPath2 = (root, path) => {
  let current;
  if (!root)
    throw new Error("root type is not provided");
  if (path.length === 0)
    throw new Error(`path is empty`);
  path.forEach((f) => {
    const type = current ? current.type : root;
    if (!type.fields)
      throw new Error(`type \`${type.name}\` does not have fields`);
    const possibleTypes = Object.keys(type.fields).filter((i) => i.startsWith("on_")).reduce((types, fieldName) => {
      const field2 = type.fields && type.fields[fieldName];
      if (field2)
        types.push(field2.type);
      return types;
    }, [type]);
    let field = null;
    possibleTypes.forEach((type2) => {
      const found = type2.fields && type2.fields[f];
      if (found)
        field = found;
    });
    if (!field)
      throw new Error(`type \`${type.name}\` does not have a field \`${f}\``);
    current = field;
  });
  return current;
};

// src/genql-contributions/runtime/createClient.ts
var createClient3 = ({
  queryRoot,
  mutationRoot,
  subscriptionRoot,
  ...options
}) => {
  const fetcher = createFetcher2(options);
  const client = {};
  if (queryRoot) {
    client.query = (request) => {
      if (!queryRoot)
        throw new Error("queryRoot argument is missing");
      const resultPromise = fetcher(generateGraphqlOperation2("query", queryRoot, request));
      return resultPromise;
    };
  }
  if (mutationRoot) {
    client.mutation = (request) => {
      if (!mutationRoot)
        throw new Error("mutationRoot argument is missing");
      const resultPromise = fetcher(generateGraphqlOperation2("mutation", mutationRoot, request));
      return resultPromise;
    };
  }
  return client;
};
// src/genql-contributions/runtime/linkTypeMap.ts
var linkTypeMap2 = (typeMap2) => {
  const indexToName = Object.assign({}, ...Object.keys(typeMap2.types).map((k, i) => ({ [i]: k })));
  let intermediaryTypeMap = Object.assign({}, ...Object.keys(typeMap2.types || {}).map((k) => {
    const type = typeMap2.types[k];
    const fields = type || {};
    return {
      [k]: {
        name: k,
        scalar: Object.keys(fields).filter((f) => {
          const [type2] = fields[f] || [];
          const isScalar = type2 && typeMap2.scalars.includes(type2);
          if (!isScalar) {
            return false;
          }
          const args = fields[f]?.[1];
          const argTypes = Object.values(args || {}).map((x) => x?.[1]).filter(Boolean);
          const hasRequiredArgs = argTypes.some((str) => str && str.endsWith("!"));
          if (hasRequiredArgs) {
            return false;
          }
          return true;
        }),
        fields: Object.assign({}, ...Object.keys(fields).map((f) => {
          const [typeIndex, args] = fields[f] || [];
          if (typeIndex == null) {
            return {};
          }
          return {
            [f]: {
              type: indexToName[typeIndex],
              args: Object.assign({}, ...Object.keys(args || {}).map((k2) => {
                if (!args || !args[k2]) {
                  return;
                }
                const [
                  argTypeName,
                  argTypeString
                ] = args[k2];
                return {
                  [k2]: [
                    indexToName[argTypeName],
                    argTypeString || indexToName[argTypeName]
                  ]
                };
              }))
            }
          };
        }))
      }
    };
  }));
  const res = resolveConcreteTypes2(intermediaryTypeMap);
  return res;
};
var resolveConcreteTypes2 = (linkedTypeMap) => {
  Object.keys(linkedTypeMap).forEach((typeNameFromKey) => {
    const type = linkedTypeMap[typeNameFromKey];
    if (!type.fields) {
      return;
    }
    const fields = type.fields;
    Object.keys(fields).forEach((f) => {
      const field = fields[f];
      if (field.args) {
        const args = field.args;
        Object.keys(args).forEach((key) => {
          const arg = args[key];
          if (arg) {
            const [typeName2] = arg;
            if (typeof typeName2 === "string") {
              if (!linkedTypeMap[typeName2]) {
                linkedTypeMap[typeName2] = { name: typeName2 };
              }
              arg[0] = linkedTypeMap[typeName2];
            }
          }
        });
      }
      const typeName = field.type;
      if (typeof typeName === "string") {
        if (!linkedTypeMap[typeName]) {
          linkedTypeMap[typeName] = { name: typeName };
        }
        field.type = linkedTypeMap[typeName];
      }
    });
  });
  return linkedTypeMap;
};
// src/genql-contributions/types.ts
var types_default2 = {
  scalars: [
    1,
    6,
    7,
    11,
    153,
    154,
    155,
    156,
    157,
    158,
    159,
    160,
    161,
    162,
    163
  ],
  types: {
    Error: {
      message: [
        1
      ],
      on_ApiKeyNotFoundError: [
        9
      ],
      on_AuthenticationError: [
        16
      ],
      on_ContributionNotFoundError: [
        22
      ],
      on_CouldNotParseLogsError: [
        25
      ],
      on_DiscItemNotFoundError: [
        32
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_ExternalDataNotFoundError: [
        41
      ],
      on_ExternalDataSerializationError: [
        43
      ],
      on_FieldRequiredError: [
        45
      ],
      on_InvalidContributionStatusError: [
        49
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_LogsNotFoundError: [
        52
      ],
      __typename: [
        1
      ]
    },
    String: {},
    AddAudioTrackToItemPayload: {
      userContributionAudioTrack: [
        71
      ],
      errors: [
        77
      ],
      __typename: [
        1
      ]
    },
    AddChapterToItemPayload: {
      userContributionChapter: [
        72
      ],
      errors: [
        78
      ],
      __typename: [
        1
      ]
    },
    AddItemToDiscPayload: {
      userContributionDiscItem: [
        75
      ],
      errors: [
        79
      ],
      __typename: [
        1
      ]
    },
    AmazonProductMetadata: {
      asin: [
        1
      ],
      title: [
        1
      ],
      upc: [
        1
      ],
      frontImageUrl: [
        1
      ],
      backImageUrl: [
        1
      ],
      releaseDate: [
        158
      ],
      numberOfDiscs: [
        6
      ],
      aspectRatio: [
        1
      ],
      isDiscontinued: [
        7
      ],
      mpaaRating: [
        1
      ],
      modelNumber: [
        1
      ],
      director: [
        1
      ],
      mediaFormat: [
        1
      ],
      actors: [
        1
      ],
      producers: [
        1
      ],
      language: [
        1
      ],
      dubbed: [
        1
      ],
      subtitles: [
        1
      ],
      studio: [
        1
      ],
      __typename: [
        1
      ]
    },
    Int: {},
    Boolean: {},
    ApiKeyInfo: {
      name: [
        1
      ],
      keyPrefix: [
        1
      ],
      isActive: [
        7
      ],
      logUsage: [
        7
      ],
      roles: [
        1
      ],
      ownerEmail: [
        1
      ],
      createdAt: [
        158
      ],
      expiresAt: [
        158
      ],
      lastUsedAt: [
        158
      ],
      __typename: [
        1
      ]
    },
    ApiKeyNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ApiKeyUsageLogInfo: {
      apiKeyPrefix: [
        1
      ],
      apiKeyName: [
        1
      ],
      timestamp: [
        158
      ],
      operationName: [
        1
      ],
      fieldCost: [
        11
      ],
      typeCost: [
        11
      ],
      durationMs: [
        6
      ],
      __typename: [
        1
      ]
    },
    Float: {},
    ApiKeyUsageLogsConnection: {
      pageInfo: [
        59
      ],
      edges: [
        13
      ],
      nodes: [
        10
      ],
      __typename: [
        1
      ]
    },
    ApiKeyUsageLogsEdge: {
      cursor: [
        1
      ],
      node: [
        10
      ],
      __typename: [
        1
      ]
    },
    ApiKeysConnection: {
      pageInfo: [
        59
      ],
      edges: [
        15
      ],
      nodes: [
        8
      ],
      __typename: [
        1
      ]
    },
    ApiKeysEdge: {
      cursor: [
        1
      ],
      node: [
        8
      ],
      __typename: [
        1
      ]
    },
    AuthenticationError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ContributionChatConnection: {
      pageInfo: [
        59
      ],
      edges: [
        18
      ],
      nodes: [
        76
      ],
      totalCount: [
        6
      ],
      __typename: [
        1
      ]
    },
    ContributionChatEdge: {
      cursor: [
        1
      ],
      node: [
        76
      ],
      __typename: [
        1
      ]
    },
    ContributionHistory: {
      id: [
        6
      ],
      contributionId: [
        6
      ],
      timeStamp: [
        158
      ],
      description: [
        1
      ],
      userId: [
        1
      ],
      type: [
        154
      ],
      __typename: [
        1
      ]
    },
    ContributionHistoryConnection: {
      pageInfo: [
        59
      ],
      edges: [
        21
      ],
      nodes: [
        19
      ],
      totalCount: [
        6
      ],
      __typename: [
        1
      ]
    },
    ContributionHistoryEdge: {
      cursor: [
        1
      ],
      node: [
        19
      ],
      __typename: [
        1
      ]
    },
    ContributionNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ContributionsConnection: {
      pageInfo: [
        59
      ],
      edges: [
        24
      ],
      nodes: [
        70
      ],
      totalCount: [
        6
      ],
      __typename: [
        1
      ]
    },
    ContributionsEdge: {
      cursor: [
        1
      ],
      node: [
        70
      ],
      __typename: [
        1
      ]
    },
    CouldNotParseLogsError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    CreateContributionPayload: {
      userContribution: [
        70
      ],
      errors: [
        80
      ],
      __typename: [
        1
      ]
    },
    CreateDiscPayload: {
      userContributionDisc: [
        73
      ],
      errors: [
        81
      ],
      __typename: [
        1
      ]
    },
    DeleteContributionPayload: {
      userContribution: [
        70
      ],
      errors: [
        82
      ],
      __typename: [
        1
      ]
    },
    DeleteItemFromDiscPayload: {
      userContributionDiscItem: [
        75
      ],
      errors: [
        83
      ],
      __typename: [
        1
      ]
    },
    DiscHash: {
      hash: [
        1
      ],
      __typename: [
        1
      ]
    },
    DiscInfo: {
      name: [
        1
      ],
      type: [
        1
      ],
      languageCode: [
        1
      ],
      language: [
        1
      ],
      titles: [
        67
      ],
      hashInfo: [
        48
      ],
      __typename: [
        1
      ]
    },
    DiscItemNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    DiscLogs: {
      info: [
        31
      ],
      disc: [
        73
      ],
      contribution: [
        70
      ],
      __typename: [
        1
      ]
    },
    DiscLogsPayload: {
      discLogs: [
        33
      ],
      errors: [
        84
      ],
      __typename: [
        1
      ]
    },
    DiscNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    DiscUploadStatus: {
      logsUploaded: [
        7
      ],
      logUploadError: [
        1
      ],
      __typename: [
        1
      ]
    },
    DiscUploadStatusPayload: {
      discUploadStatus: [
        36
      ],
      errors: [
        85
      ],
      __typename: [
        1
      ]
    },
    EditItemOnDiscPayload: {
      userContributionDiscItem: [
        75
      ],
      errors: [
        86
      ],
      __typename: [
        1
      ]
    },
    EpisodeNamesPayload: {
      seriesEpisodeNames: [
        66
      ],
      errors: [
        87
      ],
      __typename: [
        1
      ]
    },
    ExternalDataForContributionPayload: {
      externalMetadata: [
        44
      ],
      errors: [
        89
      ],
      __typename: [
        1
      ]
    },
    ExternalDataNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ExternalDataPayload: {
      externalMetadata: [
        44
      ],
      errors: [
        88
      ],
      __typename: [
        1
      ]
    },
    ExternalDataSerializationError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ExternalMetadata: {
      id: [
        6
      ],
      title: [
        1
      ],
      year: [
        6
      ],
      imageUrl: [
        1
      ],
      __typename: [
        1
      ]
    },
    FieldRequiredError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    GenerateApiKeyPayload: {
      key: [
        1
      ],
      keyPrefix: [
        1
      ],
      name: [
        1
      ],
      ownerEmail: [
        1
      ],
      __typename: [
        1
      ]
    },
    HashDiscPayload: {
      discHash: [
        30
      ],
      errors: [
        90
      ],
      __typename: [
        1
      ]
    },
    HashInfoLogLine: {
      matches: [
        7,
        {
          prefix: [
            1,
            "String!"
          ]
        }
      ],
      index: [
        6
      ],
      name: [
        1
      ],
      creationTime: [
        158
      ],
      size: [
        161
      ],
      originalLine: [
        1
      ],
      prefix: [
        1
      ],
      __typename: [
        1
      ]
    },
    InvalidContributionStatusError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    InvalidIdError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    InvalidOwnershipError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    LogsNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    MarkMessagesAsReadPayload: {
      boolean: [
        7
      ],
      errors: [
        91
      ],
      __typename: [
        1
      ]
    },
    MessageThread: {
      contributionId: [
        6
      ],
      encodedContributionId: [
        1
      ],
      contributionTitle: [
        1
      ],
      mediaTitle: [
        1
      ],
      lastMessagePreview: [
        1
      ],
      lastMessageAt: [
        158
      ],
      unreadCount: [
        6
      ],
      totalCount: [
        6
      ],
      __typename: [
        1
      ]
    },
    MyContributionsConnection: {
      pageInfo: [
        59
      ],
      edges: [
        56
      ],
      nodes: [
        70
      ],
      totalCount: [
        6
      ],
      __typename: [
        1
      ]
    },
    MyContributionsEdge: {
      cursor: [
        1
      ],
      node: [
        70
      ],
      __typename: [
        1
      ]
    },
    MyMessagesConnection: {
      pageInfo: [
        59
      ],
      edges: [
        58
      ],
      nodes: [
        76
      ],
      totalCount: [
        6
      ],
      __typename: [
        1
      ]
    },
    MyMessagesEdge: {
      cursor: [
        1
      ],
      node: [
        76
      ],
      __typename: [
        1
      ]
    },
    PageInfo: {
      hasNextPage: [
        7
      ],
      hasPreviousPage: [
        7
      ],
      startCursor: [
        1
      ],
      endCursor: [
        1
      ],
      __typename: [
        1
      ]
    },
    ReorderDiscsPayload: {
      userContributionDisc: [
        73
      ],
      errors: [
        92
      ],
      __typename: [
        1
      ]
    },
    RevokeApiKeyPayload: {
      apiKeyInfo: [
        8
      ],
      errors: [
        93
      ],
      __typename: [
        1
      ]
    },
    Segment: {
      index: [
        6
      ],
      type: [
        1
      ],
      name: [
        1
      ],
      audioType: [
        1
      ],
      languageCode: [
        1
      ],
      language: [
        1
      ],
      resolution: [
        1
      ],
      aspectRatio: [
        1
      ],
      __typename: [
        1
      ]
    },
    SendAdminMessagePayload: {
      userMessage: [
        76
      ],
      errors: [
        94
      ],
      __typename: [
        1
      ]
    },
    SendUserMessagePayload: {
      userMessage: [
        76
      ],
      errors: [
        95
      ],
      __typename: [
        1
      ]
    },
    SeriesEpisodeNameEntry: {
      seasonNumber: [
        1
      ],
      episodeNumber: [
        1
      ],
      episodeName: [
        1
      ],
      __typename: [
        1
      ]
    },
    SeriesEpisodeNames: {
      tryFind: [
        65,
        {
          season: [
            1,
            "String!"
          ],
          episode: [
            1,
            "String!"
          ]
        }
      ],
      seriesTitle: [
        1
      ],
      seriesYear: [
        1
      ],
      episodes: [
        65
      ],
      __typename: [
        1
      ]
    },
    Title: {
      index: [
        6
      ],
      chapterCount: [
        6
      ],
      length: [
        1
      ],
      displaySize: [
        1
      ],
      size: [
        161
      ],
      playlist: [
        1
      ],
      segmentMap: [
        1
      ],
      comment: [
        1
      ],
      javaComment: [
        1
      ],
      segments: [
        62
      ],
      lengthAsTimeSpan: [
        162
      ],
      __typename: [
        1
      ]
    },
    UpdateContributionPayload: {
      userContribution: [
        70
      ],
      errors: [
        96
      ],
      __typename: [
        1
      ]
    },
    UpdateDiscPayload: {
      userContributionDisc: [
        73
      ],
      errors: [
        97
      ],
      __typename: [
        1
      ]
    },
    UserContribution: {
      id: [
        6
      ],
      userId: [
        1
      ],
      created: [
        158
      ],
      status: [
        156
      ],
      discs: [
        73,
        {
          where: [
            143
          ],
          order: [
            148,
            "[UserContributionDiscSortInput!]"
          ]
        }
      ],
      hashItems: [
        74,
        {
          where: [
            144
          ],
          order: [
            145,
            "[UserContributionDiscHashItemSortInput!]"
          ]
        }
      ],
      mediaType: [
        1
      ],
      externalId: [
        1
      ],
      externalProvider: [
        1
      ],
      releaseDate: [
        158
      ],
      asin: [
        1
      ],
      upc: [
        1
      ],
      frontImageUrl: [
        1
      ],
      backImageUrl: [
        1
      ],
      releaseTitle: [
        1
      ],
      releaseSlug: [
        1
      ],
      locale: [
        1
      ],
      regionCode: [
        1
      ],
      title: [
        1
      ],
      year: [
        1
      ],
      titleSlug: [
        1
      ],
      encodedId: [
        159
      ],
      __typename: [
        1
      ]
    },
    UserContributionAudioTrack: {
      id: [
        6
      ],
      index: [
        6
      ],
      title: [
        1
      ],
      item: [
        75
      ],
      encodedId: [
        159
      ],
      __typename: [
        1
      ]
    },
    UserContributionChapter: {
      id: [
        6
      ],
      index: [
        6
      ],
      title: [
        1
      ],
      item: [
        75
      ],
      encodedId: [
        159
      ],
      __typename: [
        1
      ]
    },
    UserContributionDisc: {
      id: [
        6
      ],
      userContribution: [
        70
      ],
      contentHash: [
        1
      ],
      format: [
        1
      ],
      name: [
        1
      ],
      slug: [
        1
      ],
      logsUploaded: [
        7
      ],
      logUploadError: [
        1
      ],
      index: [
        6
      ],
      existingDiscPath: [
        1
      ],
      items: [
        75,
        {
          where: [
            146
          ],
          order: [
            147,
            "[UserContributionDiscItemSortInput!]"
          ]
        }
      ],
      encodedId: [
        159
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscHashItem: {
      id: [
        6
      ],
      userContribution: [
        70
      ],
      discHash: [
        1
      ],
      index: [
        6
      ],
      name: [
        1
      ],
      creationTime: [
        158
      ],
      size: [
        161
      ],
      encodedId: [
        159
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscItem: {
      id: [
        6
      ],
      disc: [
        73
      ],
      name: [
        1
      ],
      source: [
        1
      ],
      duration: [
        1
      ],
      size: [
        1
      ],
      chapterCount: [
        6
      ],
      segmentCount: [
        6
      ],
      segmentMap: [
        1
      ],
      type: [
        1
      ],
      description: [
        1
      ],
      season: [
        1
      ],
      episode: [
        1
      ],
      chapters: [
        72,
        {
          where: [
            141
          ],
          order: [
            142,
            "[UserContributionChapterSortInput!]"
          ]
        }
      ],
      audioTracks: [
        71,
        {
          where: [
            139
          ],
          order: [
            140,
            "[UserContributionAudioTrackSortInput!]"
          ]
        }
      ],
      encodedId: [
        159
      ],
      __typename: [
        1
      ]
    },
    UserMessage: {
      id: [
        6
      ],
      contributionId: [
        6
      ],
      fromUserId: [
        1
      ],
      toUserId: [
        1
      ],
      message: [
        1
      ],
      isRead: [
        7
      ],
      createdAt: [
        158
      ],
      type: [
        157
      ],
      __typename: [
        1
      ]
    },
    AddAudioTrackToItemError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_DiscItemNotFoundError: [
        32
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AddChapterToItemError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_DiscItemNotFoundError: [
        32
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AddItemToDiscError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    CreateContributionError: {
      on_AuthenticationError: [
        16
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    CreateDiscError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DeleteContributionError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_InvalidContributionStatusError: [
        49
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DeleteItemFromDiscError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_DiscItemNotFoundError: [
        32
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DiscLogsError: {
      on_LogsNotFoundError: [
        52
      ],
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_CouldNotParseLogsError: [
        25
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DiscUploadStatusError: {
      on_DiscNotFoundError: [
        35
      ],
      on_FieldRequiredError: [
        45
      ],
      on_InvalidIdError: [
        50
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    EditItemOnDiscError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_DiscItemNotFoundError: [
        32
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    EpisodeNamesError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_ExternalDataNotFoundError: [
        41
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    ExternalDataError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_ExternalDataNotFoundError: [
        41
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    ExternalDataForContributionError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_ExternalDataSerializationError: [
        43
      ],
      on_ExternalDataNotFoundError: [
        41
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    HashDiscError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    MarkMessagesAsReadError: {
      on_AuthenticationError: [
        16
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    ReorderDiscsError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    RevokeApiKeyError: {
      on_ApiKeyNotFoundError: [
        9
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    SendAdminMessageError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    SendUserMessageError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    UpdateContributionError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_InvalidContributionStatusError: [
        49
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    UpdateDiscError: {
      on_ContributionNotFoundError: [
        22
      ],
      on_DiscNotFoundError: [
        35
      ],
      on_AuthenticationError: [
        16
      ],
      on_InvalidIdError: [
        50
      ],
      on_InvalidOwnershipError: [
        51
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AddAudioTrackToItemInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      itemId: [
        1
      ],
      trackIndex: [
        6
      ],
      trackName: [
        1
      ],
      __typename: [
        1
      ]
    },
    AddChapterToItemInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      itemId: [
        1
      ],
      chapterIndex: [
        6
      ],
      chapterName: [
        1
      ],
      __typename: [
        1
      ]
    },
    AddItemToDiscInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      name: [
        1
      ],
      source: [
        1
      ],
      duration: [
        1
      ],
      size: [
        1
      ],
      chapterCount: [
        6
      ],
      segmentCount: [
        6
      ],
      segmentMap: [
        1
      ],
      type: [
        1
      ],
      description: [
        1
      ],
      season: [
        1
      ],
      episode: [
        1
      ],
      __typename: [
        1
      ]
    },
    ApiKeyInfoFilterInput: {
      and: [
        101
      ],
      or: [
        101
      ],
      name: [
        136
      ],
      keyPrefix: [
        136
      ],
      isActive: [
        105
      ],
      logUsage: [
        105
      ],
      roles: [
        136
      ],
      ownerEmail: [
        136
      ],
      createdAt: [
        110
      ],
      expiresAt: [
        110
      ],
      lastUsedAt: [
        110
      ],
      __typename: [
        1
      ]
    },
    ApiKeyInfoSortInput: {
      name: [
        155
      ],
      keyPrefix: [
        155
      ],
      isActive: [
        155
      ],
      logUsage: [
        155
      ],
      roles: [
        155
      ],
      ownerEmail: [
        155
      ],
      createdAt: [
        155
      ],
      expiresAt: [
        155
      ],
      lastUsedAt: [
        155
      ],
      __typename: [
        1
      ]
    },
    ApiKeyUsageLogInfoFilterInput: {
      and: [
        103
      ],
      or: [
        103
      ],
      apiKeyPrefix: [
        136
      ],
      apiKeyName: [
        136
      ],
      timestamp: [
        110
      ],
      operationName: [
        136
      ],
      fieldCost: [
        121
      ],
      typeCost: [
        121
      ],
      durationMs: [
        124
      ],
      __typename: [
        1
      ]
    },
    ApiKeyUsageLogInfoSortInput: {
      apiKeyPrefix: [
        155
      ],
      apiKeyName: [
        155
      ],
      timestamp: [
        155
      ],
      operationName: [
        155
      ],
      fieldCost: [
        155
      ],
      typeCost: [
        155
      ],
      durationMs: [
        155
      ],
      __typename: [
        1
      ]
    },
    BooleanOperationFilterInput: {
      eq: [
        7
      ],
      neq: [
        7
      ],
      __typename: [
        1
      ]
    },
    ContributionHistorySortInput: {
      id: [
        155
      ],
      contributionId: [
        155
      ],
      timeStamp: [
        155
      ],
      description: [
        155
      ],
      userId: [
        155
      ],
      type: [
        155
      ],
      __typename: [
        1
      ]
    },
    ContributionMutationRequestInput: {
      mediaType: [
        1
      ],
      externalId: [
        1
      ],
      externalProvider: [
        1
      ],
      releaseDate: [
        158
      ],
      asin: [
        1
      ],
      upc: [
        1
      ],
      frontImageUrl: [
        1
      ],
      backImageUrl: [
        1
      ],
      releaseTitle: [
        1
      ],
      releaseSlug: [
        1
      ],
      regionCode: [
        1
      ],
      locale: [
        1
      ],
      title: [
        1
      ],
      year: [
        1
      ],
      storageId: [
        163
      ],
      status: [
        156
      ],
      __typename: [
        1
      ]
    },
    CreateContributionInput: {
      input: [
        107
      ],
      __typename: [
        1
      ]
    },
    CreateDiscInput: {
      contributionId: [
        1
      ],
      contentHash: [
        1
      ],
      format: [
        1
      ],
      name: [
        1
      ],
      slug: [
        1
      ],
      existingDiscPath: [
        1
      ],
      __typename: [
        1
      ]
    },
    DateTimeOperationFilterInput: {
      eq: [
        158
      ],
      neq: [
        158
      ],
      in: [
        158
      ],
      nin: [
        158
      ],
      gt: [
        158
      ],
      ngt: [
        158
      ],
      gte: [
        158
      ],
      ngte: [
        158
      ],
      lt: [
        158
      ],
      nlt: [
        158
      ],
      lte: [
        158
      ],
      nlte: [
        158
      ],
      __typename: [
        1
      ]
    },
    DeleteContributionInput: {
      contributionId: [
        1
      ],
      __typename: [
        1
      ]
    },
    DeleteItemFromDiscInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      itemId: [
        1
      ],
      __typename: [
        1
      ]
    },
    DiscLogsInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      __typename: [
        1
      ]
    },
    DiscUploadStatusInput: {
      discId: [
        1
      ],
      __typename: [
        1
      ]
    },
    EditItemOnDiscInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      itemId: [
        1
      ],
      name: [
        1
      ],
      source: [
        1
      ],
      duration: [
        1
      ],
      size: [
        1
      ],
      chapterCount: [
        6
      ],
      segmentCount: [
        6
      ],
      segmentMap: [
        1
      ],
      type: [
        1
      ],
      description: [
        1
      ],
      season: [
        1
      ],
      episode: [
        1
      ],
      __typename: [
        1
      ]
    },
    EncodedIdOperationFilterInput: {
      and: [
        116
      ],
      or: [
        116
      ],
      eq: [
        160
      ],
      neq: [
        160
      ],
      __typename: [
        1
      ]
    },
    EpisodeNamesInput: {
      contributionId: [
        1
      ],
      __typename: [
        1
      ]
    },
    ExternalDataForContributionInput: {
      contributionId: [
        1
      ],
      __typename: [
        1
      ]
    },
    ExternalDataInput: {
      externalId: [
        1
      ],
      mediaType: [
        1
      ],
      provider: [
        1
      ],
      __typename: [
        1
      ]
    },
    FileHashInfoInput: {
      index: [
        6
      ],
      name: [
        1
      ],
      creationTime: [
        158
      ],
      size: [
        161
      ],
      __typename: [
        1
      ]
    },
    FloatOperationFilterInput: {
      eq: [
        11
      ],
      neq: [
        11
      ],
      in: [
        11
      ],
      nin: [
        11
      ],
      gt: [
        11
      ],
      ngt: [
        11
      ],
      gte: [
        11
      ],
      ngte: [
        11
      ],
      lt: [
        11
      ],
      nlt: [
        11
      ],
      lte: [
        11
      ],
      nlte: [
        11
      ],
      __typename: [
        1
      ]
    },
    GenerateApiKeyInput: {
      name: [
        1
      ],
      ownerEmail: [
        1
      ],
      roles: [
        1
      ],
      expiresAt: [
        158
      ],
      __typename: [
        1
      ]
    },
    HashDiscInput: {
      contributionId: [
        1
      ],
      files: [
        120
      ],
      __typename: [
        1
      ]
    },
    IntOperationFilterInput: {
      eq: [
        6
      ],
      neq: [
        6
      ],
      in: [
        6
      ],
      nin: [
        6
      ],
      gt: [
        6
      ],
      ngt: [
        6
      ],
      gte: [
        6
      ],
      ngte: [
        6
      ],
      lt: [
        6
      ],
      nlt: [
        6
      ],
      lte: [
        6
      ],
      nlte: [
        6
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput: {
      all: [
        139
      ],
      none: [
        139
      ],
      some: [
        139
      ],
      any: [
        7
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionChapterFilterInput: {
      all: [
        141
      ],
      none: [
        141
      ],
      some: [
        141
      ],
      any: [
        7
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionDiscFilterInput: {
      all: [
        143
      ],
      none: [
        143
      ],
      some: [
        143
      ],
      any: [
        7
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput: {
      all: [
        144
      ],
      none: [
        144
      ],
      some: [
        144
      ],
      any: [
        7
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput: {
      all: [
        146
      ],
      none: [
        146
      ],
      some: [
        146
      ],
      any: [
        7
      ],
      __typename: [
        1
      ]
    },
    LongOperationFilterInput: {
      eq: [
        161
      ],
      neq: [
        161
      ],
      in: [
        161
      ],
      nin: [
        161
      ],
      gt: [
        161
      ],
      ngt: [
        161
      ],
      gte: [
        161
      ],
      ngte: [
        161
      ],
      lt: [
        161
      ],
      nlt: [
        161
      ],
      lte: [
        161
      ],
      nlte: [
        161
      ],
      __typename: [
        1
      ]
    },
    MarkMessagesAsReadInput: {
      contributionId: [
        1
      ],
      __typename: [
        1
      ]
    },
    ReorderDiscsInput: {
      contributionId: [
        1
      ],
      discIds: [
        1
      ],
      __typename: [
        1
      ]
    },
    RevokeApiKeyInput: {
      keyPrefix: [
        1
      ],
      __typename: [
        1
      ]
    },
    SendAdminMessageInput: {
      contributionId: [
        1
      ],
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    SendUserMessageInput: {
      contributionId: [
        1
      ],
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    StringOperationFilterInput: {
      and: [
        136
      ],
      or: [
        136
      ],
      eq: [
        1
      ],
      neq: [
        1
      ],
      contains: [
        1
      ],
      ncontains: [
        1
      ],
      in: [
        1
      ],
      nin: [
        1
      ],
      startsWith: [
        1
      ],
      nstartsWith: [
        1
      ],
      endsWith: [
        1
      ],
      nendsWith: [
        1
      ],
      __typename: [
        1
      ]
    },
    UpdateContributionInput: {
      contributionId: [
        1
      ],
      asin: [
        1
      ],
      upc: [
        1
      ],
      releaseDate: [
        158
      ],
      releaseTitle: [
        1
      ],
      releaseSlug: [
        1
      ],
      locale: [
        1
      ],
      regionCode: [
        1
      ],
      frontImageUrl: [
        1
      ],
      backImageUrl: [
        1
      ],
      deleteBackImage: [
        7
      ],
      __typename: [
        1
      ]
    },
    UpdateDiscInput: {
      contributionId: [
        1
      ],
      discId: [
        1
      ],
      format: [
        1
      ],
      name: [
        1
      ],
      slug: [
        1
      ],
      __typename: [
        1
      ]
    },
    UserContributionAudioTrackFilterInput: {
      and: [
        139
      ],
      or: [
        139
      ],
      encodedId: [
        116
      ],
      index: [
        124
      ],
      title: [
        136
      ],
      item: [
        146
      ],
      __typename: [
        1
      ]
    },
    UserContributionAudioTrackSortInput: {
      id: [
        155
      ],
      index: [
        155
      ],
      title: [
        155
      ],
      item: [
        147
      ],
      __typename: [
        1
      ]
    },
    UserContributionChapterFilterInput: {
      and: [
        141
      ],
      or: [
        141
      ],
      encodedId: [
        116
      ],
      index: [
        124
      ],
      title: [
        136
      ],
      item: [
        146
      ],
      __typename: [
        1
      ]
    },
    UserContributionChapterSortInput: {
      id: [
        155
      ],
      index: [
        155
      ],
      title: [
        155
      ],
      item: [
        147
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscFilterInput: {
      and: [
        143
      ],
      or: [
        143
      ],
      encodedId: [
        116
      ],
      userContribution: [
        149
      ],
      contentHash: [
        136
      ],
      format: [
        136
      ],
      name: [
        136
      ],
      slug: [
        136
      ],
      logsUploaded: [
        105
      ],
      logUploadError: [
        136
      ],
      index: [
        124
      ],
      existingDiscPath: [
        136
      ],
      items: [
        129
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscHashItemFilterInput: {
      and: [
        144
      ],
      or: [
        144
      ],
      encodedId: [
        116
      ],
      userContribution: [
        149
      ],
      discHash: [
        136
      ],
      index: [
        124
      ],
      name: [
        136
      ],
      creationTime: [
        110
      ],
      size: [
        130
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscHashItemSortInput: {
      id: [
        155
      ],
      userContribution: [
        150
      ],
      discHash: [
        155
      ],
      index: [
        155
      ],
      name: [
        155
      ],
      creationTime: [
        155
      ],
      size: [
        155
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscItemFilterInput: {
      and: [
        146
      ],
      or: [
        146
      ],
      encodedId: [
        116
      ],
      disc: [
        143
      ],
      name: [
        136
      ],
      source: [
        136
      ],
      duration: [
        136
      ],
      size: [
        136
      ],
      chapterCount: [
        124
      ],
      segmentCount: [
        124
      ],
      segmentMap: [
        136
      ],
      type: [
        136
      ],
      description: [
        136
      ],
      season: [
        136
      ],
      episode: [
        136
      ],
      chapters: [
        126
      ],
      audioTracks: [
        125
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscItemSortInput: {
      id: [
        155
      ],
      disc: [
        148
      ],
      name: [
        155
      ],
      source: [
        155
      ],
      duration: [
        155
      ],
      size: [
        155
      ],
      chapterCount: [
        155
      ],
      segmentCount: [
        155
      ],
      segmentMap: [
        155
      ],
      type: [
        155
      ],
      description: [
        155
      ],
      season: [
        155
      ],
      episode: [
        155
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscSortInput: {
      id: [
        155
      ],
      userContribution: [
        150
      ],
      contentHash: [
        155
      ],
      format: [
        155
      ],
      name: [
        155
      ],
      slug: [
        155
      ],
      logsUploaded: [
        155
      ],
      logUploadError: [
        155
      ],
      index: [
        155
      ],
      existingDiscPath: [
        155
      ],
      __typename: [
        1
      ]
    },
    UserContributionFilterInput: {
      and: [
        149
      ],
      or: [
        149
      ],
      encodedId: [
        116
      ],
      userId: [
        136
      ],
      created: [
        110
      ],
      status: [
        151
      ],
      discs: [
        127
      ],
      hashItems: [
        128
      ],
      mediaType: [
        136
      ],
      externalId: [
        136
      ],
      externalProvider: [
        136
      ],
      releaseDate: [
        110
      ],
      asin: [
        136
      ],
      upc: [
        136
      ],
      frontImageUrl: [
        136
      ],
      backImageUrl: [
        136
      ],
      releaseTitle: [
        136
      ],
      releaseSlug: [
        136
      ],
      locale: [
        136
      ],
      regionCode: [
        136
      ],
      title: [
        136
      ],
      year: [
        136
      ],
      titleSlug: [
        136
      ],
      __typename: [
        1
      ]
    },
    UserContributionSortInput: {
      id: [
        155
      ],
      userId: [
        155
      ],
      created: [
        155
      ],
      status: [
        155
      ],
      mediaType: [
        155
      ],
      externalId: [
        155
      ],
      externalProvider: [
        155
      ],
      releaseDate: [
        155
      ],
      asin: [
        155
      ],
      upc: [
        155
      ],
      frontImageUrl: [
        155
      ],
      backImageUrl: [
        155
      ],
      releaseTitle: [
        155
      ],
      releaseSlug: [
        155
      ],
      locale: [
        155
      ],
      regionCode: [
        155
      ],
      title: [
        155
      ],
      year: [
        155
      ],
      titleSlug: [
        155
      ],
      __typename: [
        1
      ]
    },
    UserContributionStatusOperationFilterInput: {
      eq: [
        156
      ],
      neq: [
        156
      ],
      in: [
        156
      ],
      nin: [
        156
      ],
      __typename: [
        1
      ]
    },
    UserMessageSortInput: {
      id: [
        155
      ],
      contributionId: [
        155
      ],
      fromUserId: [
        155
      ],
      toUserId: [
        155
      ],
      message: [
        155
      ],
      isRead: [
        155
      ],
      createdAt: [
        155
      ],
      type: [
        155
      ],
      __typename: [
        1
      ]
    },
    ApplyPolicy: {},
    ContributionHistoryType: {},
    SortEnumType: {},
    UserContributionStatus: {},
    UserMessageType: {},
    DateTime: {},
    EncodedId: {},
    EncodedIdFilter: {},
    Long: {},
    TimeSpan: {},
    UUID: {},
    Query: {
      contributions: [
        23,
        {
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          where: [
            149
          ],
          order: [
            150,
            "[UserContributionSortInput!]"
          ]
        }
      ],
      myContributions: [
        55,
        {
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          where: [
            149
          ],
          order: [
            150,
            "[UserContributionSortInput!]"
          ]
        }
      ],
      contributionHistory: [
        20,
        {
          contributionId: [
            6,
            "Int!"
          ],
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          order: [
            106,
            "[ContributionHistorySortInput!]"
          ]
        }
      ],
      contributionChat: [
        17,
        {
          contributionId: [
            1,
            "String!"
          ],
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          order: [
            152,
            "[UserMessageSortInput!]"
          ]
        }
      ],
      hasUnreadMessages: [
        7
      ],
      myMessages: [
        57,
        {
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          order: [
            152,
            "[UserMessageSortInput!]"
          ]
        }
      ],
      messageThreads: [
        54
      ],
      amazonProductMetadata: [
        5,
        {
          asin: [
            1,
            "String!"
          ]
        }
      ],
      apiKeys: [
        14,
        {
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          where: [
            101
          ],
          order: [
            102,
            "[ApiKeyInfoSortInput!]"
          ]
        }
      ],
      apiKeyUsageLogs: [
        12,
        {
          first: [
            6
          ],
          after: [
            1
          ],
          last: [
            6
          ],
          before: [
            1
          ],
          where: [
            103
          ],
          order: [
            104,
            "[ApiKeyUsageLogInfoSortInput!]"
          ]
        }
      ],
      __typename: [
        1
      ]
    },
    Mutation: {
      addAudioTrackToItem: [
        2,
        {
          input: [
            98,
            "AddAudioTrackToItemInput!"
          ]
        }
      ],
      addChapterToItem: [
        3,
        {
          input: [
            99,
            "AddChapterToItemInput!"
          ]
        }
      ],
      addItemToDisc: [
        4,
        {
          input: [
            100,
            "AddItemToDiscInput!"
          ]
        }
      ],
      createContribution: [
        26,
        {
          input: [
            108,
            "CreateContributionInput!"
          ]
        }
      ],
      createDisc: [
        27,
        {
          input: [
            109,
            "CreateDiscInput!"
          ]
        }
      ],
      deleteContribution: [
        28,
        {
          input: [
            111,
            "DeleteContributionInput!"
          ]
        }
      ],
      deleteItemFromDisc: [
        29,
        {
          input: [
            112,
            "DeleteItemFromDiscInput!"
          ]
        }
      ],
      editItemOnDisc: [
        38,
        {
          input: [
            115,
            "EditItemOnDiscInput!"
          ]
        }
      ],
      generateApiKey: [
        46,
        {
          input: [
            122,
            "GenerateApiKeyInput!"
          ]
        }
      ],
      discLogs: [
        34,
        {
          input: [
            113,
            "DiscLogsInput!"
          ]
        }
      ],
      discUploadStatus: [
        37,
        {
          input: [
            114,
            "DiscUploadStatusInput!"
          ]
        }
      ],
      episodeNames: [
        39,
        {
          input: [
            117,
            "EpisodeNamesInput!"
          ]
        }
      ],
      externalData: [
        42,
        {
          input: [
            119,
            "ExternalDataInput!"
          ]
        }
      ],
      externalDataForContribution: [
        40,
        {
          input: [
            118,
            "ExternalDataForContributionInput!"
          ]
        }
      ],
      hashDisc: [
        47,
        {
          input: [
            123,
            "HashDiscInput!"
          ]
        }
      ],
      markMessagesAsRead: [
        53,
        {
          input: [
            131,
            "MarkMessagesAsReadInput!"
          ]
        }
      ],
      reorderDiscs: [
        60,
        {
          input: [
            132,
            "ReorderDiscsInput!"
          ]
        }
      ],
      revokeApiKey: [
        61,
        {
          input: [
            133,
            "RevokeApiKeyInput!"
          ]
        }
      ],
      sendAdminMessage: [
        63,
        {
          input: [
            134,
            "SendAdminMessageInput!"
          ]
        }
      ],
      sendUserMessage: [
        64,
        {
          input: [
            135,
            "SendUserMessageInput!"
          ]
        }
      ],
      updateContribution: [
        68,
        {
          input: [
            137,
            "UpdateContributionInput!"
          ]
        }
      ],
      updateDisc: [
        69,
        {
          input: [
            138,
            "UpdateDiscInput!"
          ]
        }
      ],
      __typename: [
        1
      ]
    }
  }
};

// src/genql-contributions/schema.ts
var enumApplyPolicy = {
  BEFORE_RESOLVER: "BEFORE_RESOLVER",
  AFTER_RESOLVER: "AFTER_RESOLVER",
  VALIDATION: "VALIDATION"
};
var enumContributionHistoryType = {
  CREATED: "CREATED",
  STATUS_CHANGED: "STATUS_CHANGED",
  DELETED: "DELETED",
  ADMIN_MESSAGE: "ADMIN_MESSAGE",
  USER_MESSAGE: "USER_MESSAGE"
};
var enumUserContributionStatus = {
  PENDING: "PENDING",
  READY_FOR_REVIEW: "READY_FOR_REVIEW",
  APPROVED: "APPROVED",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
  REJECTED: "REJECTED",
  IMPORTED: "IMPORTED"
};
var enumUserMessageType = {
  ADMIN_MESSAGE: "ADMIN_MESSAGE",
  USER_MESSAGE: "USER_MESSAGE"
};
// src/genql-contributions/index.ts
var typeMap2 = linkTypeMap2(types_default2);
var createClient4 = function(options) {
  return createClient3({
    url: undefined,
    ...options,
    queryRoot: typeMap2.Query,
    mutationRoot: typeMap2.Mutation,
    subscriptionRoot: typeMap2.Subscription
  });
};

// src/contributions.ts
var mutationHasData = (data, dataProp) => {
  if (data.errors) {
    throw Error(data.errors.map((e) => e.message).join("; "));
  }
  return data[dataProp] !== null;
};
var removeInvalidTmdbImageUrls = (results) => {
  return results.map((r) => {
    if (r.imageUrl) {
      try {
        const { pathname } = new URL(r.imageUrl);
        const split = pathname.split("/");
        if (!split[4])
          r.imageUrl = null;
      } catch {
        r.imageUrl = null;
      }
    }
    return r;
  });
};

class DiscDBContributionsClient {
  origin = DISCDB_ORIGIN;
  userAgent = `discdbapi/${version}`;
  cookies;
  gql;
  constructor(options) {
    if (options?.origin) {
      this.origin = options.origin;
    }
    if (options?.userAgent !== undefined) {
      this.userAgent = options.userAgent;
    }
    if (options?.cookies !== undefined) {
      this.cookies = options.cookies;
    }
    this.gql = createClient4({
      url: new URL("/graphql", this.origin ?? DISCDB_ORIGIN).href,
      headers: {
        "User-Agent": options?.userAgent,
        Cookie: options?.cookies
      }
    });
  }
  getImageUrl(path, options) {
    return getImageUrl(path, { origin: this.origin, ...options });
  }
  async fetch(path, options) {
    const { ignoreResponseType, ...opts } = options ?? {};
    const headers = new Headers;
    headers.set("User-Agent", this.userAgent);
    if (this.cookies)
      headers.set("Cookie", this.cookies);
    const response = await fetch(new URL(path, this.origin), {
      method: opts?.method ?? "GET",
      ...opts,
      headers: {
        ...Object.fromEntries(headers.entries()),
        ...opts?.headers
      }
    });
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}: ${await response.text()}`);
    }
    console.log(response.headers.get("Content-Type"));
    if (ignoreResponseType)
      return null;
    if (!response.headers.get("Content-Type")?.startsWith("application/json")) {
      throw Error("Invalid non-JSON response. Are you properly authenticated?");
    }
    const data = await response.json();
    return data;
  }
  async externalSearch(type, query) {
    const { results } = await this.fetch(`/api/contribute/externalsearch/${type.toLowerCase()}?${new URLSearchParams({ query })}`, { method: "GET" });
    return removeInvalidTmdbImageUrls(results);
  }
  async getExternalData(type, externalId, provider = "TMDB") {
    const data = await this.gql.mutation({
      externalData: {
        __args: {
          input: {
            mediaType: type.toLowerCase(),
            externalId: String(externalId),
            provider
          }
        },
        externalMetadata: { id: true, title: true, year: true, imageUrl: true },
        errors: {
          on_ContributionNotFoundError: { message: true },
          on_ExternalDataNotFoundError: { message: true }
        }
      }
    });
    if (!mutationHasData(data.externalData, "externalMetadata")) {
      throw Error("No external data found");
    }
    removeInvalidTmdbImageUrls([data.externalData.externalMetadata]);
    return data.externalData.externalMetadata;
  }
  async getContributionExternalData(contributionId) {
    const data = await this.gql.mutation({
      externalDataForContribution: {
        __args: { input: { contributionId } },
        externalMetadata: { id: true, title: true, year: true, imageUrl: true },
        errors: {
          on_ContributionNotFoundError: { message: true },
          on_ExternalDataNotFoundError: { message: true }
        }
      }
    });
    if (!mutationHasData(data.externalDataForContribution, "externalMetadata")) {
      throw Error("No external data found");
    }
    return data.externalDataForContribution.externalMetadata;
  }
  async getMyContributions(input, select) {
    const data = await this.gql.query({
      myContributions: {
        __args: unifyPageArgs(input),
        nodes: select ?? {
          id: true,
          encodedId: true,
          title: true,
          releaseTitle: true,
          year: true,
          mediaType: true,
          status: true,
          frontImageUrl: true,
          created: true
        },
        pageInfo: { __scalar: true },
        totalCount: true
      }
    });
    return {
      contributions: fixMediaTypes(data.myContributions?.nodes ?? [], "mediaType"),
      page: data.myContributions ? unifyPageInfo(input, data.myContributions.pageInfo) : undefined,
      totalCount: data.myContributions?.totalCount ?? 0
    };
  }
  async getContribution(id) {
    const data = await this.gql.query({
      myContributions: {
        __args: { where: { encodedId: { eq: id } } },
        nodes: {
          id: true,
          encodedId: true,
          year: true,
          releaseTitle: true,
          releaseSlug: true,
          status: true,
          mediaType: true,
          releaseDate: true,
          regionCode: true,
          title: true,
          asin: true,
          upc: true,
          externalProvider: true,
          externalId: true,
          frontImageUrl: true,
          backImageUrl: true,
          created: true,
          locale: true,
          discs: {
            encodedId: true,
            name: true,
            existingDiscPath: true,
            logsUploaded: true,
            format: true,
            slug: true,
            id: true
          }
        }
      }
    });
    const contribution = data.myContributions?.nodes?.[0];
    if (!contribution)
      throw Error("No such contribution");
    fixMediaTypes([contribution], "mediaType");
    return contribution;
  }
  async uploadTemporalContributionImage(uploaderId, variant, file) {
    const body = new FormData;
    body.append(`uploader-${uploaderId}`, file);
    await this.fetch(`/api/contribute/images/${variant}/upload/${uploaderId}`, {
      method: "POST",
      body,
      ignoreResponseType: true
    });
    return {
      id: uploaderId,
      variant,
      url: `/api/contribute/images/Contributions/releaseImages/${uploaderId}/${variant}.jpg`
    };
  }
  async deleteTemporalContributionImage(uploaderId, variant) {
    await this.fetch(`/api/contribute/images/${variant}/remove/${uploaderId}`, {
      method: "POST",
      ignoreResponseType: true
    });
  }
  async uploadContributionImage(contributionId, variant, file, uploaderId) {
    const body = new FormData;
    body.append(`uploader-${uploaderId}`, file);
    const data = await this.fetch(`/api/contribute/${contributionId}/images/${variant}/upload`, { method: "POST", body });
    return { variant, url: data.imageUrl };
  }
  async deleteContributionImage(contributionId, variant) {
    await this.fetch(`/api/contribute/${contributionId}/images/${variant}/delete`, { method: "POST", ignoreResponseType: true });
  }
  async createContribution(input) {
    const data = await this.gql.mutation({
      createContribution: {
        __args: {
          input: {
            input: {
              releaseSlug: slugify(input.releaseTitle),
              ...input
            }
          }
        },
        userContribution: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.createContribution, "userContribution")) {
      throw Error("Mutation returned no data");
    }
    return data.createContribution.userContribution;
  }
  async updateContribution(input) {
    const data = await this.gql.mutation({
      updateContribution: {
        __args: { input },
        userContribution: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.updateContribution, "userContribution")) {
      throw Error("Mutation returned no data");
    }
    return data.updateContribution.userContribution;
  }
  async deleteContribution(contributionId) {
    const data = await this.gql.mutation({
      deleteContribution: {
        __args: { input: { contributionId } },
        userContribution: { id: true },
        errors: { on_Error: { message: true } }
      }
    });
    mutationHasData(data.deleteContribution, "userContribution");
  }
  async hash(contributionId, files) {
    const data = await this.gql.mutation({
      hashDisc: {
        __args: {
          input: {
            contributionId,
            files: files.map((file, i) => file instanceof File ? {
              index: i + 1,
              name: file.name,
              size: file.size,
              creationTime: new Date(file.lastModified).toISOString()
            } : {
              index: file.index,
              name: file.name,
              size: file.size,
              creationTime: new Date(file.created).toISOString()
            })
          }
        },
        discHash: { hash: true },
        errors: { on_ContributionNotFoundError: { message: true } }
      }
    });
    if (!mutationHasData(data.hashDisc, "discHash")) {
      throw Error("Server did not return a hash");
    }
    return data.hashDisc.discHash.hash;
  }
  async createDisc(contributionId, contentHash, format, name, slug) {
    const data = await this.gql.mutation({
      createDisc: {
        __args: {
          input: {
            contentHash,
            contributionId,
            format,
            name,
            slug: slug ?? slugify(name)
          }
        },
        userContributionDisc: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.createDisc, "userContributionDisc")) {
      throw Error("Mutation returned no data");
    }
    return data.createDisc.userContributionDisc;
  }
  async updateDisc(contributionId, discId, input) {
    const data = await this.gql.mutation({
      updateDisc: {
        __args: { input: { contributionId, discId, ...input } },
        userContributionDisc: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.updateDisc, "userContributionDisc")) {
      throw Error("Mutation returned no data");
    }
    return data.updateDisc.userContributionDisc;
  }
  async uploadDiscLogs(contributionId, discId, logs) {
    await this.fetch(`/api/contribute/${contributionId}/discs/${discId}/logs`, {
      method: "POST",
      body: logs,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  async getDiscUploadStatus(discId) {
    const data = await this.gql.mutation({
      discUploadStatus: {
        __args: { input: { discId } },
        discUploadStatus: { logsUploaded: true, logUploadError: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.discUploadStatus, "discUploadStatus")) {
      throw Error("Mutation returned no data");
    }
    return data.discUploadStatus.discUploadStatus;
  }
  async getDiscLogs(contributionId, discId) {
    const data = await this.gql.mutation({
      discLogs: {
        __args: { input: { contributionId, discId } },
        discLogs: {
          info: {
            titles: {
              index: true,
              chapterCount: true,
              length: true,
              displaySize: true,
              size: true,
              playlist: true,
              segmentMap: true,
              comment: true,
              javaComment: true,
              segments: { type: true, name: true, audioType: true }
            }
          },
          disc: {
            contentHash: true,
            format: true,
            name: true,
            slug: true,
            logsUploaded: true,
            existingDiscPath: true,
            encodedId: true,
            items: {
              description: true,
              encodedId: true,
              name: true,
              source: true,
              duration: true,
              size: true,
              chapterCount: true,
              segmentCount: true,
              segmentMap: true,
              type: true,
              season: true,
              episode: true,
              audioTracks: {
                encodedId: true,
                index: true,
                title: true,
                id: true
              },
              chapters: {
                encodedId: true,
                index: true,
                title: true,
                id: true
              },
              id: true
            },
            id: true
          },
          contribution: {
            encodedId: true,
            mediaType: true,
            title: true,
            year: true,
            releaseTitle: true,
            discs: {
              encodedId: true,
              name: true,
              items: {
                chapterCount: true,
                name: true,
                chapters: {
                  encodedId: true,
                  index: true,
                  title: true,
                  id: true
                },
                id: true
              },
              id: true
            },
            id: true
          }
        },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.discLogs, "discLogs")) {
      throw Error("Server returned no log data");
    }
    return data.discLogs.discLogs;
  }
  async addItemToDisc(contributionId, discId, input) {
    const data = await this.gql.mutation({
      addItemToDisc: {
        __args: { input: { contributionId, discId, ...input } },
        userContributionDiscItem: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.addItemToDisc, "userContributionDiscItem")) {
      throw Error("Mutation returned no data");
    }
    return data.addItemToDisc.userContributionDiscItem;
  }
  async updateItemOnDisc(contributionId, discId, itemId, input) {
    const data = await this.gql.mutation({
      editItemOnDisc: {
        __args: { input: { contributionId, discId, itemId, ...input } },
        userContributionDiscItem: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.editItemOnDisc, "userContributionDiscItem")) {
      throw Error("Mutation returned no data");
    }
    return data.editItemOnDisc.userContributionDiscItem;
  }
  async deleteItemFromDisc(contributionId, discId, itemId) {
    const data = await this.gql.mutation({
      deleteItemFromDisc: {
        __args: { input: { contributionId, discId, itemId } },
        userContributionDiscItem: {
          __typename: true,
          on_UserContributionDiscItem: { id: true }
        },
        errors: { on_Error: { message: true } }
      }
    });
    mutationHasData(data.deleteItemFromDisc, "userContributionDiscItem");
  }
  async reorderDiscs(contributionId, discIds) {
    const data = await this.gql.mutation({
      reorderDiscs: {
        __args: { input: { contributionId, discIds } },
        userContributionDisc: {
          id: true,
          encodedId: true,
          index: true,
          name: true,
          slug: true
        },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.reorderDiscs, "userContributionDisc")) {
      throw Error("Mutation returned no data");
    }
    return data.reorderDiscs.userContributionDisc;
  }
  async addAudioTrackToItem(contributionId, discId, itemId, trackIndex, trackName) {
    const data = await this.gql.mutation({
      addAudioTrackToItem: {
        __args: {
          input: { contributionId, discId, itemId, trackIndex, trackName }
        },
        userContributionAudioTrack: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.addAudioTrackToItem, "userContributionAudioTrack")) {
      throw Error("Mutation returned no data");
    }
    return data.addAudioTrackToItem.userContributionAudioTrack;
  }
  async addChapterToItem(contributionId, discId, itemId, chapterIndex, chapterName) {
    const data = await this.gql.mutation({
      addChapterToItem: {
        __args: {
          input: { contributionId, discId, itemId, chapterIndex, chapterName }
        },
        userContributionChapter: { encodedId: true, id: true },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.addChapterToItem, "userContributionChapter")) {
      throw Error("Mutation returned no data");
    }
    return data.addChapterToItem.userContributionChapter;
  }
  async getSeriesEpisodes(contributionId) {
    const data = await this.gql.mutation({
      episodeNames: {
        __args: { input: { contributionId } },
        seriesEpisodeNames: {
          __scalar: true,
          episodes: { __scalar: true }
        },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.episodeNames, "seriesEpisodeNames")) {
      throw Error("Mutation returned no data");
    }
    const result = data.episodeNames.seriesEpisodeNames;
    return {
      name: result.seriesTitle,
      year: result.seriesYear,
      episodes: result.episodes
    };
  }
  async findSeriesEpisode(contributionId, season, episode) {
    const data = await this.gql.mutation({
      episodeNames: {
        __args: { input: { contributionId } },
        seriesEpisodeNames: {
          tryFind: {
            __args: { season: String(season), episode: String(episode) },
            episodeName: true,
            seasonNumber: true,
            episodeNumber: true
          }
        },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.episodeNames, "seriesEpisodeNames")) {
      throw Error("Mutation returned no data");
    }
    const result = data.episodeNames.seriesEpisodeNames.tryFind;
    if (result) {
      return {
        name: result.episodeName,
        season: result.seasonNumber,
        episode: result.episodeNumber
      };
    }
    return null;
  }
  async generateApiKey(name, ownerEmail, roles, expiresAt) {
    const data = await this.gql.mutation({
      generateApiKey: {
        __args: { input: { name, ownerEmail, roles, expiresAt } },
        name: true,
        ownerEmail: true,
        key: true,
        keyPrefix: true
      }
    });
    return data.generateApiKey;
  }
  async getApiKeys(input) {
    const data = await this.gql.query({
      apiKeys: {
        __args: unifyPageArgs(input),
        nodes: {
          name: true,
          ownerEmail: true,
          roles: true,
          createdAt: true,
          expiresAt: true,
          lastUsedAt: true,
          isActive: true
        },
        pageInfo: { __scalar: true }
      }
    });
    return {
      keys: data.apiKeys?.nodes ?? [],
      page: data.apiKeys?.pageInfo ? unifyPageInfo(input, data.apiKeys.pageInfo) : undefined
    };
  }
  async getApiKey(keyPrefix) {
    const data = await this.getApiKeys({
      query: { keyPrefix: { eq: keyPrefix } }
    });
    if (data.keys.length === 0) {
      throw Error(`No such key with the prefix "${keyPrefix}"`);
    }
    return data.keys[0];
  }
  async getApiKeyUsageLogs(input) {
    const data = await this.gql.query({
      apiKeyUsageLogs: {
        __args: unifyPageArgs(input),
        nodes: { __scalar: true },
        pageInfo: { __scalar: true }
      }
    });
    return {
      logs: data.apiKeyUsageLogs?.nodes ?? [],
      page: data.apiKeyUsageLogs?.pageInfo ? unifyPageInfo(input, data.apiKeyUsageLogs.pageInfo) : undefined
    };
  }
  async revokeApiKey(keyPrefix) {
    const data = await this.gql.mutation({
      revokeApiKey: {
        __args: { input: { keyPrefix } },
        apiKeyInfo: {
          name: true,
          ownerEmail: true,
          roles: true,
          createdAt: true,
          expiresAt: true,
          lastUsedAt: true
        },
        errors: {
          on_ApiKeyNotFoundError: { message: true },
          on_Error: { message: true }
        }
      }
    });
    if (!mutationHasData(data.revokeApiKey, "apiKeyInfo")) {
      throw Error("Mutation returned no data");
    }
    return data.revokeApiKey.apiKeyInfo;
  }
  async getContributionChat(contributionId, input) {
    const data = await this.gql.query({
      contributionChat: {
        __args: { contributionId, ...unifyPageArgs(input) },
        nodes: {
          contributionId: true,
          createdAt: true,
          id: true,
          isRead: true,
          message: true,
          fromUserId: true,
          toUserId: true,
          type: true
        },
        pageInfo: { __scalar: true },
        totalCount: true
      }
    });
    if (!data.contributionChat) {
      throw Error("No contribution chat for that ID");
    }
    return {
      messages: data.contributionChat.nodes,
      page: unifyPageInfo(input, data.contributionChat.pageInfo),
      totalCount: data.contributionChat.totalCount
    };
  }
  async getContributionHistory(contributionId, input) {
    const data = await this.gql.query({
      contributionHistory: {
        __args: { contributionId, ...unifyPageArgs(input) },
        nodes: {
          contributionId: true,
          description: true,
          id: true,
          timeStamp: true,
          type: true,
          userId: true
        },
        pageInfo: { __scalar: true },
        totalCount: true
      }
    });
    if (!data.contributionHistory) {
      throw Error("No contribution history for that ID");
    }
    return {
      history: data.contributionHistory.nodes,
      page: unifyPageInfo(input, data.contributionHistory.pageInfo),
      totalCount: data.contributionHistory.totalCount
    };
  }
  async getContributions(input, select) {
    const data = await this.gql.query({
      contributions: {
        __args: unifyPageArgs(input),
        nodes: select ?? {
          id: true,
          encodedId: true,
          title: true,
          year: true,
          mediaType: true,
          status: true,
          frontImageUrl: true,
          backImageUrl: true,
          created: true,
          releaseTitle: true,
          releaseSlug: true
        },
        pageInfo: { __scalar: true },
        totalCount: true
      }
    });
    return {
      contributions: fixMediaTypes(data.contributions?.nodes ?? [], "mediaType"),
      page: data.contributions ? unifyPageInfo(input, data.contributions.pageInfo) : undefined,
      totalCount: data.contributions?.totalCount ?? 0
    };
  }
  async hasUnreadMessages() {
    const data = await this.gql.query({ hasUnreadMessages: true });
    return data.hasUnreadMessages;
  }
  async markMessagesAsRead(contributionId) {
    const data = await this.gql.mutation({
      markMessagesAsRead: {
        __args: { input: { contributionId } },
        boolean: true,
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.markMessagesAsRead, "boolean")) {
      throw Error("Mutation returned no data");
    }
    return data.markMessagesAsRead.boolean;
  }
  async sendMessage(contributionId, content, type = enumUserMessageType.USER_MESSAGE) {
    const mutation = type === enumUserMessageType.ADMIN_MESSAGE ? "sendAdminMessage" : "sendUserMessage";
    const data = await this.gql.mutation({
      [mutation]: {
        __args: { input: { contributionId, message: content } },
        userMessage: {
          contributionId: true,
          createdAt: true,
          id: true,
          isRead: true,
          message: true,
          fromUserId: true,
          toUserId: true,
          type: true
        },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data[mutation], "userMessage")) {
      throw Error("Mutation returned no data");
    }
    return data[mutation].userMessage;
  }
  async getMessageThreads() {
    const data = await this.gql.query({ messageThreads: { __scalar: true } });
    return data.messageThreads;
  }
  async getMyMessages(input) {
    const data = await this.gql.query({
      myMessages: {
        __args: input,
        nodes: {
          contributionId: true,
          createdAt: true,
          id: true,
          isRead: true,
          message: true,
          fromUserId: true,
          toUserId: true,
          type: true
        },
        pageInfo: { __scalar: true },
        totalCount: true
      }
    });
    return {
      messages: data.myMessages?.nodes ?? [],
      page: data.myMessages ? unifyPageInfo(input, data.myMessages.pageInfo) : undefined,
      totalCount: data.myMessages?.totalCount ?? 0
    };
  }
  async getAmazonProductMetadata(asin) {
    const data = await this.gql.query({
      amazonProductMetadata: { __args: { asin }, __scalar: true }
    });
    if (!data.amazonProductMetadata) {
      throw Error(`No metadata found for ASIN "${asin}"`);
    }
    return data.amazonProductMetadata;
  }
}
export {
  unifyPageInfo,
  unifyPageArgs,
  slugify,
  getImageUrl,
  fixMediaTypes,
  enumUserMessageType,
  enumUserContributionStatus,
  enumContributionHistoryType,
  enumApplyPolicy,
  SearchType,
  MediaItemType,
  MediaItemGroupRole,
  ItemType,
  DiscFormat,
  DiscDBContributionsClient,
  DiscDBClient,
  DISCDB_ORIGIN
};
