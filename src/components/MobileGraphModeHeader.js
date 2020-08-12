import React from 'react';
import './css/MobileGraphModeHeader.css';
import { makeSortButtons } from '../UtilityFunctions';

function MobileGraphModeHeader(props) {
  return (
    <div className="MobileGraphModeHeader-header">
      {props.gridSetup
        .filter((item) => item.graph)
        .map((object, index, array) => (
          <div
            key={'graph-header-' + object.value}
            className={
              'flex-row justify-start align-center' +
              (index === array.length - 1 ? '' : ' m-bottom-small')
            }
          >
            <div
              className="MobileGraphModeHeader-square m-right-small"
              style={{ backgroundColor: object.color }}
              onClick={() => props.toggle(object.value)}
            >
              {object.enabled && <i className="fas fa-check"></i>}
            </div>
            <p className="MobileGraphModeHeader-sort-label">{object.header}</p>
            <div className="flex-row align-center">
              {makeSortButtons(
                object.value,
                props.sortStatus,
                () => props.sortAction(object.value, true),
                () => props.sortAction(object.value, false)
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MobileGraphModeHeader;
