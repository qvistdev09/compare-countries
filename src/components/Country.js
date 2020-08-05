import React from 'react';

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { type: 'text', value: 'name', header: 'Name' },
      { type: 'image', value: 'flag', header: 'Flag' },
      { type: 'text', value: 'capital', header: 'Capital' },
      { type: 'text', value: 'population', header: 'Population' },
      { type: 'text', value: 'area', header: 'Area' },
      { type: 'delete', value: 'delete', header: 'Delete' },
    ];

    this.cellGenerator = this.cellGenerator.bind(this);
  }

  cellGenerator(object, index, lastIndex) {
    let position;
    let shadeStatus;
    if (index === 0) {
      position = 'left-end';
    } else if (index === lastIndex) {
      position = 'right-end';
    } else {
      position = 'middle';
    }

    if (this.props.thisRow === this.props.lastRow) {
      position = 'last-row-' + position;
    }

    if (this.props.thisRow % 2 === 0) {
      shadeStatus = 'shaded-cell';
    } else {
      shadeStatus = 'non-shaded-cell';
    }

    const key = object.value + '-cell-' + this.props.name;
    const className = shadeStatus + ' ' + position + ' grid-cell';

    switch (object.type) {
      case 'text':
        return (
          <div key={key} className={className}>
            <p>{this.props[object.value]}</p>
          </div>
        );
      case 'image':
        return (
          <div key={key} className={className}>
            <img
              src={this.props[object.value]}
              alt={'The flag of ' + this.props.name}
            />
          </div>
        );
      case 'delete':
        return (
          <div key={key} className={className}>
            <button className="delete-button" onClick={() => this.props.delete(this.props.alpha2Code)}>
              <i className="fas fa-times delete-icon"></i>
            </button>
          </div>
        );
      default:
        return (
          <div key={'incorrect-' + this.props.name}>
            <p>Incorrectly marked cell</p>
          </div>
        );
    }
  }

  render() {
    return this.columns.map((item, index, array) =>
      this.cellGenerator(item, index, array.length - 1)
    );
  }
}

export default Country;
