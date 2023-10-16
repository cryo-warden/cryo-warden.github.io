import { useGameEngine } from "../GameEngineContext";
import { useEffect, useState } from "react";

const Log = () => {
  const engine = useGameEngine();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const subscription = engine.subscribe("logMessage", (event) => {
      setMessages((messages) => [...messages, JSON.stringify(event.message)]);
    });

    return subscription.cancel;
  }, [engine, setMessages]);

  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
};

export default Log;
