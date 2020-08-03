import React from 'react';

function Country(props) {
  return (
    <div className="country-container">
      <p>{props.name}</p>
      <p>{props.population}</p>
      <p>{props.capital}</p>
      <img src={props.flag} alt="flag" />
      <button onClick={() => props.delete(props.alpha2Code)}>Delete</button>
    </div>
  );
}

export default Country;
