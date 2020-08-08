import React from 'react';
import { format } from '../UtilityFunctions';

class GridMaker extends React.Component {
  constructor(props) {
    super(props);
    this.setColumns = this.setColumns.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.headerRowGenerator = this.headerRowGenerator.bind(this);
    this.dataRowGenerator = this.dataRowGenerator.bind(this);
  }

  setColumns() {
    return this.props.gridSetup
      .filter((item) => item.enabled)
      .map((object) => object.width)
      .reduce((previous, current) => previous + ' ' + current);
  }

  setPosition(index, lastIndex) {
    if (index === 0) {
      return 'left-end';
    } else if (index === lastIndex) {
      return 'right-end';
    } else {
      return 'middle';
    }
  }

  headerRowGenerator(object, index, lastIndex) {
    const position = this.setPosition(index, lastIndex);
    const className = 'grid-cell header-' + position;
    const key = 'header-cell-' + object.value;

    const headerText = (
      <p className="m-right-small table-header">{object.header}</p>
    );
    const headerTextImage = <p className="table-header">{object.header}</p>;
    const sortButtons = [
      <i
        onClick={() => this.props.sortAction(object.value, false)}
        key="sort-ascending-false"
        className={
          'fas fa-chevron-up sort-icon' +
          (this.props.sortStatus === object.value + '-false'
            ? ' active-sort'
            : '')
        }
      ></i>,
      <i
        onClick={() => this.props.sortAction(object.value, true)}
        key="sort-ascending-true"
        className={
          'fas fa-chevron-down sort-icon' +
          (this.props.sortStatus === object.value + '-true'
            ? ' active-sort'
            : '')
        }
      ></i>,
    ];

    switch (object.type) {
      case 'text':
      case 'number':
        return (
          <div key={key} className={className}>
            {headerText}
            {sortButtons}
          </div>
        );
      case 'image':
        return (
          <div key={key} className={className}>
            {headerTextImage}
          </div>
        );
      case 'delete':
        return (
          <div
            key={key}
            className={
              this.props.gridSetup.filter((item) =>
                item.type !== 'delete' && item.enabled === true ? true : false
              ).length === 0
                ? 'hide '
                : className
            }
          ></div>
        );
      default:
        return (
          <div>
            <p>Faulty cell</p>
          </div>
        );
    }
  }

  dataRowGenerator(
    cellObject,
    countryObject,
    thisColumn,
    lastColumn,
    thisRow,
    lastRow
  ) {
    let position = this.setPosition(thisColumn, lastColumn);
    if (thisRow === lastRow) {
      position = 'last-row-' + position;
    }
    let shadeStatus;
    if (thisRow % 2 === 0) {
      shadeStatus = 'shaded-cell';
    } else {
      shadeStatus = 'non-shaded-cell';
    }
    const key = cellObject.value + '-cell-' + countryObject.name;
    const className = shadeStatus + ' ' + position + ' grid-cell';

    switch (cellObject.type) {
      case 'text':
      case 'number':
        return (
          <div key={key} className={className}>
            <p>
              {format(countryObject[cellObject.value], cellObject.value)}
            </p>
          </div>
        );
      case 'image':
        return (
          <div key={key} className={className}>
            <img
              src={countryObject[cellObject.value]}
              alt={'The flag of ' + countryObject.name}
            />
          </div>
        );
      case 'delete':
        return (
          <div
            key={key}
            className={
              this.props.gridSetup.filter((item) =>
                item.type !== 'delete' && item.enabled === true ? true : false
              ).length === 0
                ? 'hide '
                : className
            }
          >
            <button
              className="delete-button"
              onClick={() => this.props.deleteAction(countryObject.alpha2Code)}
            >
              <i className="fas fa-times delete-icon"></i>
            </button>
          </div>
        );
      default:
        return (
          <div>
            <p>Incorrect cell</p>
          </div>
        );
    }
  }

  render() {
    return (
      <div id="data-grid" style={{ gridTemplateColumns: this.setColumns() }}>
        {/* Create header */}
        {this.props.gridSetup
          .filter((item) => item.enabled === true)
          .map((object, index, array) =>
            this.headerRowGenerator(object, index, array.length - 1)
          )}

        {/* Create data entries */}
        {this.props.selectedCountries.map((countryObject, row, rowArray) =>
          this.props.gridSetup
            .filter((item) => item.enabled === true)
            .map((columnObject, column, columnArray) =>
              this.dataRowGenerator(
                columnObject,
                countryObject,
                column,
                columnArray.length - 1,
                row,
                rowArray.length - 1
              )
            )
        )}
      </div>
    );
  }
}

export default GridMaker;
