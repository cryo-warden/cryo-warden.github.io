import { EntityId } from "GameEngine/Entity";

type MessageLink = { text: string; url: string };

export type Message = (string | EntityId | MessageLink)[]; // WIP Design format for message with both focus links and actions.

export type EntityView = {
  id: EntityId;
  name: string;
  description: string;
};

export type OutputEvent =
  | {
      type: "logMessage";
      message: Message;
    }
  | {
      type: "gainEntityView";
      entityView: EntityView;
    }
  | {
      type: "loseEntityView";
      entityId: EntityId;
    };
