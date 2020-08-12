import React from 'react';
import { format } from '../UtilityFunctions';
import { makeSortButtons } from '../UtilityFunctions';
import MobileGraphModeHeader from './MobileGraphModeHeader';
import MobileGraphModeCountry from './MobileGraphModeCountry';

class GraphMaker extends React.Component {
  constructor(props) {
    super(props);
    this.makeGraphHeader = this.makeGraphHeader.bind(this);
    this.makeCountryRow = this.makeCountryRow.bind(this);
    this.makeGraphBars = this.makeGraphBars.bind(this);
    this.setColumns = this.setColumns.bind(this);
  }

  setColumns() {
    let columns = this.props.gridSetup
      .filter((object) => object.type === 'number' && object.enabled === true)
      .map(() => '1fr');
    return columns.length < 1
      ? '1fr'
      : columns.reduce((previous, current) => previous + ' ' + current);
  }

  makeGraphBars(country, selectedCountries, gridSetup) {
    const barSpecs = gridSetup.filter(
      (object) => object.type === 'number' && object.enabled === true
    );
    let bars = [];

    for (let i = 0; i < barSpecs.length; i++) {
      if (barSpecs[i].graph === 'relative') {
        const highest = selectedCountries
          .map((object) => parseFloat(object[barSpecs[i].value]))
          .reduce((prev, curr) => (curr > prev ? curr : prev));
        const width = Math.round(
          (parseFloat(country[barSpecs[i].value]) / highest) * 100
        );

        bars.push(
          <div
            key={barSpecs[i].value + '-bar-' + country.name}
            className="example-bar"
            style={{ width: width + '%', backgroundColor: barSpecs[i].color }}
          >
            <p className="bar-chart-label">
              {format(country[barSpecs[i].value], barSpecs[i].value)}
            </p>
          </div>
        );
      } else {
        const width = Math.round(parseFloat(country[barSpecs[i].value]));
        bars.push(
          <div
            key={barSpecs[i].value + '-bar-' + country.name}
            className="example-bar"
            style={{ width: width + '%', backgroundColor: barSpecs[i].color }}
          >
            <p className="bar-chart-label">
              {format(country[barSpecs[i].value], barSpecs[i].value)}
            </p>
          </div>
        );
      }
    }

    return bars;
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
        className="header-middle"
        style={{ display: 'grid', gridTemplateColumns: this.setColumns() }}
      >
        {this.props.gridSetup
          .filter(
            (object) => object.type === 'number' && object.enabled === true
          )
          .map((graphHeader) => (
            <div
              key={'graph-header-cell-' + graphHeader.header}
              className="grid-cell"
            >
              <div
                className="table-header-graph m-right-small"
                style={{ backgroundColor: graphHeader.color }}
              />
              <p className="table-header">{graphHeader.header}</p>
              {makeSortButtons(
                graphHeader.value,
                this.props.sortStatus,
                () => this.props.sortAction(graphHeader.value, true),
                () => this.props.sortAction(graphHeader.value, false)
              )}
            </div>
          ))}
      </div>,
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
        {this.makeGraphBars(object, array, this.props.gridSetup)}
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
    if (!this.props.mobile) {
      return (
        <div id="graph-grid">
          {this.makeGraphHeader()}
          {this.props.selectedCountries.map((item, index, array) =>
            this.makeCountryRow(item, index, array)
          )}
        </div>
      );
    } else {
      return (
        <div id="graph-grid-mobile">
          <MobileGraphModeHeader
            gridSetup={this.props.gridSetup}
            sortStatus={this.props.sortStatus}
            sortAction={this.props.sortAction}
            toggle={this.props.toggle}
          />
          <MobileGraphModeCountry
            country={this.props.selectedCountries[0]}
            gridSetup={this.props.gridSetup}
            selectedCountries={this.props.selectedCountries}
          />
        </div>
      );
    }
  }
}

export default GraphMaker;
