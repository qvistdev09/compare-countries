import React from 'react';

class GraphMaker extends React.Component {
  constructor(props) {
    super(props);
    this.makeGraphHeader = this.makeGraphHeader.bind(this);
    this.makeCountryRow = this.makeCountryRow.bind(this);
  }

  makeGraphHeader() {
    return [
      <div key="graph-header-cell-name" className="grid-cell header-left-end">
        <p className="table-header m-right-small">Name</p>
        <i
          onClick={() => this.props.sortAction('name', false)}
          key="sort-ascending-false"
          className={
            'fas fa-chevron-up sort-icon' +
            (this.props.sortStatus === 'name-false' ? ' active-sort' : '')
          }
        ></i>
        <i
          onClick={() => this.props.sortAction('name', true)}
          key="sort-ascending-true"
          className={
            'fas fa-chevron-down sort-icon' +
            (this.props.sortStatus === 'name-true' ? ' active-sort' : '')
          }
        ></i>
      </div>,
      <div
        key="graph-header-cell-gap"
        className="grid-cell header-middle"
      ></div>,
      <div
        key="graph-header-cell-delete"
        className="grid-cell header-right-end"
      ></div>,
    ];
  }

  makeCountryRow(object, index, array) {
    const shadeStatus = index % 2 === 0 ? ' shaded-cell' : '';
    const rowStatus = index === array.length - 1 ? 'last-row-' : '';

    return [
      <div
        key={'name-cell-' + object.name}
        className={rowStatus + 'left-end grid-cell' + shadeStatus}
      >
        <p>{object.name}</p>
      </div>,
      <div
        key={'chart-cell-' + object.name}
        className={rowStatus + 'middle bar-chart-cell' + shadeStatus}
      >
        <div className="example-bar"><p className="bar-chart-label">Population</p></div>
        <div className="example-bar"></div>
      </div>,
      <div
        key={'delete-cell-' + object.name}
        className={rowStatus + 'right-end grid-cell' + shadeStatus}
      >
        <button
          className="delete-button"
          onClick={() => this.props.deleteAction(object.alpha2Code)}
        >
          <i className="fas fa-times delete-icon"></i>
        </button>
      </div>,
    ];
  }

  render() {
    return (
      <div id="graph-grid">
        {this.makeGraphHeader()}
        {this.props.selectedCountries.map((item, index, array) =>
          this.makeCountryRow(item, index, array)
        )}
      </div>
    );
  }
}

export default GraphMaker;
