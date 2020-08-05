import React from 'react';

function TableHeader(props) {
  return [
    <div key="header-cell-name" className="grid-cell header-end-left">
      <p>Name</p>
      <i
        onClick={() => props.action('name', false)}
        className="fas fa-caret-up"
      ></i>
      <i
        onClick={() => props.action('name', true)}
        className="fas fa-caret-down"
      ></i>
    </div>,
    <div key="header-cell-flag" className="grid-cell header-middle">
      <p>Flag</p>
    </div>,
    <div key="header-cell-capital" className="grid-cell header-middle">
      <p>Capital</p>
      <i
        onClick={() => props.action('capital', false)}
        className="fas fa-caret-up"
      ></i>
      <i
        onClick={() => props.action('capital', true)}
        className="fas fa-caret-down"
      ></i>
    </div>,
    <div key="header-cell-population" className="grid-cell header-middle">
      <p>Population</p>
      <i
        onClick={() => props.action('population', false)}
        className="fas fa-caret-up"
      ></i>
      <i
        onClick={() => props.action('population', true)}
        className="fas fa-caret-down"
      ></i>
    </div>,
    <div key="header-cell-area" className="grid-cell header-middle">
      <p>Area</p>
      <i
        onClick={() => props.action('area', false)}
        className="fas fa-caret-up"
      ></i>
      <i
        onClick={() => props.action('area', true)}
        className="fas fa-caret-down"
      ></i>
    </div>,
    <div key="header-cell-delete" className="grid-cell header-end-right">
      <p>Remove country</p>
    </div>,
  ];
}

export default TableHeader;
