export interface SimpleIterator<T> {
  next(): T;
  hasNext(): boolean;
}

const forEach = <T>(
  simpleIterator: SimpleIterator<T>,
  fn: (value: T) => void
) => {
  while (simpleIterator.hasNext()) {
    fn(simpleIterator.next());
  }
};

const toArray = <T>(simpleIterator: SimpleIterator<T>): T[] => {
  const result: T[] = [];
  while (simpleIterator.hasNext()) {
    result.push(simpleIterator.next());
  }
  return result;
};

const toSet = <T>(simpleIterator: SimpleIterator<T>): Set<T> => {
  const result: Set<T> = new Set();
  while (simpleIterator.hasNext()) {
    result.add(simpleIterator.next());
  }
  return result;
};

export const SimpleIterator = {
  forEach,
  toArray,
  toSet,
};
