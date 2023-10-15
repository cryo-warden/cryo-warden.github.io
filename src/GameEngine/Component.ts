import { JsonSerializable } from "general/Object";
import { Vector } from "general/Vector";

export type Component = {
  [key: string]: JsonSerializable;
};

export type TransformComponent = {
  position: Vector;
};

export type MoverComponent = {
  velocity: Vector;
};

export type PathType = "library" | "descendant";

export type Path = [PathType, ...number[]];
