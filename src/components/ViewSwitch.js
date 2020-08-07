import React from 'react';

function ViewSwitch(props) {
  return (
    <div
      className={
        props.classes + ' view-switch flex-row justify-between align-stretch'
      }
    >
      <div className="switch-icon-wrapper switch-icon-wrapper-active">
        <i className="far fa-list-alt switch-icon switch-icon-active"></i>
      </div>
      <div className="switch-icon-wrapper">
        <i className="fas fa-chart-bar switch-icon"></i>
      </div>
    </div>
  );
}

export default ViewSwitch;
