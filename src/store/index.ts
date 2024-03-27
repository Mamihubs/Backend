import cacheManager from 'cache-manager'

const cacheMemoryStore = async () => {
    return await cacheManager.caching("memory", {ttl: 10 * 1000, max: 100,  })
}

export default cacheMemoryStore