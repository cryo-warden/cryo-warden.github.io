import "./Others.css";
import Button from "components/UI/Button";
import { useUIState, UIState } from "../UIState/UIState";

type EntityViewProps = {
  entityView: UIState["entityViews"][number];
};

const EntityView = ({ entityView }: EntityViewProps) => {
  const { setFocus } = useUIState();
  return (
    <div className="EntityView">
      <Button onClick={() => setFocus(entityView.id)}>{entityView.name}</Button>
    </div>
  );
};

const Others = () => {
  const { entityViews } = useUIState();
  return (
    <div className="Others">
      {Object.values(entityViews).map((entityView) => (
        <EntityView key={entityView.id} entityView={entityView} />
      ))}
    </div>
  );
};

export default Others;
