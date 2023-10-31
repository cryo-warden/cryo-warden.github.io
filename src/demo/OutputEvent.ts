import { EntityId } from "GameEngine/Entity";
import { Action } from "./InputEvent";

type MessageLink = { text: string; url: string };

export type Message = (string | EntityId | MessageLink)[]; // WIP Design format for message with both focus links and actions.

export type EntityInteraction = {
  label: string;
  action: Action;
};

export type EntityView = {
  id: EntityId;
  name: string;
  description: string;
  interactions: EntityInteraction[];
};

export type OutputEvent =
  | {
      type: "logMessage";
      message: Message;
    }
  | {
      type: "observeSelf";
      entityView: EntityView;
    }
  | {
      type: "observeEntity";
      entityView: EntityView;
    }
  | {
      type: "unobserveEntity";
      entityId: EntityId;
    };
