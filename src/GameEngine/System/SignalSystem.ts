import { SignalMedium } from "GameEngine/Component/SignalMedium";
import { Signal } from "GameEngine/Signal";
import { SpatialHash } from "GameEngine/SpatialHash";
import { System } from "GameEngine/System/System";

export abstract class SignalSystem<TSignal extends Signal> extends System {
  private spatialHashMap = new WeakMap<TSignal[], SpatialHash<TSignal>>();
  protected addSignal(medium: SignalMedium<TSignal>, signal: TSignal): void {
    if (!this.spatialHashMap.has(medium.signals)) {
      this.spatialHashMap.set(medium.signals, new SpatialHash<TSignal>(20));
    }

    const spatialHash = this.spatialHashMap.get(
      medium.signals
    ) as SpatialHash<TSignal>;

    medium.signals.push(signal);
    spatialHash.set(signal.circle, signal);
  }
}
