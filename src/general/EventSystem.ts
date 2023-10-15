type Event = {
  type: unknown;
};

type Type<E extends Event> = E["type"];

type Listener<E extends Event, T extends Type<E>> = {
  (event: Extract<E, { type: T }>): void;
};

export type Subscription = {
  cancel(): void;
};

type TypeSubscriptionListenerMap<E extends Event> = {
  has<T extends Type<E>>(type: T): boolean;
  get<T extends Type<E>>(type: T): Map<Subscription, Listener<E, T>>;
  set<T extends Type<E>>(
    type: T,
    subscriptionListenerMap: Map<Subscription, Listener<E, T>>
  ): void;
  delete<T extends Type<E>>(type: T): void;
};

export type Subscribe<E extends Event> = {
  <T extends Type<E>>(type: T, listener: Listener<E, T>): Subscription;
};

export type Publish<E extends Event> = {
  <T extends Type<E>>(event: Extract<E, { type: T }>): void;
};

export type EventSystem<E extends Event> = {
  subscribe: Subscribe<E>;
  publish: Publish<E>;
};

const emptySubscription = {
  cancel: () => {},
};

export const createEventSystem = <E extends Event>(): EventSystem<E> => {
  const typeSubscriptionListenerMap =
    new Map() as TypeSubscriptionListenerMap<E>;

  return {
    subscribe: (type, listener) => {
      if (!typeSubscriptionListenerMap.has(type)) {
        typeSubscriptionListenerMap.set(type, new Map());
      }

      const subscriptionListenerMap = typeSubscriptionListenerMap.get(type);
      if (subscriptionListenerMap == null) {
        return emptySubscription;
      }

      const subscription = {
        cancel: () => {
          subscriptionListenerMap.delete(subscription);

          if (subscriptionListenerMap.size === 0) {
            typeSubscriptionListenerMap.delete(type);
          }
        },
      };

      subscriptionListenerMap.set(subscription, listener);

      return subscription;
    },
    publish: (event) => {
      const eventListeners = typeSubscriptionListenerMap.get(event.type);

      if (eventListeners == null) return;

      eventListeners.forEach((listener) => {
        listener(event);
      });
    },
  };
};
