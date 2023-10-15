export type JsonSerializable =
  | null
  | boolean
  | number
  | string
  | JsonSerializable[]
  | {
      [key: string | number | symbol]: string | number extends typeof key
        ? JsonSerializable
        : never;
    };

export const deepClone = <T extends Partial<JsonSerializable>>(value: T) =>
  JSON.parse(JSON.stringify(value)) as T;
