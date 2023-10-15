export type JsonSerializable =
  | null
  | boolean
  | number
  | string
  | JsonSerializable[]
  | {
      [key: string]: JsonSerializable;
    };

export const deepClone = <T extends Partial<JsonSerializable>>(value: T) =>
  JSON.parse(JSON.stringify(value)) as T;
