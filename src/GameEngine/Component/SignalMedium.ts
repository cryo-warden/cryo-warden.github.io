import { Signal } from "GameEngine/Signal";

export type SignalMedium<TSignal extends Signal> = {
  signals: TSignal[];
};
