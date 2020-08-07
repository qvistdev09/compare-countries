import React from 'react';
import Tooltip from './Tooltip';

class CheckboxMaker extends React.Component {
  render() {
    return (
      <div className={this.props.classes}>
        {this.props.gridSetup
          .filter((item) => item.type !== 'delete')
          .map((item) => (
            <div
              key={'checkbox-' + item.value}
              className="flex-row align-center m-right"
            >
              <i
                className={
                  (item.enabled ? 'far fa-check-square' : 'far fa-square') +
                  ' checkbox-icon'
                }
                onClick={() => this.props.toggle(item.value)}
              ></i>
              <p className="checkbox-label m-left-small">{item.header}</p>
              {item.tooltip && <Tooltip tooltipText={item.tooltip} />}
            </div>
          ))}
      </div>
    );
  }
}

export default CheckboxMaker;
