import { JsonSerializable } from "general/Object";

export type Component = JsonSerializable;

export type PathType = "library" | "descendant";

export type Path = [PathType, ...number[]];
