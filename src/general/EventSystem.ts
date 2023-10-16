export type Event = {
  type: unknown;
};

type Type<E extends Event> = E["type"];

export type Subscription = {
  cancel(): void;
};

type Listener<TEvent extends Event, T extends Type<TEvent>> = {
  (event: Extract<TEvent, { type: T }>): void;
};

export type Subscribe<TEvent extends Event> = {
  <T extends Type<TEvent>>(
    type: T,
    listener: Listener<TEvent, T>
  ): Subscription;
};

type ListenerAll<TEvent extends Event> = {
  (event: TEvent): void;
};

export type SubscribeAll<TEvent extends Event> = {
  (listener: ListenerAll<TEvent>): Subscription;
};

export type Publish<TEvent extends Event> = {
  <T extends Type<TEvent>>(event: Extract<TEvent, { type: T }>): void;
};

const emptySubscription = {
  cancel: () => {},
};

type TypeSubscriptionListenerMap<TEvent extends Event> = {
  has<T extends Type<TEvent>>(type: T): boolean;
  get<T extends Type<TEvent>>(type: T): Map<Subscription, Listener<TEvent, T>>;
  set<T extends Type<TEvent>>(
    type: T,
    subscriptionListenerMap: Map<Subscription, Listener<TEvent, T>>
  ): void;
  delete<T extends Type<TEvent>>(type: T): void;
};

export type EventSystem<TEvent extends Event> = {
  subscribe: Subscribe<TEvent>;
  subscribeAll: SubscribeAll<TEvent>;
  /** Queue an Event for publication on the next call to this EventSystem's flush method. */
  publish: Publish<TEvent>;
  /** Clear the queue of all Events, in the order of their original publication. */
  flush: () => void;
};

export const createEventSystem = <
  TEvent extends Event,
>(): EventSystem<TEvent> => {
  const subscriptionToAllEventTypesMap: Map<
    Subscription,
    ListenerAll<TEvent>
  > = new Map();
  const typeSubscriptionListenerMap: TypeSubscriptionListenerMap<TEvent> =
    new Map();

  const publicationQueue: (() => void)[] = [];

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
    subscribeAll: (listener) => {
      const subscription = {
        cancel: () => {
          subscriptionToAllEventTypesMap.delete(subscription);
        },
      };

      subscriptionToAllEventTypesMap.set(subscription, listener);

      return subscription;
    },
    publish: (event) => {
      publicationQueue.push(() => {
        subscriptionToAllEventTypesMap.forEach((listener) => listener(event));

        const eventListeners = typeSubscriptionListenerMap.get(event.type);

        if (eventListeners == null) return;

        eventListeners.forEach((listener) => listener(event));
      });
    },
    flush: () => {
      while (publicationQueue.length > 0) {
        publicationQueue.shift()?.();
      }
    },
  };
};
