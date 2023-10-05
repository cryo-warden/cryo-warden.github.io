import { Engine, createEngine } from "GameEngine/Engine";
import { Context, createContext, useContext } from "react";

export const GameEngineContext: Context<Engine> = createContext(createEngine());

export const useGameEngine = () => useContext(GameEngineContext);
