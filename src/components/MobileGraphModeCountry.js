import React from 'react';
import './css/MobileGraphModeCountry.css';

function MobileGraphModeCountry(props) {
  return [
    <div className="MobileGraphModeCountry-cell MobileGraphModeCountry-upper-left">
      <img
        src={props.country.flag}
        alt={'The flag of ' + props.country.name}
        className="MobileCountry-flag"
      />
    </div>,
    <div className="MobileGraphModeCountry-cell MobileGraphModeCountry-upper-right">
      <p>{props.country.name}</p>
    </div>,
  ];
}

export default MobileGraphModeCountry;
