import { Country } from '../../types';
import { formatValue } from '../../utils';

export function Name({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <p>{country.name}</p>
    </div>
  );
}

export function Flag({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <img src={country.flag} alt={`The flag of ${country.name}`} />
    </div>
  );
}

export function Capital({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <p>{country.capital}</p>
    </div>
  );
}

export function Population({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <p>{formatValue(country.population, 'population')}</p>
    </div>
  );
}

export function Area({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <p>{formatValue(country.area, 'area')}</p>
    </div>
  );
}

export function Demonym({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <p>{country.demonym}</p>
    </div>
  );
}

export function Gini({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <p>{formatValue(country.gini, 'gini')}</p>
    </div>
  );
}

export function DeleteButton({ country, columnPosition, isLastRow, isShaded, deleteCountryFunction }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <button className="delete-button" onClick={() => deleteCountryFunction(country.alpha2Code)}>
        <i className="fas fa-times delete-icon"></i>
      </button>
    </div>
  );
}

function getClassName(isLastRow: boolean, isShaded: boolean, columnPosition: string) {
  let position = columnPosition;
  if (isLastRow) {
    position = `last-row-${position}`;
  }
  const shadeStatus = isShaded ? 'shaded-cell' : 'non-shaded-cell';
  return `${shadeStatus} ${position} grid-cell`;
}

export interface CellProps {
  country: Country;
  columnPosition: 'left-end' | 'middle' | 'right-end';
  deleteCountryFunction: (id: string) => void;
  isLastRow: boolean;
  isShaded: boolean;
}
