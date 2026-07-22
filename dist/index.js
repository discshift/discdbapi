// src/constants.ts
var DISCDB_ORIGIN = "https://thediscdb.com";
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
  ItemType2["Episode"] = "Episode";
  ItemType2["Extra"] = "Extra";
  ItemType2["Featurette"] = "Featurette";
  ItemType2["Interview"] = "Interview";
  ItemType2["Scene"] = "Scene";
  ItemType2["Music"] = "Music";
  ItemType2["Short"] = "Short";
  ItemType2["Other"] = "Other";
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
var extraTypes = [
  "Extra" /* Extra */,
  "Featurette" /* Featurette */,
  "Interview" /* Interview */,
  "Music" /* Music */,
  "Other" /* Other */,
  "Scene" /* Scene */,
  "Short" /* Short */
];
var isExtra = (type) => extraTypes.includes(type);

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
    12,
    36,
    42,
    46,
    50,
    59
  ],
  types: {
    ListFilterInputTypeOfTrackFilterInput: {
      all: [
        35
      ],
      none: [
        35
      ],
      some: [
        35
      ],
      any: [
        36
      ],
      __typename: [
        50
      ]
    },
    MediaItem: {
      id: [
        46
      ],
      title: [
        50
      ],
      slug: [
        50
      ],
      fullTitle: [
        50
      ],
      sortTitle: [
        50
      ],
      year: [
        46
      ],
      type: [
        50
      ],
      imageUrl: [
        50
      ],
      externalids: [
        45
      ],
      externalIdsId: [
        46
      ],
      releases: [
        56,
        {
          where: [
            62
          ],
          order: [
            4,
            "[ReleaseSortInput!]"
          ]
        }
      ],
      mediaItemGroups: [
        66,
        {
          where: [
            19
          ],
          order: [
            11,
            "[MediaItemGroupSortInput!]"
          ]
        }
      ],
      plot: [
        50
      ],
      tagline: [
        50
      ],
      directors: [
        50
      ],
      writers: [
        50
      ],
      stars: [
        50
      ],
      genres: [
        50
      ],
      runtimeMinutes: [
        46
      ],
      runtime: [
        50
      ],
      contentRating: [
        50
      ],
      releaseDate: [
        59
      ],
      latestReleaseDate: [
        59
      ],
      dateAdded: [
        59
      ],
      __typename: [
        50
      ]
    },
    DateTimeOperationFilterInput: {
      eq: [
        59
      ],
      neq: [
        59
      ],
      in: [
        59
      ],
      nin: [
        59
      ],
      gt: [
        59
      ],
      ngt: [
        59
      ],
      gte: [
        59
      ],
      ngte: [
        59
      ],
      lt: [
        59
      ],
      nlt: [
        59
      ],
      lte: [
        59
      ],
      nlte: [
        59
      ],
      __typename: [
        50
      ]
    },
    MediaItemSortInput: {
      id: [
        12
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
        12
      ],
      type: [
        12
      ],
      imageUrl: [
        12
      ],
      externalids: [
        38
      ],
      externalIdsId: [
        12
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
        12
      ],
      runtime: [
        12
      ],
      contentRating: [
        12
      ],
      releaseDate: [
        12
      ],
      latestReleaseDate: [
        12
      ],
      dateAdded: [
        12
      ],
      __typename: [
        50
      ]
    },
    ReleaseSortInput: {
      id: [
        12
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
        12
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
        12
      ],
      dateAdded: [
        12
      ],
      fullTitle: [
        12
      ],
      type: [
        12
      ],
      mediaItem: [
        3
      ],
      boxset: [
        40
      ],
      __typename: [
        50
      ]
    },
    ChapterSortInput: {
      id: [
        12
      ],
      index: [
        12
      ],
      title: [
        12
      ],
      __typename: [
        50
      ]
    },
    ListFilterInputTypeOfReleaseFilterInput: {
      all: [
        62
      ],
      none: [
        62
      ],
      some: [
        62
      ],
      any: [
        36
      ],
      __typename: [
        50
      ]
    },
    ReleaseGroupSortInput: {
      id: [
        12
      ],
      releaseId: [
        12
      ],
      groupId: [
        12
      ],
      release: [
        4
      ],
      group: [
        24
      ],
      __typename: [
        50
      ]
    },
    MediaItemFilterInput: {
      and: [
        8
      ],
      or: [
        8
      ],
      id: [
        14
      ],
      title: [
        57
      ],
      slug: [
        57
      ],
      fullTitle: [
        57
      ],
      sortTitle: [
        57
      ],
      year: [
        14
      ],
      type: [
        57
      ],
      imageUrl: [
        57
      ],
      externalids: [
        33
      ],
      externalIdsId: [
        14
      ],
      releases: [
        6
      ],
      mediaItemGroups: [
        18
      ],
      plot: [
        57
      ],
      tagline: [
        57
      ],
      directors: [
        57
      ],
      writers: [
        57
      ],
      stars: [
        57
      ],
      genres: [
        57
      ],
      runtimeMinutes: [
        14
      ],
      runtime: [
        57
      ],
      contentRating: [
        57
      ],
      releaseDate: [
        2
      ],
      latestReleaseDate: [
        2
      ],
      dateAdded: [
        2
      ],
      __typename: [
        50
      ]
    },
    Group: {
      id: [
        46
      ],
      imdbId: [
        50
      ],
      name: [
        50
      ],
      slug: [
        50
      ],
      imageUrl: [
        50
      ],
      mediaItemGroups: [
        66,
        {
          where: [
            19
          ],
          order: [
            11,
            "[MediaItemGroupSortInput!]"
          ]
        }
      ],
      releaseGroups: [
        44,
        {
          where: [
            60
          ],
          order: [
            7,
            "[ReleaseGroupSortInput!]"
          ]
        }
      ],
      __typename: [
        50
      ]
    },
    FileNameTemplateInput: {
      itemType: [
        50
      ],
      template: [
        50
      ],
      __typename: [
        50
      ]
    },
    MediaItemGroupSortInput: {
      id: [
        12
      ],
      mediaItemId: [
        12
      ],
      groupId: [
        12
      ],
      role: [
        12
      ],
      isFeatured: [
        12
      ],
      mediaItem: [
        3
      ],
      group: [
        24
      ],
      __typename: [
        50
      ]
    },
    SortEnumType: {},
    BoxsetFilterInput: {
      and: [
        13
      ],
      or: [
        13
      ],
      id: [
        14
      ],
      title: [
        57
      ],
      sortTitle: [
        57
      ],
      slug: [
        57
      ],
      imageUrl: [
        57
      ],
      release: [
        62
      ],
      releaseId: [
        14
      ],
      type: [
        57
      ],
      __typename: [
        50
      ]
    },
    IntOperationFilterInput: {
      eq: [
        46
      ],
      neq: [
        46
      ],
      in: [
        46
      ],
      nin: [
        46
      ],
      gt: [
        46
      ],
      ngt: [
        46
      ],
      gte: [
        46
      ],
      ngte: [
        46
      ],
      lt: [
        46
      ],
      nlt: [
        46
      ],
      lte: [
        46
      ],
      nlte: [
        46
      ],
      __typename: [
        50
      ]
    },
    MediaItemsConnection: {
      pageInfo: [
        30
      ],
      edges: [
        26
      ],
      nodes: [
        1
      ],
      __typename: [
        50
      ]
    },
    ReleaseDiscFilterInput: {
      and: [
        16
      ],
      or: [
        16
      ],
      id: [
        14
      ],
      releaseId: [
        14
      ],
      release: [
        62
      ],
      discId: [
        14
      ],
      disc: [
        52
      ],
      index: [
        14
      ],
      slug: [
        57
      ],
      name: [
        57
      ],
      titles: [
        37
      ],
      format: [
        57
      ],
      contentHash: [
        57
      ],
      globalDiscId: [
        57
      ],
      __typename: [
        50
      ]
    },
    ListFilterInputTypeOfReleaseGroupFilterInput: {
      all: [
        60
      ],
      none: [
        60
      ],
      some: [
        60
      ],
      any: [
        36
      ],
      __typename: [
        50
      ]
    },
    ListFilterInputTypeOfMediaItemGroupFilterInput: {
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
        36
      ],
      __typename: [
        50
      ]
    },
    MediaItemGroupFilterInput: {
      and: [
        19
      ],
      or: [
        19
      ],
      id: [
        14
      ],
      mediaItemId: [
        14
      ],
      groupId: [
        14
      ],
      role: [
        57
      ],
      isFeatured: [
        25
      ],
      mediaItem: [
        8
      ],
      group: [
        48
      ],
      __typename: [
        50
      ]
    },
    LongOperationFilterInput: {
      eq: [
        42
      ],
      neq: [
        42
      ],
      in: [
        42
      ],
      nin: [
        42
      ],
      gt: [
        42
      ],
      ngt: [
        42
      ],
      gte: [
        42
      ],
      ngte: [
        42
      ],
      lt: [
        42
      ],
      nlt: [
        42
      ],
      lte: [
        42
      ],
      nlte: [
        42
      ],
      __typename: [
        50
      ]
    },
    TrackSortInput: {
      id: [
        12
      ],
      index: [
        12
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
        53
      ],
      __typename: [
        50
      ]
    },
    ListReleaseDiscFilterTypeFilterInput: {
      all: [
        16
      ],
      none: [
        16
      ],
      some: [
        16
      ],
      any: [
        36
      ],
      __typename: [
        50
      ]
    },
    Chapter: {
      id: [
        46
      ],
      index: [
        46
      ],
      title: [
        50
      ],
      __typename: [
        50
      ]
    },
    GroupSortInput: {
      id: [
        12
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
      __typename: [
        50
      ]
    },
    BooleanOperationFilterInput: {
      eq: [
        36
      ],
      neq: [
        36
      ],
      __typename: [
        50
      ]
    },
    MediaItemsEdge: {
      cursor: [
        50
      ],
      node: [
        1
      ],
      __typename: [
        50
      ]
    },
    BoxsetsEdge: {
      cursor: [
        50
      ],
      node: [
        31
      ],
      __typename: [
        50
      ]
    },
    Contributor: {
      id: [
        46
      ],
      name: [
        50
      ],
      releases: [
        56
      ],
      userId: [
        50
      ],
      source: [
        50
      ],
      __typename: [
        50
      ]
    },
    TitleFilterInput: {
      and: [
        29
      ],
      or: [
        29
      ],
      index: [
        14
      ],
      disc: [
        52
      ],
      id: [
        14
      ],
      comment: [
        57
      ],
      sourceFile: [
        57
      ],
      segmentMap: [
        57
      ],
      duration: [
        57
      ],
      size: [
        20
      ],
      displaySize: [
        57
      ],
      item: [
        34
      ],
      discItemReferenceId: [
        14
      ],
      tracks: [
        0
      ],
      description: [
        57
      ],
      itemType: [
        57
      ],
      season: [
        57
      ],
      episode: [
        57
      ],
      hasItem: [
        25
      ],
      __typename: [
        50
      ]
    },
    PageInfo: {
      hasNextPage: [
        36
      ],
      hasPreviousPage: [
        36
      ],
      startCursor: [
        50
      ],
      endCursor: [
        50
      ],
      __typename: [
        50
      ]
    },
    Boxset: {
      id: [
        46
      ],
      title: [
        50
      ],
      sortTitle: [
        50
      ],
      slug: [
        50
      ],
      imageUrl: [
        50
      ],
      release: [
        56
      ],
      releaseId: [
        46
      ],
      type: [
        50
      ],
      __typename: [
        50
      ]
    },
    ContributorFilterInput: {
      and: [
        32
      ],
      or: [
        32
      ],
      id: [
        14
      ],
      name: [
        57
      ],
      releases: [
        6
      ],
      userId: [
        57
      ],
      source: [
        57
      ],
      __typename: [
        50
      ]
    },
    ExternalIdsFilterInput: {
      and: [
        33
      ],
      or: [
        33
      ],
      id: [
        14
      ],
      tmdb: [
        57
      ],
      imdb: [
        57
      ],
      tvdb: [
        57
      ],
      mediaItem: [
        8
      ],
      __typename: [
        50
      ]
    },
    DiscItemReferenceFilterInput: {
      and: [
        34
      ],
      or: [
        34
      ],
      id: [
        14
      ],
      title: [
        57
      ],
      type: [
        57
      ],
      description: [
        57
      ],
      chapters: [
        64
      ],
      season: [
        57
      ],
      episode: [
        57
      ],
      discItem: [
        29
      ],
      __typename: [
        50
      ]
    },
    TrackFilterInput: {
      and: [
        35
      ],
      or: [
        35
      ],
      id: [
        14
      ],
      index: [
        14
      ],
      name: [
        57
      ],
      type: [
        57
      ],
      resolution: [
        57
      ],
      aspectRatio: [
        57
      ],
      audioType: [
        57
      ],
      languageCode: [
        57
      ],
      language: [
        57
      ],
      description: [
        57
      ],
      title: [
        29
      ],
      __typename: [
        50
      ]
    },
    Boolean: {},
    ListFilterInputTypeOfTitleFilterInput: {
      all: [
        29
      ],
      none: [
        29
      ],
      some: [
        29
      ],
      any: [
        36
      ],
      __typename: [
        50
      ]
    },
    ExternalIdsSortInput: {
      id: [
        12
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
        3
      ],
      __typename: [
        50
      ]
    },
    MediaItemsByGroupEdge: {
      cursor: [
        50
      ],
      node: [
        1
      ],
      __typename: [
        50
      ]
    },
    BoxsetSortInput: {
      id: [
        12
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
        4
      ],
      releaseId: [
        12
      ],
      type: [
        12
      ],
      __typename: [
        50
      ]
    },
    DiscSortInput: {
      id: [
        12
      ],
      index: [
        12
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
      globalDiscId: [
        12
      ],
      release: [
        4
      ],
      __typename: [
        50
      ]
    },
    Long: {},
    Track: {
      id: [
        46
      ],
      index: [
        46
      ],
      name: [
        50
      ],
      type: [
        50
      ],
      resolution: [
        50
      ],
      aspectRatio: [
        50
      ],
      audioType: [
        50
      ],
      languageCode: [
        50
      ],
      language: [
        50
      ],
      description: [
        50
      ],
      title: [
        58
      ],
      __typename: [
        50
      ]
    },
    ReleaseGroup: {
      id: [
        46
      ],
      releaseId: [
        46
      ],
      groupId: [
        46
      ],
      release: [
        56,
        {
          where: [
            62
          ],
          order: [
            4,
            "[ReleaseSortInput!]"
          ]
        }
      ],
      group: [
        9,
        {
          where: [
            48
          ],
          order: [
            24,
            "[GroupSortInput!]"
          ]
        }
      ],
      __typename: [
        50
      ]
    },
    ExternalIds: {
      id: [
        46
      ],
      tmdb: [
        50
      ],
      imdb: [
        50
      ],
      tvdb: [
        50
      ],
      mediaItem: [
        1
      ],
      __typename: [
        50
      ]
    },
    Int: {},
    DiscItemReferenceSortInput: {
      id: [
        12
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
      season: [
        12
      ],
      episode: [
        12
      ],
      discItem: [
        53
      ],
      __typename: [
        50
      ]
    },
    GroupFilterInput: {
      and: [
        48
      ],
      or: [
        48
      ],
      id: [
        14
      ],
      imdbId: [
        57
      ],
      name: [
        57
      ],
      slug: [
        57
      ],
      imageUrl: [
        57
      ],
      mediaItemGroups: [
        18
      ],
      releaseGroups: [
        17
      ],
      __typename: [
        50
      ]
    },
    Query: {
      mediaItems: [
        15,
        {
          first: [
            46
          ],
          after: [
            50
          ],
          last: [
            46
          ],
          before: [
            50
          ],
          where: [
            8
          ],
          order: [
            3,
            "[MediaItemSortInput!]"
          ]
        }
      ],
      boxsets: [
        68,
        {
          first: [
            46
          ],
          after: [
            50
          ],
          last: [
            46
          ],
          before: [
            50
          ],
          where: [
            13
          ],
          order: [
            40,
            "[BoxsetSortInput!]"
          ]
        }
      ],
      mediaItemsByGroup: [
        51,
        {
          slug: [
            50,
            "String!"
          ],
          role: [
            50
          ],
          first: [
            46
          ],
          after: [
            50
          ],
          last: [
            46
          ],
          before: [
            50
          ],
          where: [
            8
          ],
          order: [
            3,
            "[MediaItemSortInput!]"
          ]
        }
      ],
      __typename: [
        50
      ]
    },
    String: {},
    MediaItemsByGroupConnection: {
      pageInfo: [
        30
      ],
      edges: [
        39
      ],
      nodes: [
        1
      ],
      __typename: [
        50
      ]
    },
    DiscFilterInput: {
      and: [
        52
      ],
      or: [
        52
      ],
      id: [
        14
      ],
      index: [
        14
      ],
      slug: [
        57
      ],
      name: [
        57
      ],
      format: [
        57
      ],
      contentHash: [
        57
      ],
      globalDiscId: [
        57
      ],
      titles: [
        37
      ],
      release: [
        62
      ],
      releaseDiscs: [
        22
      ],
      __typename: [
        50
      ]
    },
    TitleSortInput: {
      index: [
        12
      ],
      disc: [
        41
      ],
      id: [
        12
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
        12
      ],
      displaySize: [
        12
      ],
      item: [
        47
      ],
      discItemReferenceId: [
        12
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
        12
      ],
      __typename: [
        50
      ]
    },
    ChapterFilterInput: {
      and: [
        54
      ],
      or: [
        54
      ],
      id: [
        14
      ],
      index: [
        14
      ],
      title: [
        57
      ],
      __typename: [
        50
      ]
    },
    ReleaseDiscSortInput: {
      id: [
        12
      ],
      releaseId: [
        12
      ],
      release: [
        4
      ],
      discId: [
        12
      ],
      disc: [
        41
      ],
      index: [
        12
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
      globalDiscId: [
        12
      ],
      __typename: [
        50
      ]
    },
    Release: {
      id: [
        46
      ],
      slug: [
        50
      ],
      title: [
        50
      ],
      regionCode: [
        50
      ],
      locale: [
        50
      ],
      year: [
        46
      ],
      upc: [
        50
      ],
      isbn: [
        50
      ],
      asin: [
        50
      ],
      imageUrl: [
        50
      ],
      backImageUrl: [
        50
      ],
      releaseDate: [
        59
      ],
      dateAdded: [
        59
      ],
      fullTitle: [
        50
      ],
      type: [
        50
      ],
      discs: [
        67,
        {
          where: [
            16
          ],
          order: [
            55,
            "[ReleaseDiscSortInput!]"
          ]
        }
      ],
      releaseGroups: [
        44,
        {
          where: [
            60
          ],
          order: [
            7,
            "[ReleaseGroupSortInput!]"
          ]
        }
      ],
      mediaItem: [
        1
      ],
      boxset: [
        31
      ],
      contributors: [
        28
      ],
      __typename: [
        50
      ]
    },
    StringOperationFilterInput: {
      and: [
        57
      ],
      or: [
        57
      ],
      eq: [
        50
      ],
      neq: [
        50
      ],
      contains: [
        50
      ],
      ncontains: [
        50
      ],
      in: [
        50
      ],
      nin: [
        50
      ],
      startsWith: [
        50
      ],
      nstartsWith: [
        50
      ],
      endsWith: [
        50
      ],
      nendsWith: [
        50
      ],
      __typename: [
        50
      ]
    },
    Title: {
      index: [
        46
      ],
      disc: [
        61
      ],
      id: [
        46
      ],
      comment: [
        50
      ],
      sourceFile: [
        50
      ],
      segmentMap: [
        50
      ],
      duration: [
        50
      ],
      size: [
        42
      ],
      displaySize: [
        50
      ],
      item: [
        63
      ],
      discItemReferenceId: [
        46
      ],
      tracks: [
        43,
        {
          where: [
            35
          ],
          order: [
            21,
            "[TrackSortInput!]"
          ]
        }
      ],
      description: [
        50
      ],
      itemType: [
        50
      ],
      season: [
        50
      ],
      episode: [
        50
      ],
      hasItem: [
        36
      ],
      filename: [
        50,
        {
          templates: [
            10,
            "[FileNameTemplateInput!]"
          ]
        }
      ],
      __typename: [
        50
      ]
    },
    DateTime: {},
    ReleaseGroupFilterInput: {
      and: [
        60
      ],
      or: [
        60
      ],
      id: [
        14
      ],
      releaseId: [
        14
      ],
      groupId: [
        14
      ],
      release: [
        62
      ],
      group: [
        48
      ],
      __typename: [
        50
      ]
    },
    Disc: {
      id: [
        46
      ],
      index: [
        46
      ],
      slug: [
        50
      ],
      name: [
        50
      ],
      format: [
        50
      ],
      contentHash: [
        50
      ],
      globalDiscId: [
        50
      ],
      titles: [
        58,
        {
          where: [
            29
          ],
          order: [
            53,
            "[TitleSortInput!]"
          ]
        }
      ],
      release: [
        56
      ],
      releaseDiscs: [
        67
      ],
      __typename: [
        50
      ]
    },
    ReleaseFilterInput: {
      and: [
        62
      ],
      or: [
        62
      ],
      id: [
        14
      ],
      slug: [
        57
      ],
      title: [
        57
      ],
      regionCode: [
        57
      ],
      locale: [
        57
      ],
      year: [
        14
      ],
      upc: [
        57
      ],
      isbn: [
        57
      ],
      asin: [
        57
      ],
      imageUrl: [
        57
      ],
      backImageUrl: [
        57
      ],
      releaseDate: [
        2
      ],
      dateAdded: [
        2
      ],
      fullTitle: [
        57
      ],
      type: [
        57
      ],
      discs: [
        22
      ],
      releaseGroups: [
        17
      ],
      mediaItem: [
        8
      ],
      boxset: [
        13
      ],
      contributors: [
        65
      ],
      __typename: [
        50
      ]
    },
    DiscItemReference: {
      id: [
        46
      ],
      title: [
        50
      ],
      type: [
        50
      ],
      description: [
        50
      ],
      chapters: [
        23,
        {
          where: [
            54
          ],
          order: [
            5,
            "[ChapterSortInput!]"
          ]
        }
      ],
      season: [
        50
      ],
      episode: [
        50
      ],
      discItem: [
        58
      ],
      __typename: [
        50
      ]
    },
    ListFilterInputTypeOfChapterFilterInput: {
      all: [
        54
      ],
      none: [
        54
      ],
      some: [
        54
      ],
      any: [
        36
      ],
      __typename: [
        50
      ]
    },
    ListFilterInputTypeOfContributorFilterInput: {
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
        36
      ],
      __typename: [
        50
      ]
    },
    MediaItemGroup: {
      id: [
        46
      ],
      mediaItemId: [
        46
      ],
      groupId: [
        46
      ],
      role: [
        50
      ],
      isFeatured: [
        36
      ],
      mediaItem: [
        1,
        {
          where: [
            8
          ],
          order: [
            3,
            "[MediaItemSortInput!]"
          ]
        }
      ],
      group: [
        9,
        {
          where: [
            48
          ],
          order: [
            24,
            "[GroupSortInput!]"
          ]
        }
      ],
      __typename: [
        50
      ]
    },
    ReleaseDisc: {
      id: [
        46
      ],
      releaseId: [
        46
      ],
      release: [
        56
      ],
      discId: [
        46
      ],
      disc: [
        61
      ],
      index: [
        46
      ],
      slug: [
        50
      ],
      name: [
        50
      ],
      format: [
        50
      ],
      contentHash: [
        50
      ],
      globalDiscId: [
        50
      ],
      titles: [
        58,
        {
          where: [
            29
          ],
          order: [
            53,
            "[TitleSortInput!]"
          ]
        }
      ],
      __typename: [
        50
      ]
    },
    BoxsetsConnection: {
      pageInfo: [
        30
      ],
      edges: [
        27
      ],
      nodes: [
        31
      ],
      __typename: [
        50
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

// src/client.ts
class DiscDBClient {
  origin = DISCDB_ORIGIN;
  userAgent = `discdbapi/1.0.0`;
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
  async getDiscByIdOrHash(values) {
    const valuesWhere = [];
    if ("id" in values) {
      valuesWhere.push({ globalDiscId: { eq: values.id } });
    }
    if ("hash" in values) {
      valuesWhere.push({ contentHash: { eq: values.hash } });
    }
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            releases: {
              some: { discs: { some: { or: valuesWhere } } }
            }
          }
        },
        nodes: GQL_NODE_QUERY
      }
    });
    let disc;
    const releases = (data.mediaItems?.nodes ?? []).flatMap((mediaItem) => mediaItem.releases.map((release) => ({
      ...release,
      mediaItem: { ...mediaItem, releases: undefined }
    })));
    for (const release of releases) {
      const matched = release.discs.find((d) => {
        if ("hash" in values && d.contentHash !== null) {
          return d.contentHash === values.hash;
        }
        if ("id" in values && d.globalDiscId !== null) {
          return d.globalDiscId === values.id;
        }
        return false;
      });
      if (matched) {
        if (disc) {
          disc.releases.push(release);
        } else {
          disc = { ...matched, releases: [release] };
        }
      }
    }
    if (!disc) {
      throw Error("No disc could be found with the provided values");
    }
    return disc;
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
  async getReleaseByUPC(upc) {
    const data = await this.gql.query({
      mediaItems: {
        __args: { where: { releases: { some: { upc: { eq: String(upc) } } } } },
        nodes: GQL_NODE_QUERY
      }
    });
    const node = data.mediaItems?.nodes?.[0];
    if (!node)
      throw Error(`No release with UPC ${upc}`);
    const release = node.releases.find((r) => r.upc === String(upc));
    if (!release) {
      throw Error(`No release with UPC ${upc}`);
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
    upc: true,
    asin: true,
    discs: {
      __args: { order: [{ index: enumSortEnumType.ASC }] },
      globalDiscId: true,
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
// package.json
var version = "1.0.0";

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
    9,
    10,
    14,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
    238
  ],
  types: {
    Error: {
      message: [
        1
      ],
      on_ApiKeyNotFoundError: [
        12
      ],
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_ContributionAlreadyInBoxsetError: [
        27
      ],
      on_ContributionNotFoundError: [
        33
      ],
      on_CouldNotParseLogsError: [
        36
      ],
      on_DiscItemNotFoundError: [
        47
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_ExistingDiscAlreadyInBoxsetError: [
        55
      ],
      on_ExternalDataNotFoundError: [
        57
      ],
      on_ExternalDataSerializationError: [
        59
      ],
      on_FieldRequiredError: [
        61
      ],
      on_InvalidBoxsetStatusError: [
        65
      ],
      on_InvalidContributionStatusError: [
        66
      ],
      on_InvalidDiscPathError: [
        67
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_LogsNotFoundError: [
        70
      ],
      on_MismatchedReleaseSlugError: [
        74
      ],
      __typename: [
        1
      ]
    },
    String: {},
    AddAudioTrackToItemPayload: {
      userContributionAudioTrack: [
        100
      ],
      errors: [
        110
      ],
      __typename: [
        1
      ]
    },
    AddChapterToItemPayload: {
      userContributionChapter: [
        103
      ],
      errors: [
        111
      ],
      __typename: [
        1
      ]
    },
    AddDiscToBoxsetPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        112
      ],
      __typename: [
        1
      ]
    },
    AddExistingDiscToBoxsetPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        113
      ],
      __typename: [
        1
      ]
    },
    AddItemToDiscPayload: {
      userContributionDiscItem: [
        106
      ],
      errors: [
        114
      ],
      __typename: [
        1
      ]
    },
    AddSubtitleTrackToItemPayload: {
      userContributionSubtitleTrack: [
        107
      ],
      errors: [
        115
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
        233
      ],
      numberOfDiscs: [
        9
      ],
      aspectRatio: [
        1
      ],
      isDiscontinued: [
        10
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
        10
      ],
      logUsage: [
        10
      ],
      roles: [
        1
      ],
      ownerEmail: [
        1
      ],
      createdAt: [
        233
      ],
      expiresAt: [
        233
      ],
      lastUsedAt: [
        233
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
        233
      ],
      operationName: [
        1
      ],
      fieldCost: [
        14
      ],
      typeCost: [
        14
      ],
      durationMs: [
        9
      ],
      __typename: [
        1
      ]
    },
    Float: {},
    ApiKeyUsageLogsConnection: {
      pageInfo: [
        81
      ],
      edges: [
        16
      ],
      nodes: [
        13
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
        13
      ],
      __typename: [
        1
      ]
    },
    ApiKeysConnection: {
      pageInfo: [
        81
      ],
      edges: [
        18
      ],
      nodes: [
        11
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
        11
      ],
      __typename: [
        1
      ]
    },
    AttachDiscIdResult: {
      outcome: [
        228
      ],
      contentHash: [
        1
      ],
      mediaItemSlug: [
        1
      ],
      boxsetSlug: [
        1
      ],
      mediaItemType: [
        1
      ],
      releaseSlug: [
        1
      ],
      discSlug: [
        1
      ],
      discIndex: [
        9
      ],
      globalDiscId: [
        1
      ],
      existingGlobalDiscId: [
        1
      ],
      matchedDifferentDisc: [
        10
      ],
      __typename: [
        1
      ]
    },
    AttachGlobalDiscIdPayload: {
      attachDiscIdResult: [
        19
      ],
      errors: [
        116
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
    BoxsetChatConnection: {
      pageInfo: [
        81
      ],
      edges: [
        23
      ],
      nodes: [
        109
      ],
      totalCount: [
        9
      ],
      __typename: [
        1
      ]
    },
    BoxsetChatEdge: {
      cursor: [
        1
      ],
      node: [
        109
      ],
      __typename: [
        1
      ]
    },
    BoxsetContributionsConnection: {
      pageInfo: [
        81
      ],
      edges: [
        25
      ],
      nodes: [
        101
      ],
      totalCount: [
        9
      ],
      __typename: [
        1
      ]
    },
    BoxsetContributionsEdge: {
      cursor: [
        1
      ],
      node: [
        101
      ],
      __typename: [
        1
      ]
    },
    BoxsetNotFoundError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ContributionAlreadyInBoxsetError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ContributionChatConnection: {
      pageInfo: [
        81
      ],
      edges: [
        29
      ],
      nodes: [
        109
      ],
      totalCount: [
        9
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
        109
      ],
      __typename: [
        1
      ]
    },
    ContributionHistory: {
      id: [
        9
      ],
      contributionId: [
        9
      ],
      timeStamp: [
        233
      ],
      description: [
        1
      ],
      userId: [
        1
      ],
      type: [
        229
      ],
      __typename: [
        1
      ]
    },
    ContributionHistoryConnection: {
      pageInfo: [
        81
      ],
      edges: [
        32
      ],
      nodes: [
        30
      ],
      totalCount: [
        9
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
        30
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
        81
      ],
      edges: [
        35
      ],
      nodes: [
        99
      ],
      totalCount: [
        9
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
        99
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
    CreateBoxsetPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        117
      ],
      __typename: [
        1
      ]
    },
    CreateContributionPayload: {
      userContribution: [
        99
      ],
      errors: [
        118
      ],
      __typename: [
        1
      ]
    },
    CreateDiscPayload: {
      userContributionDisc: [
        104
      ],
      errors: [
        119
      ],
      __typename: [
        1
      ]
    },
    DeleteBoxsetPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        120
      ],
      __typename: [
        1
      ]
    },
    DeleteContributionPayload: {
      userContribution: [
        99
      ],
      errors: [
        121
      ],
      __typename: [
        1
      ]
    },
    DeleteDiscFromContributionPayload: {
      userContributionDisc: [
        104
      ],
      errors: [
        122
      ],
      __typename: [
        1
      ]
    },
    DeleteFileNameTemplatePayload: {
      boolean: [
        10
      ],
      errors: [
        123
      ],
      __typename: [
        1
      ]
    },
    DeleteItemFromDiscPayload: {
      userContributionDiscItem: [
        106
      ],
      errors: [
        124
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
        95
      ],
      hashInfo: [
        64
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
        46
      ],
      disc: [
        104
      ],
      contribution: [
        99
      ],
      __typename: [
        1
      ]
    },
    DiscLogsPayload: {
      discLogs: [
        48
      ],
      errors: [
        125
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
        10
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
        51
      ],
      errors: [
        126
      ],
      __typename: [
        1
      ]
    },
    EditItemOnDiscPayload: {
      userContributionDiscItem: [
        106
      ],
      errors: [
        127
      ],
      __typename: [
        1
      ]
    },
    EpisodeNamesPayload: {
      seriesEpisodeNames: [
        93
      ],
      errors: [
        128
      ],
      __typename: [
        1
      ]
    },
    ExistingDiscAlreadyInBoxsetError: {
      message: [
        1
      ],
      __typename: [
        1
      ]
    },
    ExternalDataForContributionPayload: {
      externalMetadata: [
        60
      ],
      errors: [
        130
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
        60
      ],
      errors: [
        129
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
        9
      ],
      title: [
        1
      ],
      year: [
        9
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
        45
      ],
      errors: [
        131
      ],
      __typename: [
        1
      ]
    },
    HashInfoLogLine: {
      matches: [
        10,
        {
          prefix: [
            1,
            "String!"
          ]
        }
      ],
      index: [
        9
      ],
      name: [
        1
      ],
      creationTime: [
        233
      ],
      size: [
        236
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
    InvalidBoxsetStatusError: {
      message: [
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
    InvalidDiscPathError: {
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
    MarkBoxsetMessagesAsReadPayload: {
      boolean: [
        10
      ],
      errors: [
        132
      ],
      __typename: [
        1
      ]
    },
    MarkMessagesAsReadPayload: {
      boolean: [
        10
      ],
      errors: [
        133
      ],
      __typename: [
        1
      ]
    },
    MessageThread: {
      contributionId: [
        9
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
        233
      ],
      unreadCount: [
        9
      ],
      totalCount: [
        9
      ],
      isBoxset: [
        10
      ],
      __typename: [
        1
      ]
    },
    MismatchedReleaseSlugError: {
      message: [
        1
      ],
      boxsetSlug: [
        1
      ],
      offendingReleaseSlug: [
        1
      ],
      contributionTitle: [
        1
      ],
      __typename: [
        1
      ]
    },
    MyBoxsetsConnection: {
      pageInfo: [
        81
      ],
      edges: [
        76
      ],
      nodes: [
        101
      ],
      totalCount: [
        9
      ],
      __typename: [
        1
      ]
    },
    MyBoxsetsEdge: {
      cursor: [
        1
      ],
      node: [
        101
      ],
      __typename: [
        1
      ]
    },
    MyContributionsConnection: {
      pageInfo: [
        81
      ],
      edges: [
        78
      ],
      nodes: [
        99
      ],
      totalCount: [
        9
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
        99
      ],
      __typename: [
        1
      ]
    },
    MyMessagesConnection: {
      pageInfo: [
        81
      ],
      edges: [
        80
      ],
      nodes: [
        109
      ],
      totalCount: [
        9
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
        109
      ],
      __typename: [
        1
      ]
    },
    PageInfo: {
      hasNextPage: [
        10
      ],
      hasPreviousPage: [
        10
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
    RemoveBoxsetMemberPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        134
      ],
      __typename: [
        1
      ]
    },
    RemoveDiscFromBoxsetPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        135
      ],
      __typename: [
        1
      ]
    },
    ReorderBoxsetMembersPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        136
      ],
      __typename: [
        1
      ]
    },
    ReorderDiscsPayload: {
      userContributionDisc: [
        104
      ],
      errors: [
        137
      ],
      __typename: [
        1
      ]
    },
    RevokeApiKeyPayload: {
      apiKeyInfo: [
        11
      ],
      errors: [
        138
      ],
      __typename: [
        1
      ]
    },
    Segment: {
      index: [
        9
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
    SendAdminBoxsetMessagePayload: {
      userMessage: [
        109
      ],
      errors: [
        139
      ],
      __typename: [
        1
      ]
    },
    SendAdminMessagePayload: {
      userMessage: [
        109
      ],
      errors: [
        140
      ],
      __typename: [
        1
      ]
    },
    SendBoxsetUserMessagePayload: {
      userMessage: [
        109
      ],
      errors: [
        141
      ],
      __typename: [
        1
      ]
    },
    SendUserMessagePayload: {
      userMessage: [
        109
      ],
      errors: [
        142
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
        92,
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
        92
      ],
      __typename: [
        1
      ]
    },
    SetFileNameTemplatePayload: {
      userFileNameTemplate: [
        108
      ],
      errors: [
        143
      ],
      __typename: [
        1
      ]
    },
    Title: {
      index: [
        9
      ],
      chapterCount: [
        9
      ],
      length: [
        1
      ],
      displaySize: [
        1
      ],
      size: [
        236
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
        87
      ],
      lengthAsTimeSpan: [
        237
      ],
      __typename: [
        1
      ]
    },
    UpdateBoxsetPayload: {
      userContributionBoxset: [
        101
      ],
      errors: [
        144
      ],
      __typename: [
        1
      ]
    },
    UpdateContributionPayload: {
      userContribution: [
        99
      ],
      errors: [
        145
      ],
      __typename: [
        1
      ]
    },
    UpdateDiscPayload: {
      userContributionDisc: [
        104
      ],
      errors: [
        146
      ],
      __typename: [
        1
      ]
    },
    UserContribution: {
      id: [
        9
      ],
      userId: [
        1
      ],
      created: [
        233
      ],
      status: [
        231
      ],
      boxsetId: [
        9
      ],
      boxset: [
        101
      ],
      discs: [
        104,
        {
          where: [
            215
          ],
          order: [
            220,
            "[UserContributionDiscSortInput!]"
          ]
        }
      ],
      hashItems: [
        105,
        {
          where: [
            216
          ],
          order: [
            217,
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
        233
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
        234
      ],
      __typename: [
        1
      ]
    },
    UserContributionAudioTrack: {
      id: [
        9
      ],
      index: [
        9
      ],
      title: [
        1
      ],
      item: [
        106
      ],
      encodedId: [
        234
      ],
      __typename: [
        1
      ]
    },
    UserContributionBoxset: {
      id: [
        9
      ],
      userId: [
        1
      ],
      created: [
        233
      ],
      status: [
        231
      ],
      title: [
        1
      ],
      sortTitle: [
        1
      ],
      slug: [
        1
      ],
      frontImageUrl: [
        1
      ],
      backImageUrl: [
        1
      ],
      asin: [
        1
      ],
      upc: [
        1
      ],
      releaseDate: [
        233
      ],
      locale: [
        1
      ],
      regionCode: [
        1
      ],
      members: [
        102,
        {
          where: [
            210
          ],
          order: [
            211,
            "[UserContributionBoxsetMemberSortInput!]"
          ]
        }
      ],
      encodedId: [
        234
      ],
      __typename: [
        1
      ]
    },
    UserContributionBoxsetMember: {
      id: [
        9
      ],
      boxset: [
        101
      ],
      disc: [
        104
      ],
      sortOrder: [
        9
      ],
      existingDiscPath: [
        1
      ],
      existingDiscName: [
        1
      ],
      existingDiscFormat: [
        1
      ],
      __typename: [
        1
      ]
    },
    UserContributionChapter: {
      id: [
        9
      ],
      index: [
        9
      ],
      title: [
        1
      ],
      item: [
        106
      ],
      encodedId: [
        234
      ],
      __typename: [
        1
      ]
    },
    UserContributionDisc: {
      id: [
        9
      ],
      userContribution: [
        99
      ],
      contentHash: [
        1
      ],
      globalDiscId: [
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
        10
      ],
      logUploadError: [
        1
      ],
      index: [
        9
      ],
      existingDiscPath: [
        1
      ],
      items: [
        106,
        {
          where: [
            218
          ],
          order: [
            219,
            "[UserContributionDiscItemSortInput!]"
          ]
        }
      ],
      encodedId: [
        234
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscHashItem: {
      id: [
        9
      ],
      userContribution: [
        99
      ],
      discHash: [
        1
      ],
      index: [
        9
      ],
      name: [
        1
      ],
      creationTime: [
        233
      ],
      size: [
        236
      ],
      encodedId: [
        234
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscItem: {
      id: [
        9
      ],
      disc: [
        104
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
        9
      ],
      segmentCount: [
        9
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
        103,
        {
          where: [
            213
          ],
          order: [
            214,
            "[UserContributionChapterSortInput!]"
          ]
        }
      ],
      audioTracks: [
        100,
        {
          where: [
            207
          ],
          order: [
            208,
            "[UserContributionAudioTrackSortInput!]"
          ]
        }
      ],
      subtitleTracks: [
        107,
        {
          where: [
            224
          ],
          order: [
            225,
            "[UserContributionSubtitleTrackSortInput!]"
          ]
        }
      ],
      encodedId: [
        234
      ],
      filename: [
        1
      ],
      __typename: [
        1
      ]
    },
    UserContributionSubtitleTrack: {
      id: [
        9
      ],
      index: [
        9
      ],
      title: [
        1
      ],
      item: [
        106
      ],
      encodedId: [
        234
      ],
      __typename: [
        1
      ]
    },
    UserFileNameTemplate: {
      id: [
        9
      ],
      userId: [
        1
      ],
      itemType: [
        1
      ],
      template: [
        1
      ],
      updatedAt: [
        233
      ],
      __typename: [
        1
      ]
    },
    UserMessage: {
      id: [
        9
      ],
      contributionId: [
        9
      ],
      boxsetId: [
        9
      ],
      contribution: [
        99
      ],
      boxset: [
        101
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
        10
      ],
      createdAt: [
        233
      ],
      type: [
        232
      ],
      __typename: [
        1
      ]
    },
    AddAudioTrackToItemError: {
      on_ContributionNotFoundError: [
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_DiscItemNotFoundError: [
        47
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_DiscItemNotFoundError: [
        47
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AddDiscToBoxsetError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_ContributionAlreadyInBoxsetError: [
        27
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidBoxsetStatusError: [
        65
      ],
      on_MismatchedReleaseSlugError: [
        74
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AddExistingDiscToBoxsetError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidDiscPathError: [
        67
      ],
      on_ExistingDiscAlreadyInBoxsetError: [
        55
      ],
      on_InvalidBoxsetStatusError: [
        65
      ],
      on_MismatchedReleaseSlugError: [
        74
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
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AddSubtitleTrackToItemError: {
      on_ContributionNotFoundError: [
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_DiscItemNotFoundError: [
        47
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    AttachGlobalDiscIdError: {
      on_AuthenticationError: [
        21
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    CreateBoxsetError: {
      on_AuthenticationError: [
        21
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
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidBoxsetStatusError: [
        65
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidDiscPathError: [
        67
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DeleteBoxsetError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidBoxsetStatusError: [
        65
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidContributionStatusError: [
        66
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DeleteDiscFromContributionError: {
      on_ContributionNotFoundError: [
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidContributionStatusError: [
        66
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    DeleteFileNameTemplateError: {
      on_AuthenticationError: [
        21
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
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_DiscItemNotFoundError: [
        47
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        70
      ],
      on_ContributionNotFoundError: [
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_CouldNotParseLogsError: [
        36
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        50
      ],
      on_FieldRequiredError: [
        61
      ],
      on_InvalidIdError: [
        68
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
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_DiscItemNotFoundError: [
        47
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        33
      ],
      on_ExternalDataNotFoundError: [
        57
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        33
      ],
      on_ExternalDataNotFoundError: [
        57
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
        33
      ],
      on_ExternalDataSerializationError: [
        59
      ],
      on_ExternalDataNotFoundError: [
        57
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    MarkBoxsetMessagesAsReadError: {
      on_AuthenticationError: [
        21
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
        21
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    RemoveBoxsetMemberError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidBoxsetStatusError: [
        65
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    RemoveDiscFromBoxsetError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidBoxsetStatusError: [
        65
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    ReorderBoxsetMembersError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidBoxsetStatusError: [
        65
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        12
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    SendAdminBoxsetMessageError: {
      on_BoxsetNotFoundError: [
        26
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    SendBoxsetUserMessageError: {
      on_BoxsetNotFoundError: [
        26
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    SetFileNameTemplateError: {
      on_AuthenticationError: [
        21
      ],
      on_Error: [
        0
      ],
      __typename: [
        1
      ]
    },
    UpdateBoxsetError: {
      on_AuthenticationError: [
        21
      ],
      on_BoxsetNotFoundError: [
        26
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        33
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
      ],
      on_InvalidContributionStatusError: [
        66
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
        33
      ],
      on_DiscNotFoundError: [
        50
      ],
      on_AuthenticationError: [
        21
      ],
      on_InvalidIdError: [
        68
      ],
      on_InvalidOwnershipError: [
        69
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
        9
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
        9
      ],
      chapterName: [
        1
      ],
      __typename: [
        1
      ]
    },
    AddDiscToBoxsetInput: {
      boxsetId: [
        1
      ],
      discId: [
        1
      ],
      __typename: [
        1
      ]
    },
    AddExistingDiscToBoxsetInput: {
      boxsetId: [
        1
      ],
      existingDiscPath: [
        1
      ],
      discName: [
        1
      ],
      discFormat: [
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
        9
      ],
      segmentCount: [
        9
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
    AddSubtitleTrackToItemInput: {
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
        9
      ],
      trackName: [
        1
      ],
      __typename: [
        1
      ]
    },
    ApiKeyInfoFilterInput: {
      and: [
        153
      ],
      or: [
        153
      ],
      name: [
        203
      ],
      keyPrefix: [
        203
      ],
      isActive: [
        158
      ],
      logUsage: [
        158
      ],
      roles: [
        203
      ],
      ownerEmail: [
        203
      ],
      createdAt: [
        165
      ],
      expiresAt: [
        165
      ],
      lastUsedAt: [
        165
      ],
      __typename: [
        1
      ]
    },
    ApiKeyInfoSortInput: {
      name: [
        230
      ],
      keyPrefix: [
        230
      ],
      isActive: [
        230
      ],
      logUsage: [
        230
      ],
      roles: [
        230
      ],
      ownerEmail: [
        230
      ],
      createdAt: [
        230
      ],
      expiresAt: [
        230
      ],
      lastUsedAt: [
        230
      ],
      __typename: [
        1
      ]
    },
    ApiKeyUsageLogInfoFilterInput: {
      and: [
        155
      ],
      or: [
        155
      ],
      apiKeyPrefix: [
        203
      ],
      apiKeyName: [
        203
      ],
      timestamp: [
        165
      ],
      operationName: [
        203
      ],
      fieldCost: [
        179
      ],
      typeCost: [
        179
      ],
      durationMs: [
        182
      ],
      __typename: [
        1
      ]
    },
    ApiKeyUsageLogInfoSortInput: {
      apiKeyPrefix: [
        230
      ],
      apiKeyName: [
        230
      ],
      timestamp: [
        230
      ],
      operationName: [
        230
      ],
      fieldCost: [
        230
      ],
      typeCost: [
        230
      ],
      durationMs: [
        230
      ],
      __typename: [
        1
      ]
    },
    AttachGlobalDiscIdInput: {
      files: [
        178
      ],
      globalDiscId: [
        1
      ],
      mediaItemSlug: [
        1
      ],
      boxsetSlug: [
        1
      ],
      releaseSlug: [
        1
      ],
      discSlug: [
        1
      ],
      discIndex: [
        9
      ],
      __typename: [
        1
      ]
    },
    BooleanOperationFilterInput: {
      eq: [
        10
      ],
      neq: [
        10
      ],
      __typename: [
        1
      ]
    },
    BoxsetMutationRequestInput: {
      title: [
        1
      ],
      sortTitle: [
        1
      ],
      slug: [
        1
      ],
      frontImageUrl: [
        1
      ],
      backImageUrl: [
        1
      ],
      asin: [
        1
      ],
      upc: [
        1
      ],
      releaseDate: [
        233
      ],
      locale: [
        1
      ],
      regionCode: [
        1
      ],
      __typename: [
        1
      ]
    },
    ContributionHistorySortInput: {
      id: [
        230
      ],
      contributionId: [
        230
      ],
      timeStamp: [
        230
      ],
      description: [
        230
      ],
      userId: [
        230
      ],
      type: [
        230
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
        233
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
        238
      ],
      status: [
        231
      ],
      boxsetId: [
        1
      ],
      __typename: [
        1
      ]
    },
    CreateBoxsetInput: {
      input: [
        159
      ],
      __typename: [
        1
      ]
    },
    CreateContributionInput: {
      input: [
        161
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
      globalDiscId: [
        1
      ],
      __typename: [
        1
      ]
    },
    DateTimeOperationFilterInput: {
      eq: [
        233
      ],
      neq: [
        233
      ],
      in: [
        233
      ],
      nin: [
        233
      ],
      gt: [
        233
      ],
      ngt: [
        233
      ],
      gte: [
        233
      ],
      ngte: [
        233
      ],
      lt: [
        233
      ],
      nlt: [
        233
      ],
      lte: [
        233
      ],
      nlte: [
        233
      ],
      __typename: [
        1
      ]
    },
    DeleteBoxsetInput: {
      boxsetId: [
        1
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
    DeleteDiscFromContributionInput: {
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
    DeleteFileNameTemplateInput: {
      itemType: [
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
        9
      ],
      segmentCount: [
        9
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
        174
      ],
      or: [
        174
      ],
      eq: [
        235
      ],
      neq: [
        235
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
        9
      ],
      name: [
        1
      ],
      creationTime: [
        233
      ],
      size: [
        236
      ],
      __typename: [
        1
      ]
    },
    FloatOperationFilterInput: {
      eq: [
        14
      ],
      neq: [
        14
      ],
      in: [
        14
      ],
      nin: [
        14
      ],
      gt: [
        14
      ],
      ngt: [
        14
      ],
      gte: [
        14
      ],
      ngte: [
        14
      ],
      lt: [
        14
      ],
      nlt: [
        14
      ],
      lte: [
        14
      ],
      nlte: [
        14
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
        233
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
        178
      ],
      __typename: [
        1
      ]
    },
    IntOperationFilterInput: {
      eq: [
        9
      ],
      neq: [
        9
      ],
      in: [
        9
      ],
      nin: [
        9
      ],
      gt: [
        9
      ],
      ngt: [
        9
      ],
      gte: [
        9
      ],
      ngte: [
        9
      ],
      lt: [
        9
      ],
      nlt: [
        9
      ],
      lte: [
        9
      ],
      nlte: [
        9
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput: {
      all: [
        207
      ],
      none: [
        207
      ],
      some: [
        207
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionChapterFilterInput: {
      all: [
        213
      ],
      none: [
        213
      ],
      some: [
        213
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionDiscFilterInput: {
      all: [
        215
      ],
      none: [
        215
      ],
      some: [
        215
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput: {
      all: [
        216
      ],
      none: [
        216
      ],
      some: [
        216
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput: {
      all: [
        218
      ],
      none: [
        218
      ],
      some: [
        218
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    ListEncodedIdFilterTypeOfUserContributionSubtitleTrackFilterInput: {
      all: [
        224
      ],
      none: [
        224
      ],
      some: [
        224
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    ListFilterInputTypeOfUserContributionBoxsetMemberFilterInput: {
      all: [
        210
      ],
      none: [
        210
      ],
      some: [
        210
      ],
      any: [
        10
      ],
      __typename: [
        1
      ]
    },
    LongOperationFilterInput: {
      eq: [
        236
      ],
      neq: [
        236
      ],
      in: [
        236
      ],
      nin: [
        236
      ],
      gt: [
        236
      ],
      ngt: [
        236
      ],
      gte: [
        236
      ],
      ngte: [
        236
      ],
      lt: [
        236
      ],
      nlt: [
        236
      ],
      lte: [
        236
      ],
      nlte: [
        236
      ],
      __typename: [
        1
      ]
    },
    MarkBoxsetMessagesAsReadInput: {
      boxsetId: [
        1
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
    RemoveBoxsetMemberInput: {
      boxsetId: [
        1
      ],
      memberId: [
        9
      ],
      __typename: [
        1
      ]
    },
    RemoveDiscFromBoxsetInput: {
      boxsetId: [
        1
      ],
      discId: [
        1
      ],
      __typename: [
        1
      ]
    },
    ReorderBoxsetMembersInput: {
      boxsetId: [
        1
      ],
      memberIds: [
        9
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
    SendAdminBoxsetMessageInput: {
      boxsetId: [
        1
      ],
      message: [
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
    SendBoxsetUserMessageInput: {
      boxsetId: [
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
    SetFileNameTemplateInput: {
      itemType: [
        1
      ],
      template: [
        1
      ],
      __typename: [
        1
      ]
    },
    StringOperationFilterInput: {
      and: [
        203
      ],
      or: [
        203
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
    UpdateBoxsetInput: {
      boxsetId: [
        1
      ],
      input: [
        159
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
        233
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
        10
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
        207
      ],
      or: [
        207
      ],
      encodedId: [
        174
      ],
      index: [
        182
      ],
      title: [
        203
      ],
      item: [
        218
      ],
      __typename: [
        1
      ]
    },
    UserContributionAudioTrackSortInput: {
      id: [
        230
      ],
      index: [
        230
      ],
      title: [
        230
      ],
      item: [
        219
      ],
      __typename: [
        1
      ]
    },
    UserContributionBoxsetFilterInput: {
      and: [
        209
      ],
      or: [
        209
      ],
      encodedId: [
        174
      ],
      userId: [
        203
      ],
      created: [
        165
      ],
      status: [
        223
      ],
      title: [
        203
      ],
      sortTitle: [
        203
      ],
      slug: [
        203
      ],
      frontImageUrl: [
        203
      ],
      backImageUrl: [
        203
      ],
      asin: [
        203
      ],
      upc: [
        203
      ],
      releaseDate: [
        165
      ],
      locale: [
        203
      ],
      regionCode: [
        203
      ],
      members: [
        189
      ],
      __typename: [
        1
      ]
    },
    UserContributionBoxsetMemberFilterInput: {
      and: [
        210
      ],
      or: [
        210
      ],
      id: [
        182
      ],
      boxset: [
        209
      ],
      disc: [
        215
      ],
      sortOrder: [
        182
      ],
      existingDiscPath: [
        203
      ],
      existingDiscName: [
        203
      ],
      existingDiscFormat: [
        203
      ],
      __typename: [
        1
      ]
    },
    UserContributionBoxsetMemberSortInput: {
      id: [
        230
      ],
      boxset: [
        212
      ],
      disc: [
        220
      ],
      sortOrder: [
        230
      ],
      existingDiscPath: [
        230
      ],
      existingDiscName: [
        230
      ],
      existingDiscFormat: [
        230
      ],
      __typename: [
        1
      ]
    },
    UserContributionBoxsetSortInput: {
      id: [
        230
      ],
      userId: [
        230
      ],
      created: [
        230
      ],
      status: [
        230
      ],
      title: [
        230
      ],
      sortTitle: [
        230
      ],
      slug: [
        230
      ],
      frontImageUrl: [
        230
      ],
      backImageUrl: [
        230
      ],
      asin: [
        230
      ],
      upc: [
        230
      ],
      releaseDate: [
        230
      ],
      locale: [
        230
      ],
      regionCode: [
        230
      ],
      __typename: [
        1
      ]
    },
    UserContributionChapterFilterInput: {
      and: [
        213
      ],
      or: [
        213
      ],
      encodedId: [
        174
      ],
      index: [
        182
      ],
      title: [
        203
      ],
      item: [
        218
      ],
      __typename: [
        1
      ]
    },
    UserContributionChapterSortInput: {
      id: [
        230
      ],
      index: [
        230
      ],
      title: [
        230
      ],
      item: [
        219
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscFilterInput: {
      and: [
        215
      ],
      or: [
        215
      ],
      encodedId: [
        174
      ],
      userContribution: [
        221
      ],
      contentHash: [
        203
      ],
      globalDiscId: [
        203
      ],
      format: [
        203
      ],
      name: [
        203
      ],
      slug: [
        203
      ],
      logsUploaded: [
        158
      ],
      logUploadError: [
        203
      ],
      index: [
        182
      ],
      existingDiscPath: [
        203
      ],
      items: [
        187
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscHashItemFilterInput: {
      and: [
        216
      ],
      or: [
        216
      ],
      encodedId: [
        174
      ],
      userContribution: [
        221
      ],
      discHash: [
        203
      ],
      index: [
        182
      ],
      name: [
        203
      ],
      creationTime: [
        165
      ],
      size: [
        190
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscHashItemSortInput: {
      id: [
        230
      ],
      userContribution: [
        222
      ],
      discHash: [
        230
      ],
      index: [
        230
      ],
      name: [
        230
      ],
      creationTime: [
        230
      ],
      size: [
        230
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscItemFilterInput: {
      and: [
        218
      ],
      or: [
        218
      ],
      encodedId: [
        174
      ],
      disc: [
        215
      ],
      name: [
        203
      ],
      source: [
        203
      ],
      duration: [
        203
      ],
      size: [
        203
      ],
      chapterCount: [
        182
      ],
      segmentCount: [
        182
      ],
      segmentMap: [
        203
      ],
      type: [
        203
      ],
      description: [
        203
      ],
      season: [
        203
      ],
      episode: [
        203
      ],
      chapters: [
        184
      ],
      audioTracks: [
        183
      ],
      subtitleTracks: [
        188
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscItemSortInput: {
      id: [
        230
      ],
      disc: [
        220
      ],
      name: [
        230
      ],
      source: [
        230
      ],
      duration: [
        230
      ],
      size: [
        230
      ],
      chapterCount: [
        230
      ],
      segmentCount: [
        230
      ],
      segmentMap: [
        230
      ],
      type: [
        230
      ],
      description: [
        230
      ],
      season: [
        230
      ],
      episode: [
        230
      ],
      __typename: [
        1
      ]
    },
    UserContributionDiscSortInput: {
      id: [
        230
      ],
      userContribution: [
        222
      ],
      contentHash: [
        230
      ],
      globalDiscId: [
        230
      ],
      format: [
        230
      ],
      name: [
        230
      ],
      slug: [
        230
      ],
      logsUploaded: [
        230
      ],
      logUploadError: [
        230
      ],
      index: [
        230
      ],
      existingDiscPath: [
        230
      ],
      __typename: [
        1
      ]
    },
    UserContributionFilterInput: {
      and: [
        221
      ],
      or: [
        221
      ],
      encodedId: [
        174
      ],
      userId: [
        203
      ],
      created: [
        165
      ],
      status: [
        223
      ],
      boxsetId: [
        182
      ],
      boxset: [
        209
      ],
      discs: [
        185
      ],
      hashItems: [
        186
      ],
      mediaType: [
        203
      ],
      externalId: [
        203
      ],
      externalProvider: [
        203
      ],
      releaseDate: [
        165
      ],
      asin: [
        203
      ],
      upc: [
        203
      ],
      frontImageUrl: [
        203
      ],
      backImageUrl: [
        203
      ],
      releaseTitle: [
        203
      ],
      releaseSlug: [
        203
      ],
      locale: [
        203
      ],
      regionCode: [
        203
      ],
      title: [
        203
      ],
      year: [
        203
      ],
      titleSlug: [
        203
      ],
      __typename: [
        1
      ]
    },
    UserContributionSortInput: {
      id: [
        230
      ],
      userId: [
        230
      ],
      created: [
        230
      ],
      status: [
        230
      ],
      boxsetId: [
        230
      ],
      boxset: [
        212
      ],
      mediaType: [
        230
      ],
      externalId: [
        230
      ],
      externalProvider: [
        230
      ],
      releaseDate: [
        230
      ],
      asin: [
        230
      ],
      upc: [
        230
      ],
      frontImageUrl: [
        230
      ],
      backImageUrl: [
        230
      ],
      releaseTitle: [
        230
      ],
      releaseSlug: [
        230
      ],
      locale: [
        230
      ],
      regionCode: [
        230
      ],
      title: [
        230
      ],
      year: [
        230
      ],
      titleSlug: [
        230
      ],
      __typename: [
        1
      ]
    },
    UserContributionStatusOperationFilterInput: {
      eq: [
        231
      ],
      neq: [
        231
      ],
      in: [
        231
      ],
      nin: [
        231
      ],
      __typename: [
        1
      ]
    },
    UserContributionSubtitleTrackFilterInput: {
      and: [
        224
      ],
      or: [
        224
      ],
      encodedId: [
        174
      ],
      index: [
        182
      ],
      title: [
        203
      ],
      item: [
        218
      ],
      __typename: [
        1
      ]
    },
    UserContributionSubtitleTrackSortInput: {
      id: [
        230
      ],
      index: [
        230
      ],
      title: [
        230
      ],
      item: [
        219
      ],
      __typename: [
        1
      ]
    },
    UserMessageSortInput: {
      id: [
        230
      ],
      contributionId: [
        230
      ],
      boxsetId: [
        230
      ],
      contribution: [
        222
      ],
      boxset: [
        212
      ],
      fromUserId: [
        230
      ],
      toUserId: [
        230
      ],
      message: [
        230
      ],
      isRead: [
        230
      ],
      createdAt: [
        230
      ],
      type: [
        230
      ],
      __typename: [
        1
      ]
    },
    ApplyPolicy: {},
    AttachDiscIdOutcome: {},
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
        34,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          where: [
            221
          ],
          order: [
            222,
            "[UserContributionSortInput!]"
          ]
        }
      ],
      myContributions: [
        77,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          where: [
            221
          ],
          order: [
            222,
            "[UserContributionSortInput!]"
          ]
        }
      ],
      contributionHistory: [
        31,
        {
          contributionId: [
            9,
            "Int!"
          ],
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          order: [
            160,
            "[ContributionHistorySortInput!]"
          ]
        }
      ],
      contributionChat: [
        28,
        {
          contributionId: [
            1,
            "String!"
          ],
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          order: [
            226,
            "[UserMessageSortInput!]"
          ]
        }
      ],
      boxsetChat: [
        22,
        {
          boxsetId: [
            1,
            "String!"
          ],
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          order: [
            226,
            "[UserMessageSortInput!]"
          ]
        }
      ],
      hasUnreadMessages: [
        10
      ],
      myMessages: [
        79,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          order: [
            226,
            "[UserMessageSortInput!]"
          ]
        }
      ],
      messageThreads: [
        73
      ],
      boxsetContributions: [
        24,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          where: [
            209
          ],
          order: [
            212,
            "[UserContributionBoxsetSortInput!]"
          ]
        }
      ],
      myBoxsets: [
        75,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          where: [
            209
          ],
          order: [
            212,
            "[UserContributionBoxsetSortInput!]"
          ]
        }
      ],
      amazonProductMetadata: [
        8,
        {
          asin: [
            1,
            "String!"
          ]
        }
      ],
      apiKeys: [
        17,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          where: [
            153
          ],
          order: [
            154,
            "[ApiKeyInfoSortInput!]"
          ]
        }
      ],
      apiKeyUsageLogs: [
        15,
        {
          first: [
            9
          ],
          after: [
            1
          ],
          last: [
            9
          ],
          before: [
            1
          ],
          where: [
            155
          ],
          order: [
            156,
            "[ApiKeyUsageLogInfoSortInput!]"
          ]
        }
      ],
      myFileNameTemplates: [
        108
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
            147,
            "AddAudioTrackToItemInput!"
          ]
        }
      ],
      addChapterToItem: [
        3,
        {
          input: [
            148,
            "AddChapterToItemInput!"
          ]
        }
      ],
      addDiscToBoxset: [
        4,
        {
          input: [
            149,
            "AddDiscToBoxsetInput!"
          ]
        }
      ],
      addExistingDiscToBoxset: [
        5,
        {
          input: [
            150,
            "AddExistingDiscToBoxsetInput!"
          ]
        }
      ],
      addItemToDisc: [
        6,
        {
          input: [
            151,
            "AddItemToDiscInput!"
          ]
        }
      ],
      addSubtitleTrackToItem: [
        7,
        {
          input: [
            152,
            "AddSubtitleTrackToItemInput!"
          ]
        }
      ],
      attachGlobalDiscId: [
        20,
        {
          input: [
            157,
            "AttachGlobalDiscIdInput!"
          ]
        }
      ],
      createBoxset: [
        37,
        {
          input: [
            162,
            "CreateBoxsetInput!"
          ]
        }
      ],
      createContribution: [
        38,
        {
          input: [
            163,
            "CreateContributionInput!"
          ]
        }
      ],
      createDisc: [
        39,
        {
          input: [
            164,
            "CreateDiscInput!"
          ]
        }
      ],
      deleteBoxset: [
        40,
        {
          input: [
            166,
            "DeleteBoxsetInput!"
          ]
        }
      ],
      deleteContribution: [
        41,
        {
          input: [
            167,
            "DeleteContributionInput!"
          ]
        }
      ],
      deleteDiscFromContribution: [
        42,
        {
          input: [
            168,
            "DeleteDiscFromContributionInput!"
          ]
        }
      ],
      deleteItemFromDisc: [
        44,
        {
          input: [
            170,
            "DeleteItemFromDiscInput!"
          ]
        }
      ],
      editItemOnDisc: [
        53,
        {
          input: [
            173,
            "EditItemOnDiscInput!"
          ]
        }
      ],
      setFileNameTemplate: [
        94,
        {
          input: [
            202,
            "SetFileNameTemplateInput!"
          ]
        }
      ],
      deleteFileNameTemplate: [
        43,
        {
          input: [
            169,
            "DeleteFileNameTemplateInput!"
          ]
        }
      ],
      generateApiKey: [
        62,
        {
          input: [
            180,
            "GenerateApiKeyInput!"
          ]
        }
      ],
      discLogs: [
        49,
        {
          input: [
            171,
            "DiscLogsInput!"
          ]
        }
      ],
      discUploadStatus: [
        52,
        {
          input: [
            172,
            "DiscUploadStatusInput!"
          ]
        }
      ],
      episodeNames: [
        54,
        {
          input: [
            175,
            "EpisodeNamesInput!"
          ]
        }
      ],
      externalData: [
        58,
        {
          input: [
            177,
            "ExternalDataInput!"
          ]
        }
      ],
      externalDataForContribution: [
        56,
        {
          input: [
            176,
            "ExternalDataForContributionInput!"
          ]
        }
      ],
      hashDisc: [
        63,
        {
          input: [
            181,
            "HashDiscInput!"
          ]
        }
      ],
      markMessagesAsRead: [
        72,
        {
          input: [
            192,
            "MarkMessagesAsReadInput!"
          ]
        }
      ],
      markBoxsetMessagesAsRead: [
        71,
        {
          input: [
            191,
            "MarkBoxsetMessagesAsReadInput!"
          ]
        }
      ],
      removeBoxsetMember: [
        82,
        {
          input: [
            193,
            "RemoveBoxsetMemberInput!"
          ]
        }
      ],
      removeDiscFromBoxset: [
        83,
        {
          input: [
            194,
            "RemoveDiscFromBoxsetInput!"
          ]
        }
      ],
      reorderBoxsetMembers: [
        84,
        {
          input: [
            195,
            "ReorderBoxsetMembersInput!"
          ]
        }
      ],
      reorderDiscs: [
        85,
        {
          input: [
            196,
            "ReorderDiscsInput!"
          ]
        }
      ],
      revokeApiKey: [
        86,
        {
          input: [
            197,
            "RevokeApiKeyInput!"
          ]
        }
      ],
      sendAdminMessage: [
        89,
        {
          input: [
            199,
            "SendAdminMessageInput!"
          ]
        }
      ],
      sendUserMessage: [
        91,
        {
          input: [
            201,
            "SendUserMessageInput!"
          ]
        }
      ],
      sendAdminBoxsetMessage: [
        88,
        {
          input: [
            198,
            "SendAdminBoxsetMessageInput!"
          ]
        }
      ],
      sendBoxsetUserMessage: [
        90,
        {
          input: [
            200,
            "SendBoxsetUserMessageInput!"
          ]
        }
      ],
      updateBoxset: [
        96,
        {
          input: [
            204,
            "UpdateBoxsetInput!"
          ]
        }
      ],
      updateContribution: [
        97,
        {
          input: [
            205,
            "UpdateContributionInput!"
          ]
        }
      ],
      updateDisc: [
        98,
        {
          input: [
            206,
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
  async attachGlobalDiscId(input) {
    const data = await this.gql.mutation({
      __name: "AttachGlobalDiscId",
      attachGlobalDiscId: {
        __args: {
          input: {
            mediaItemSlug: null,
            boxsetSlug: null,
            releaseSlug: null,
            discSlug: null,
            discIndex: null,
            ...input,
            files: input.files.map((file, i) => file instanceof File ? {
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
        attachDiscIdResult: {
          outcome: true,
          contentHash: true,
          mediaItemSlug: true,
          boxsetSlug: true,
          mediaItemType: true,
          releaseSlug: true,
          discSlug: true,
          discIndex: true,
          globalDiscId: true,
          existingGlobalDiscId: true,
          matchedDifferentDisc: true
        },
        errors: { on_Error: { message: true } }
      }
    });
    if (!mutationHasData(data.attachGlobalDiscId, "attachDiscIdResult")) {
      throw Error("Server did not return a result");
    }
    return data.attachGlobalDiscId.attachDiscIdResult;
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
  isExtra,
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
