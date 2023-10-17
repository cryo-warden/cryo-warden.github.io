import { EntityId } from "GameEngine/Entity";

type MessageLink = { text: string; url: string };

export type Message = (string | EntityId | MessageLink)[]; // WIP Design format for message with both focus links and actions.

export type OutputEvent =
  | {
      type: "logMessage";
      message: Message;
    }
  | {
      type: "newRoom";
      contents: any; // WIP
    }
  | {
      type: "entityExit";
      entityID: number; // WIP
    }
  | {
      type: "entityEnter";
      entityID: number; // WIP
    };
