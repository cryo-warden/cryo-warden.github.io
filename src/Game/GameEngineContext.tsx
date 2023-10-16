import { Engine, createEngine } from "GameEngine/Engine";
import { createContext, useContext, useEffect, useState } from "react";

export const GameEngineContext = createContext<Engine | null>(null);

export class GameEngineContextError extends Error {}

export const useNewGameEngine = () => {
  const [engine, setEngine] = useState<Engine | null>(null);

  useEffect(() => {
    const newEngine = createEngine();

    newEngine.start();

    setEngine(newEngine);

    return () => {
      newEngine.dispose();
    };
  }, []);

  return engine;
};

export const useGameEngine = (): Engine => {
  const engine = useContext(GameEngineContext);
  if (engine == null) {
    throw new GameEngineContextError(
      "Attempted to use a `null` GameEngineContext value."
    );
  }

  return engine;
};
