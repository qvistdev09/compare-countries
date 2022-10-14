import { Country } from '../../types';
import columns from '../../config/columns';
import { createGraphBars } from '../../utils';

export default function CountryRowGraphDesktop({
  evenRow,
  isLastRow,
  country,
  activeColumns,
  selectedCountries,
  deleteAction,
}: Props) {
  const activeGraphColumns = columns.filter(
    (column) => activeColumns.includes(column.label) && column.modes.includes('GRAPH'),
  );
  const shadeStatus = evenRow ? ' shaded-cell' : '';
  const rowStatus = isLastRow ? 'last-row-' : '';

  return (
    <>
      <div className={rowStatus + 'left-end grid-cell' + shadeStatus}>
        <p>{country.name}</p>
      </div>
      <div className={rowStatus + 'middle bar-chart-cell' + shadeStatus}>
        {createGraphBars(country, activeGraphColumns, selectedCountries)}
      </div>
      <div className={rowStatus + 'right-end grid-cell' + shadeStatus}>
        <button className="delete-button" onClick={() => deleteAction(country.alpha2Code)}>
          <i className="fas fa-times delete-icon" />
        </button>
      </div>
    </>
  );
}

interface Props {
  evenRow: boolean;
  isLastRow: boolean;
  country: Country;
  selectedCountries: Country[];
  activeColumns: string[];
  deleteAction: (code: string) => void;
}
