import { useEffect, useState } from "react";
import { Message } from "demo/OutputEvent";
import { useDemoWorldContainer } from "../GameEngineContext";
import "./Log.css";

const Log = () => {
  const { subscribe } = useDemoWorldContainer();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const subscription = subscribe("logMessage", (event) => {
      setMessages((messages) => [...messages, event.message]);
    });

    return subscription.cancel;
  }, [subscribe, setMessages]);

  return (
    <div className="Log">
      {messages.map((message, i) => (
        <div key={i} className="message">
          {message.map((messageElement, i) => {
            if (typeof messageElement === "string") {
              return messageElement;
            }

            if (typeof messageElement == "object") {
              return (
                <a key={i} target="_blank" href={messageElement.url}>
                  {messageElement.text}
                </a>
              );
            }

            return null; // WIP Observe potential focus targets.
          })}
        </div>
      ))}
    </div>
  );
};

export default Log;
