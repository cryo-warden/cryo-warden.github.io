import { Component } from "./Component";

export interface IArchetype {
  [key: string | number | symbol]: string extends typeof key
    ? Component
    : never;
}

export type ComponentNames<TArchetype extends IArchetype> =
  readonly (keyof TArchetype)[];

export const satisfiesArchetype = <
  TArchetype extends IArchetype,
  TComponentNames extends ComponentNames<TArchetype>,
>(
  components: IArchetype,
  componentNames: TComponentNames
): components is TArchetype => {
  for (let i = 0; i < componentNames.length; ++i) {
    if (components[componentNames[i]] == null) {
      return false;
    }
  }
  return true;
};
