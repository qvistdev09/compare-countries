export default function ViewModeSwitch({ onClick, currentMode }: Props) {
  return (
    <div
      onClick={onClick}
      className="screen-small-m-right view-switch flex-row justify-between align-stretch"
    >
      <div className="switch-icon-wrapper switch-icon-wrapper-active">
        <i
          className={`far fa-list-alt switch-icon${
            currentMode === "LIST" ? " switch-icon-active" : ""
          }`}
        />
      </div>
      <div className="switch-icon-wrapper">
        <i
          className={`fas fa-chart-bar switch-icon${
            currentMode === "GRAPH" ? " switch-icon-active" : ""
          }`}
        />
      </div>
    </div>
  );
}

interface Props {
  currentMode: "LIST" | "GRAPH";
  onClick: () => void;
}
