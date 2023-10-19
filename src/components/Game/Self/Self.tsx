import { useUIState } from "../UIState/UIState";

const Self = () => {
  const { executeAction } = useUIState();

  const speak = () => {
    executeAction({
      type: "speak",
      message: ["Hello!"],
    });
  };

  return <div>Details and actions about the player character.</div>;
};

export default Self;
