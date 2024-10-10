const cache: { [key: string]: { data: any, expiry: number } } = {};
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

export function getFromCache(key: string) {
    const cached = cache[key];
    if (cached && cached.expiry > Date.now()) {
        return cached.data;
    }
    return null;
}

export function saveToCache(key: string, data: any) {
    cache[key] = {
        data,
        expiry: Date.now() + CACHE_EXPIRY,
    };
}
