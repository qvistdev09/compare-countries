import React from 'react';

function TableHeader(props) {
  return [
    <div key="header-cell-name" className="grid-cell header-end-left">
      <p className="m-right-small table-header">Name</p>
      <i
        onClick={() => props.action('name', false)}
        className={
          'fas fa-chevron-up sort-icon' +
          (props.sortStatus === 'name-false' ? ' active-sort' : '')
        }
      ></i>
      <i
        onClick={() => props.action('name', true)}
        className={"fas fa-chevron-down sort-icon" +
        (props.sortStatus === 'name-true' ? ' active-sort' : '')}
      ></i>
    </div>,
    <div key="header-cell-flag" className="grid-cell header-middle">
      <p className="table-header">Flag</p>
    </div>,
    <div key="header-cell-capital" className="grid-cell header-middle">
      <p className="m-right-small table-header">Capital</p>
      <i
        onClick={() => props.action('capital', false)}
        className={"fas fa-chevron-up sort-icon" +
        (props.sortStatus === 'capital-false' ? ' active-sort' : '')}
      ></i>
      <i
        onClick={() => props.action('capital', true)}
        className={"fas fa-chevron-down sort-icon" +
        (props.sortStatus === 'capital-true' ? ' active-sort' : '')}
      ></i>
    </div>,
    <div key="header-cell-population" className="grid-cell header-middle">
      <p className="m-right-small table-header">Population</p>
      <i
        onClick={() => props.action('population', false)}
        className={"fas fa-chevron-up sort-icon" +
        (props.sortStatus === 'population-false' ? ' active-sort' : '')}
      ></i>
      <i
        onClick={() => props.action('population', true)}
        className={"fas fa-chevron-down sort-icon" +
        (props.sortStatus === 'population-true' ? ' active-sort' : '')}
      ></i>
    </div>,
    <div key="header-cell-area" className="grid-cell header-middle">
      <p className="m-right-small table-header">Area</p>
      <i
        onClick={() => props.action('area', false)}
        className={"fas fa-chevron-up sort-icon" +
        (props.sortStatus === 'area-false' ? ' active-sort' : '')}
      ></i>
      <i
        onClick={() => props.action('area', true)}
        className={"fas fa-chevron-down sort-icon" +
        (props.sortStatus === 'area-true' ? ' active-sort' : '')}
      ></i>
    </div>,
    <div key="header-cell-delete" className="grid-cell header-end-right"></div>,
  ];
}

export default TableHeader;
