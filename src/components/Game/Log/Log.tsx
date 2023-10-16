import { useDemoWorldContainer } from "../GameEngineContext";
import { useEffect, useState } from "react";

const Log = () => {
  const { subscribe } = useDemoWorldContainer();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const subscription = subscribe("logMessage", (event) => {
      setMessages((messages) => [...messages, JSON.stringify(event.message)]);
    });

    return subscription.cancel;
  }, [subscribe, setMessages]);

  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
};

export default Log;