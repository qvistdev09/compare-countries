import { Country } from "../../types";

export function Flag({ country, columnPosition, isLastRow, isShaded }: CellProps) {
  const className = getClassName(isLastRow, isShaded, columnPosition);
  return (
    <div className={className}>
      <img src={country.flag} alt={`The flag of ${country.name}`} />
    </div>
  );
}

function getClassName(isLastRow: boolean, isShaded: boolean, columnPosition: string) {
  let position = columnPosition;
  if (isLastRow) {
    position = `last-row-${position}`;
  }
  const shadeStatus = isShaded ? "shaded-cell" : "non-shaded-cell";
  return `${shadeStatus} ${position} grid-cell`;
}

interface CellProps {
  country: Country;
  columnPosition: "left-end" | "middle" | "right-end";
  isLastRow: boolean;
  isShaded: boolean;
}
