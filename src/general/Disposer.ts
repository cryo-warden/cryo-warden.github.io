const disposedObjectSet = new WeakSet<{}>();

export const dispose = (object: {}): void => {
  disposedObjectSet.add(object);
};

export const isDisposed = (object: {}): boolean =>
  disposedObjectSet.has(object);
