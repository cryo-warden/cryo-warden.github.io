export interface SimpleMap<K, V> {
  get: Map<K, V>["get"];
  set: (...args: Parameters<Map<K, V>["set"]>) => this;
  has: Map<K, V>["has"];
}
