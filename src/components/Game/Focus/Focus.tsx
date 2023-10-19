import "./Focus.css";
import { useUIState } from "../UIState/UIState";

// WIP Add action buttons.
const Focus = () => {
  const { entityViews, focusEntityId } = useUIState();
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
      <div>(Buttons for interactions go here.)</div>
    </div>
  );
};

export default Focus;
