import React from 'react';

function Country(props) {
  return [
    <div key={'name-cell-' + props.name} className="grid-cell">
      <p>{props.name}</p>
    </div>,
    <div key={'flag-cell-' + props.name} className="grid-cell">
      <img src={props.flag} alt={'The flag of ' + props.name} />
    </div>,
    <div key={'capital-cell-' + props.name} className="grid-cell">
      <p>{props.capital}</p>
    </div>,
    <div key={'population-cell-' + props.name} className="grid-cell">
      <p>{props.population}</p>
    </div>,
    <div key={'area-cell-' + props.name} className="grid-cell">
      <p>{props.area}</p>
    </div>,
    <div key={'delete-cell-' + props.name} className="grid-cell">
      <button onClick={() => props.delete(props.alpha2Code)}>Delete</button>
    </div>,
  ];
}

export default Country;