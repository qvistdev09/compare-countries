import React from 'react';

function TableHeader(props) {
  return [
    <div key="header-cell-name" className="grid-cell">
      <p>Name</p>
    </div>,
    <div key="header-cell-flag" className="grid-cell">
      <p>Flag</p>
    </div>,
    <div key="header-cell-capital" className="grid-cell">
      <p>Capital</p>
    </div>,
    <div key="header-cell-population" className="grid-cell">
      <p>Population</p>
    </div>,
    <div key="header-cell-area" className="grid-cell">
      <p>Area</p>
    </div>,
    <div key="header-cell-delete" className="grid-cell">
      <p>Remove country</p>
    </div>,
  ];
}

export default TableHeader;
