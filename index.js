const NodeCache = require('node-cache');

/**
 * @description Classe para gerenciar o cache das requisições ao banco de dados.
 * Cache de memória
 * Referência: https://www.npmjs.com/package/node-cache
 */
module.exports = class UnityMemoryCache {
  currentCache;

  constructor(config = {}) {
    // ttl: time to leave
    this.currentCache = new NodeCache({
      stdTTL: 10, // The standard ttl as number in seconds for every generated cache element. 0 = unlimited
      checkperiod: 120, // The period in seconds, as a number, used for the automatic delete check interval. 0 = no periodic check.
      ...config,
    });
  }

  set(key, value) {
    return this.currentCache.set(key, value);
  }

  /**
   * [
   *   {key: "myKey", val: obj, ttl: 10000},
   *   {key: "myKey2", val: obj2},
   * ]
   */
  setMultiple(arr) {
    return this.currentCache.mset(arr);
  }

  get(key) {
    return this.currentCache.get(key);
  }

  /**
   * @description Usar se quiser forçar o update de valores
   */
  remove(key) {
    return this.currentCache.del(key);
  }

  removeMany(keys) {
    return this.currentCache.del(keys);
  }

  removeAll() {
    return this.currentCache.flushAll();
  }

  /**
   * @description Query with mongoose methods
   * @param {*} key
   * @param {*} model
   * @param {*} method
   * @param {*} conditions
   * @returns
   */
  async cacheGetOrQueryAndSet(key, model, method, conditions = {}) {
    const fromCache = this.get(key);
    if (fromCache) {
      return fromCache;
    }
    const response = await model[method](conditions).exec(); // only for mongo
    this.set(key, response);
    return response;
  }
};
