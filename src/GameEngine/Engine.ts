import { World } from "./World";

export type Engine = {
  readonly setWorld: (world: World) => void;
  readonly start: () => void;
  readonly stop: () => void;
  readonly dispose: () => void;
};

export const createEngine: () => Engine = () => {
  let isActive = false;
  let world: World | null = null;
  let lastTime = 0;
  const update = (time: number) => {
    if (!isActive || world == null) return;

    world.update(time - lastTime, { time });
    lastTime = time;

    requestAnimationFrame(update);
  };

  return {
    setWorld: (newWorld) => {
      world = newWorld;
    },
    start: () => {
      isActive = true;
      requestAnimationFrame((time) => {
        lastTime = time;
        requestAnimationFrame(update);
      });
    },
    stop: () => {
      isActive = false;
    },
    dispose: () => {
      isActive = false;
    },
  };
};
