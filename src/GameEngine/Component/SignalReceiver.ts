import { Signal } from "GameEngine/Signal";
import { Circle } from "general/Geometry/Circle";

export type SignalReceiver<TSignal extends Signal> = {
  circle: Circle;
  signals: TSignal[];
};
