import { Message } from "../OutputEvent";

export type ConversationOption = {
  label: string;
  node: ConversationNode;
};

export type ConversationNode = {
  next: ConversationNode;
} & (
  | {
      type: "message";
      message: Message;
    }
  | {
      type: "option";
      options: ConversationOption[];
    }
);

export type Greeting = {
  messageIndex: number;
  messages: Message[];
  isInitialized: boolean;
  lastMessageTime: number;
  delayMS: number;
};
