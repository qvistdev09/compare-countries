import React from 'react';
import './css/MobileGraphModeCountry.css';
import { makeGraphBars } from '../UtilityFunctions';

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
    <div className="MobileGraphModeCountry-bar-container">
      {makeGraphBars(props.country, props.selectedCountries, props.gridSetup)}
    </div>,
  ];
}

export default MobileGraphModeCountry;
