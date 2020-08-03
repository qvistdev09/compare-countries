import React from 'react';

function Country(props) {
  return (
    <div className="country-container m-bottom p-small">
      <p>Name: {props.name}</p>
      <p>Population: {props.population}</p>
      <p>Capital: {props.capital}</p>
      <img src={props.flag} alt="flag" />
      <button onClick={() => props.delete(props.alpha2Code)}>Delete</button>
    </div>
  );
}

export default Country;
