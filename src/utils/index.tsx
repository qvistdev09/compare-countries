import { ColumnConfig } from "../config/columns";
import { Country } from "../types";

export function formatValue(value: number | undefined, type: "population" | "area" | "gini") {
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

export function createGraphBars(
  country: Country,
  activeColumns: ColumnConfig[],
  selectedCountries: Country[]
) {
  return activeColumns.map((column) => {
    if (column.barRenderMode === "RELATIVE") {
      const value = (country as any)[column.label.toLowerCase()];
      const highest = selectedCountries
        .map((object) => Number.parseFloat((object as any)[column.label.toLowerCase()]))
        .reduce((prev, curr) => (curr > prev ? curr : prev));

      const width =
        value === undefined ? 0 : Math.round((Number.parseFloat(value) / highest) * 100);

      return (
        <div
          key={column.label}
          className="example-bar"
          style={{ width: width + "%", backgroundColor: column.graphColor }}
        >
          <p className="bar-chart-label">
            {formatValue(
              (country as any)[column.label.toLowerCase()],
              column.label.toLowerCase() as any
            )}
          </p>
        </div>
      );
    }
    const value = (country as any)[column.label.toLowerCase()];
    const width = value === undefined ? 0 : Math.round(Number.parseFloat(value));
    return (
      <div
        key={column.label}
        className="example-bar"
        style={{ width: width + "%", backgroundColor: column.graphColor }}
      >
        <p className="bar-chart-label">
          {formatValue(
            (country as any)[column.label.toLowerCase()],
            column.label.toLowerCase() as any
          )}
        </p>
      </div>
    );
  });
}
