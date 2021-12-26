const ViewSwitch = ({ toggleView, listView }) => {
  return (
    <div
      className="screen-small-m-right view-switch flex-row justify-between align-stretch"
      onClick={toggleView}
    >
      <div className="switch-icon-wrapper switch-icon-wrapper-active">
        <i
          className={
            "far fa-list-alt switch-icon" +
            (listView === true ? " switch-icon-active" : "")
          }
        ></i>
      </div>
      <div className="switch-icon-wrapper">
        <i
          className={
            "fas fa-chart-bar switch-icon" +
            (listView === false ? " switch-icon-active" : "")
          }
        ></i>
      </div>
    </div>
  );
};

export default ViewSwitch;
