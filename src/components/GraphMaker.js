import React from 'react';

class GraphMaker extends React.Component {
  constructor(props) {
    super(props);
    this.makeGraphHeader = this.makeGraphHeader.bind(this);
  }

  makeGraphHeader() {
    return [
      <div className="grid-cell header-left-end">
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
            (this.props.sortStatus === 'name-false' ? ' active-sort' : '')
          }
        ></i>
      </div>,
      <div className="grid-cell header-middle"></div>,
      <div className="grid-cell header-right-end"></div>,
    ];
  }

  render() {
    return <div id="graph-grid">{this.makeGraphHeader()}</div>;
  }
}

export default GraphMaker;
