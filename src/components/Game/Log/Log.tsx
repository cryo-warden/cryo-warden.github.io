import "./Log.css";
import { useUIState } from "../UIState/UIState";

const Log = () => {
  const { messages } = useUIState();

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
