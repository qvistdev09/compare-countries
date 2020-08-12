import React from 'react';
import './css/MobileGraphModeCountry.css';
import { makeGraphBars } from '../UtilityFunctions';

function MobileGraphModeCountry(props) {
  return [
    <div
      key={'mobile-graph-flag-cell-' + props.country.name}
      className="MobileGraphModeCountry-cell MobileGraphModeCountry-upper-left"
    >
      <img
        src={props.country.flag}
        alt={'The flag of ' + props.country.name}
        className="MobileCountry-flag"
      />
    </div>,
    <div
      key={'mobile-graph-name-cell-' + props.country.name}
      className="MobileGraphModeCountry-name-cell MobileGraphModeCountry-upper-right"
    >
      <p>{props.country.name}</p>
      <button
        className="delete-button"
        onClick={() => props.deleteAction(props.country.alpha2Code)}
      >
        <i className="fas fa-times delete-icon"></i>
      </button>
    </div>,
    <div
      key={'mobile-graph-bar-cell-' + props.country.name}
      className="MobileGraphModeCountry-bar-container"
    >
      {makeGraphBars(props.country, props.selectedCountries, props.gridSetup)}
    </div>,
  ];
}

export default MobileGraphModeCountry;
