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
    this.format = this.format.bind(this);
  }

  format(input, type) {
    if (!input) {
      return 'n/a';
    }

    switch (type) {
      case 'population':
        if (input > 1000000) {
          let toMillion = input / 1000000;
          return Math.round(toMillion * 10) / 10 + ' mil';
        } else if (input > 10000) {
          let toThousand = input / 1000;
          return Math.round(toThousand * 10) / 10 + ' k';
        } else {
          return input;
        }
      case 'area':
        return [input.toLocaleString() + ' km', <span class="raised">2</span>];
      default:
        return input;
    }
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
            <p>{this.format(this.props[object.value], object.value)}</p>
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
            <button
              className="delete-button"
              onClick={() => this.props.delete(this.props.alpha2Code)}
            >
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
