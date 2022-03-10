export interface Deserialize<T> {
  deserialize(input: Partial<T>): this;
}
