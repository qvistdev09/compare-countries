import React from 'react';
import './css/MobileCountry.css';
import { format } from '../UtilityFunctions';

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

  const data = props.gridSetup
    .filter(
      (item) =>
        item.type !== 'delete' && item.value !== 'name' && item.value !== 'flag'
    )
    .map((object, index, array) => [
      <div
        key={
          'mobile-header-' + object.value + '-' + props.country[object.value]
        }
        className={
          'MobileCountry-cell MobileCountry-left' +
          (index === array.length - 1 ? '-last' : '')
        }
      >
        <p className="MobileCountry-header">{object.header}</p>
      </div>,
      <div
        key={'mobile-data-' + object.value + '-' + props.country[object.value]}
        className={
          'MobileCountry-cell MobileCountry-right' +
          (index === array.length - 1 ? '-last' : '')
        }
      >
        <p>{format(props.country[object.value], object.value)}</p>
      </div>,
    ]);

  return header.concat(data);
}

export default MobileCountry;
