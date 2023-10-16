import { Action } from "GameEngine/EventSystem";

export type Player = {
  action: Action;

  // Example
  // userId: UserId;
  // If adding multiplayer, this would be the place to define which user account is controlling the entity. Given this user ID, the PlayerSystem would route input and output to the appropriate client connection.
};
