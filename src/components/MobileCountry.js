import React from 'react';
import './css/MobileCountry.css';

function MobileCountry(props) {
  const header = [
    <div
      key={'mobile-country-header-flag-' + props.country.name}
      className="MobileCountry-cell MobileCountry-header-left"
    >
      <img
        src={props.country.flag}
        alt={'The flag of ' + props.country.name}
        className="MobileCountry-flag"
      />
    </div>,
    <div
      key={'mobile-country-header-name-' + props.country.name}
      className="MobileCountry-cell MobileCountry-header-right"
    >
      <p>{props.country.name}</p>
    </div>,
  ];

  return header;
}

export default MobileCountry;
