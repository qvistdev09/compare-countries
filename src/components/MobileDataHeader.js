import React from 'react';
import './css/MobileDataHeader.css';
import { makeSortButtons } from '../UtilityFunctions';

function MobileDataHeader(props) {
  return [
    <div className="MobileDataHeader-cell MobileDataHeader-left">
      <p className="MobileDataHeader-label">Sort mode:</p>
    </div>,
    <div className="MobileDataHeader-cell MobileDataHeader-right">
      <div className="MobileDataHeader-sort-container flex-row align-center justify-between">
        <p className="MobileDataHeader-sort-mode">
          {props.sortStatus.split('-')[0]}
        </p>
        <div className="flex-row align-center">
          {makeSortButtons(
            props.sortStatus.split('-')[0],
            props.sortStatus,
            () => props.sortAction(props.sortStatus.split('-')[0], true),
            () => props.sortAction(props.sortStatus.split('-')[0], false)
          )}
        </div>
        <div
          className={
            'MobileDataHeader-sort-choices-container' +
            (props.showMobileSortOptions ? '' : ' hide')
          }
        >
          {props.gridSetup
            .filter((item) => item.type !== 'image' && item.type !== 'delete')
            .map((object) => (
              <p className="MobileDataHeader-sort-mode-choice">
                {object.header}
              </p>
            ))}
        </div>
      </div>
    </div>,
  ];
}

export default MobileDataHeader;
