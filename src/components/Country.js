import React from 'react';

function Country(props) {
  return (
    <div className="country-container">
      <p>{props.name}</p>
      <p>{props.population}</p>
      <p>{props.capital}</p>
    </div>
  );
}

export default Country;
