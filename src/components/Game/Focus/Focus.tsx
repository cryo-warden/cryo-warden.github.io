import "./Focus.css";
import { useUIState } from "../UIState/UIState";
import Button from "components/UI/Button";

// WIP Add action buttons.
const Focus = () => {
  const { entityViews, focusEntityId, executeAction } = useUIState();
  if (focusEntityId == null) {
    return null;
  }

  const focusedEntityView = entityViews[focusEntityId];
  if (focusedEntityView == null) {
    return null;
  }

  return (
    <div className="Focus">
      <div className="name">{focusedEntityView.name}</div>
      <div className="description">{focusedEntityView.description}</div>
      <div>
        {focusedEntityView.interactions.map((interaction) => (
          <Button
            key={interaction.label}
            onClick={() => executeAction(interaction.action)}
          >
            {interaction.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Focus;
