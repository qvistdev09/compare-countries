import React from 'react';
import Tooltip from './Tooltip';

class CheckboxMaker extends React.Component {
  render() {
    return (
      <div className={this.props.classes}>
        {this.props.gridSetup
          .filter((item) => item.type !== 'delete')
          .map((item) => {
            const canShow = item.graph
              ? true
              : this.props.listView
              ? true
              : false;
            const opacityFix = canShow ? '' : ' low-opacity';

            return (
              <div
                key={'checkbox-' + item.value}
                className={'flex-row align-center m-right' + opacityFix}
              >
                <i
                  className={
                    (item.enabled ? 'far fa-check-square' : 'far fa-square') +
                    ' checkbox-icon'
                  }
                  {...(canShow && {
                    onClick: () => this.props.toggle(item.value),
                  })}
                ></i>
                <p className="checkbox-label m-left-small">{item.header}</p>
                {item.tooltip && <Tooltip tooltipText={item.tooltip} />}
              </div>
            );
          })}
      </div>
    );
  }
}

export default CheckboxMaker;
