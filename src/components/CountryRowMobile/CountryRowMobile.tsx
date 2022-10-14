import { Country } from '../../types';
import columns, { Format } from '../../config/columns';
import { formatValue } from '../../utils';

export default function CountryRowMobile({ country, deleteAction }: Props) {
  return (
    <>
      <div className="MobileCountry-cell MobileCountry-header-left">
        <img src={country.flag} alt={'The flag of ' + country.name} className="MobileCountry-flag" />
      </div>
      <div className="MobileCountry-cell MobileCountry-header-right">
        <p>{country.name}</p>
        <button className="delete-button" onClick={() => deleteAction(country.alpha2Code)}>
          <i className="fas fa-times delete-icon"></i>
        </button>
      </div>
      {columns
        .filter((column) => column.renderInMobileList)
        .map((column, index, array) => (
          <Row
            key={column.label}
            header={column.label}
            value={(country as any)[column.label.toLowerCase()]}
            isLast={index === array.length - 1}
            format={column.format}
          />
        ))}
    </>
  );
}

function Row({ header, value, isLast, format }: { header: string; value: any; isLast: boolean; format?: Format }) {
  return (
    <>
      <div className={'MobileCountry-cell MobileCountry-left' + (isLast ? '-last' : '')}>
        <p className="MobileCountry-header">{header}</p>
      </div>
      <div className={'MobileCountry-cell MobileCountry-right' + (isLast ? '-last' : '')}>
        <p>{typeof value === 'string' ? value : formatValue(value, format as Format)}</p>
      </div>
    </>
  );
}

interface Props {
  country: Country;
  deleteAction: (code: string) => void;
}
