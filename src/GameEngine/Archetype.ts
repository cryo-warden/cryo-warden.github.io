import { Component } from "./Component";

export interface Archetype {
  [key: string]: Component;
}

export type ComponentNames<TArchetype extends Archetype> = readonly Extract<
  keyof TArchetype,
  string
>[];

export const satisfiesArchetype = <
  TArchetype extends Archetype,
  TComponentNames extends ComponentNames<TArchetype>,
>(
  components: Partial<Archetype>,
  componentNames: TComponentNames
): components is TArchetype => {
  for (let i = 0; i < componentNames.length; ++i) {
    if (components[componentNames[i]] == null) {
      return false;
    }
  }
  return true;
};
