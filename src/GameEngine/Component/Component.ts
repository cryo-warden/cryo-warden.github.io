import { JsonSerializable } from "general/Object";

export type Component = {
  [key: string]: JsonSerializable;
};

export type PathType = "library" | "descendant";

export type Path = [PathType, ...number[]];
