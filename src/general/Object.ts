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

/** The `Fluent` type exists as a constraint to guard implementations of fluent classes against simple mistakes.
 * It requires (almost) every method to return an instance of the implementing class, `TFluent`.
 * There are three exceptions:
 * 1. The finalizing `value` method must return an instance of T.
 * 2. The `clone` method must return a new instance of TFluent that shares the values of the instance, but none of its mutable internal state.
 * 3. Methods explicitly named in the `TExceptionalMethods` generic argument must return the type specified therein.
 *      *  `TExceptionalMethods` **cannot** override `value`.
 */
export type Fluent<
  T,
  TFluent extends Fluent<T, TFluent, TExceptionalMethods> & {
    value: () => T;
    clone: () => TFluent;
  } & {
    [key in keyof TExceptionalMethods]: (
      ...args: any[]
    ) => TExceptionalMethods[key];
  },
  TExceptionalMethods extends {} = {},
> = TExceptionalMethods extends { value: any }
  ? never
  : {
      [key in keyof TFluent]: key extends "value"
        ? () => T
        : key extends keyof TExceptionalMethods
        ? (...args: any[]) => TExceptionalMethods[key]
        : TFluent[key] extends Function
        ? (...args: any[]) => TFluent
        : unknown;
    };
