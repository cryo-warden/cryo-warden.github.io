import { Engine, createEngine } from "GameEngine/Engine";
import { DemoWorldContainer, createDemoWorldContainer } from "demo/DemoWorld";
import { createContext, useContext, useEffect, useState } from "react";

export const DemoWorldContainerContext =
  createContext<DemoWorldContainer | null>(null);

export class GameEngineContextError extends Error {}

export const useNewGameEngine = () => {
  const [demoWorldContainer, setDemoWorldContainer] =
    useState<DemoWorldContainer | null>(null);

  useEffect(() => {
    const newEngine = createEngine();

    // TODO Create UI to load a saved world.
    const newDemoWorldContainer = createDemoWorldContainer();
    newEngine.setWorld(newDemoWorldContainer.world);

    newEngine.start();

    setDemoWorldContainer(newDemoWorldContainer);

    return () => {
      newEngine.dispose();
      newDemoWorldContainer.dispose();
    };
  }, []);

  return demoWorldContainer;
};

export const useDemoWorldContainer = (): DemoWorldContainer => {
  const engine = useContext(DemoWorldContainerContext);
  if (engine == null) {
    throw new GameEngineContextError(
      "Attempted to use a `null` GameEngineContext value."
    );
  }

  return engine;
};
