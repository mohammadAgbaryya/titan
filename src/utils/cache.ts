const cache: { [key: string]: { data: any; expiry: number } } = {};
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

export function getFromCache(key: string) {
  const cached = cache[key];
  if (cached && cached.expiry > Date.now()) {
    console.log(`Cache hit for key: ${key}`);
    return cached.data;
  }
  console.log(`Cache miss for key: ${key}`);
  return null;
}

export function saveToCache(key: string, data: any) {
  cache[key] = {
    data,
    expiry: Date.now() + CACHE_EXPIRY,
  };
}
