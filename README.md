## Description

Memory cache package.

## How to Use

```
  import * as UnityMemoryCache from 'unique-team-cache';

  const unityMemoryCache = new UnityMemoryCache();

  unityMemoryCache.cacheGetOrQueryAndSet(
    'MY_KEY',
    MONGOOSE_MODEL, // model reference
    'find',
    {}, // mongoose query conditions
  );
```
