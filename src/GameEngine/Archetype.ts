import { Component } from "./Component/Component";

export interface IArchetype {
  [key: string | number | symbol]: string extends typeof key
    ? Component
    : never;
}

export type ComponentNames<TArchetype extends IArchetype> =
  readonly (keyof TArchetype)[];

export const satisfiesArchetype = <TArchetype extends IArchetype>(
  components: IArchetype,
  componentNames: ComponentNames<TArchetype>
): components is TArchetype => {
  for (let i = 0; i < componentNames.length; ++i) {
    if (components[componentNames[i]] == null) {
      return false;
    }
  }
  return true;
};
