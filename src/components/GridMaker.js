import React from 'react';

class GridMaker extends React.Component {
  constructor(props) {
    super(props);
    this.headerRowGenerator = this.headerRowGenerator.bind(this);
  }

  headerRowGenerator(object, index, lastIndex) {
    let position;
    if (index === 0) {
      position = 'left-end';
    } else if (index === lastIndex) {
      position = 'right-end';
    } else {
      position = 'middle';
    }
    const className = 'grid-cell header-' + position;
    const key = 'header-cell-' + object.value;

    const headerText = (
      <p className="m-right-small table-header">{object.header}</p>
    );
    const headerTextImage = <p className="table-header">{object.header}</p>;
    const sortButtons = [
      <i
        onClick={() => this.props.sortAction(object.value, false)}
        className={
          'fas fa-chevron-up sort-icon' +
          (this.props.sortStatus === object.value + '-false'
            ? ' active-sort'
            : '')
        }
      ></i>,
      <i
        onClick={() => this.props.sortAction(object.value, true)}
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
        return <div key={key} className={className}></div>;
      default:
        return (
          <div>
            <p>Faulty cell</p>
          </div>
        );
    }
  }

  render() {
    return <div id="data-grid"></div>;
  }
}

export default GridMaker;
