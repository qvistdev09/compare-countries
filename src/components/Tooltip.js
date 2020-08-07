import React from 'react';

function Tooltip(props) {
  return (
    <div className="tooltip">
      <i className="fas fa-info-circle tooltip-icon"></i>
      <div className="tooltip-hover">
        <div className="tooltip-pointer"></div>
        <p className="tooltip-text">{props.tooltipText}</p>
      </div>
    </div>
  );
}

export default Tooltip;
