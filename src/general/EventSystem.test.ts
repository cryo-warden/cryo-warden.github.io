import { createEventSystem } from "./EventSystem";

type TestEvent = {
  type: "increment"
} | {
  type: "decrement";
};

test('stateful test of subscribe, publish, and subscription cancellation', () => {
  const system = createEventSystem<TestEvent>();
  let i = 0;
  const increment = () => { i += 1; };
  const decrement = () => { i -= 1; };
  const otherIncrement = () => { i += 1; };
  const otherDecrement = () => { i -= 1; };

  system.subscribe("increment", increment);
  system.subscribe("decrement", decrement);

  system.publish({ type: "increment" });

  expect(i).toEqual(1);

  system.publish({ type: "decrement" });

  expect(i).toEqual(0);

  system.subscribe("increment", increment);
  system.subscribe("decrement", decrement);

  system.publish({ type: "increment" });

  expect(i).toEqual(2);

  system.publish({ type: "decrement" });

  expect(i).toEqual(0);

  const otherIncSub = system.subscribe("increment", otherIncrement);
  const otherDecSub = system.subscribe("decrement", otherDecrement);

  system.publish({ type: "increment" });

  expect(i).toEqual(3);

  system.publish({ type: "decrement" });

  expect(i).toEqual(0);

  otherIncSub.cancel();
  otherDecSub.cancel();

  system.publish({ type: "increment" });

  expect(i).toEqual(2);

  system.publish({ type: "decrement" });

  expect(i).toEqual(0);
});
