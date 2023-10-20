import { createContext, useContext, useEffect, useState } from "react";
import { createEngine } from "GameEngine/Engine";
import { createDemoWorldContainer } from "demo/DemoWorld";
import { EntityView, Message } from "demo/OutputEvent";
import { Action } from "demo/InputEvent";
import { EntityId } from "GameEngine/Entity";

export type UIState = {
  messages: Message[];
  selfEntityView: EntityView | null;
  entityViews: Record<EntityId, EntityView>;
  focusEntityId: EntityId | null;
  setFocus: (entityId: EntityId) => void;
  executeAction: (action: Action) => void;
};

const emptyUIState: UIState = {
  messages: [],
  selfEntityView: null,
  entityViews: {},
  focusEntityId: null,
  setFocus: () => {},
  executeAction: () => {},
};

export const UIStateContext = createContext<UIState>(emptyUIState);

export const useNewUIState = (): UIState => {
  const [state, setState] = useState(emptyUIState);
  useEffect(() => {
    const engine = createEngine();

    // TODO Create UI to load a saved world.
    const demoWorldContainer = createDemoWorldContainer();
    engine.setWorld(demoWorldContainer.world);

    setState({
      ...emptyUIState,
      setFocus: (entityId) => {
        setState((state) => ({ ...state, focusEntityId: entityId }));
      },
      executeAction: demoWorldContainer.executeAction,
    });

    const logSubscription = demoWorldContainer.subscribe(
      "logMessage",
      (event) => {
        setState((state) => ({
          ...state,
          messages: [...state.messages, event.message],
        }));
      }
    );

    const setSelfSubscription = demoWorldContainer.subscribe(
      "observeSelf",
      (event) => {
        setState((state) => ({
          ...state,
          selfEntityView: event.entityView,
        }));
      }
    );

    const gainViewSubscription = demoWorldContainer.subscribe(
      "observeEntity",
      (event) => {
        setState((state) => ({
          ...state,
          entityViews: {
            ...state.entityViews,
            [event.entityView.id]: event.entityView,
          },
        }));
      }
    );

    const loseViewSubscription = demoWorldContainer.subscribe(
      "unobserveEntity",
      (event) => {
        setState((state) => {
          const { [event.entityId]: _, ...entityViews } = state.entityViews;
          return { ...state, entityViews };
        });
      }
    );

    engine.start();

    return () => {
      logSubscription.cancel();
      setSelfSubscription.cancel();
      gainViewSubscription.cancel();
      loseViewSubscription.cancel();
      engine.dispose();
      demoWorldContainer.dispose();
    };
  }, [setState]);

  return state;
};

export const useUIState = (): UIState => useContext(UIStateContext);
