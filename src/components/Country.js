import React from 'react';

function Country(props) {
  return [
    <div
      key={'name-cell-' + props.name}
      className={
        props.index === props.lastIndex
          ? 'grid-cell last-left-end'
          : 'grid-cell left-end'
      }
    >
      <p>{props.name}</p>
    </div>,
    <div
      key={'flag-cell-' + props.name}
      className={
        props.index === props.lastIndex
          ? 'grid-cell last-middle-cell'
          : 'grid-cell middle-cell'
      }
    >
      <img src={props.flag} alt={'The flag of ' + props.name} />
    </div>,
    <div
      key={'capital-cell-' + props.name}
      className={
        props.index === props.lastIndex
          ? 'grid-cell last-middle-cell'
          : 'grid-cell middle-cell'
      }
    >
      <p>{props.capital}</p>
    </div>,
    <div
      key={'population-cell-' + props.name}
      className={
        props.index === props.lastIndex
          ? 'grid-cell last-middle-cell'
          : 'grid-cell middle-cell'
      }
    >
      <p>{props.population}</p>
    </div>,
    <div
      key={'area-cell-' + props.name}
      className={
        props.index === props.lastIndex
          ? 'grid-cell last-middle-cell'
          : 'grid-cell middle-cell'
      }
    >
      <p>{props.area}</p>
    </div>,
    <div
      key={'delete-cell-' + props.name}
      className={
        props.index === props.lastIndex
          ? 'grid-cell last-right-end'
          : 'grid-cell right-end'
      }
    >
      <button onClick={() => props.delete(props.alpha2Code)}>Delete</button>
    </div>,
  ];
}

export default Country;
