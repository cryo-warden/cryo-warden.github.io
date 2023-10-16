export type Queue<T> = {
  length: T[]["length"];
  shift: T[]["shift"];
  push: T[]["push"];
};

export type Stack<T> = {
  length: T[]["length"];
  pop: T[]["pop"];
  push: T[]["push"];
};
