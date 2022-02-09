export interface EntityConstructor<T, K> {
  new (name: string, props?: T): K;
}
