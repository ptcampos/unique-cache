## Description

Memory cache package.

## How to Use

```
  import * as UniqueMemoryCache from 'unique-team-cache';

  const uniqueMemoryCache = new UniqueMemoryCache();

  uniqueMemoryCache.cacheGetOrQueryAndSet(
    'MY_KEY',
    MONGOOSE_MODEL, // model reference
    'find',
    {}, // mongoose query conditions
  );
```
