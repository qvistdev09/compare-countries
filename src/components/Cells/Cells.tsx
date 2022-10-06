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

function formatNumber(value: number | undefined, type: "population" | "area" | "gini") {
  if (typeof value !== "number") {
    return "n/a";
  }
  switch (type) {
    case "population":
      if (value > 1000000) {
        const toMillion = value / 1000000;
        return Math.round(toMillion * 10) / 10 + " mil";
      } else if (value > 10000) {
        const toThousand = value / 1000;
        return Math.round(toThousand * 10) / 10 + " k";
      } else {
        return value;
      }
    case "area":
      return [
        value.toLocaleString() + " km",
        <span key="raised-span" className="raised">
          2
        </span>,
      ];
    case "gini":
      return value + "%";
    default:
      return value;
  }
}

interface CellProps {
  country: Country;
  columnPosition: "left-end" | "middle" | "right-end";
  isLastRow: boolean;
  isShaded: boolean;
}
