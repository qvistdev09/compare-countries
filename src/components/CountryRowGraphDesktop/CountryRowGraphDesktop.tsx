import { Country } from "../../types";
import columns, { ColumnConfig } from "../../config/columns";
import { formatValue } from "../../utils";

export default function CountryRowGraphDesktop({
  evenRow,
  isLastRow,
  country,
  activeColumns,
  selectedCountries,
  deleteAction,
}: Props) {
  const activeGraphColumns = columns.filter(
    (column) => activeColumns.includes(column.label) && column.modes.includes("GRAPH")
  );
  const shadeStatus = evenRow ? " shaded-cell" : "";
  const rowStatus = isLastRow ? "last-row-" : "";

  return (
    <>
      <div className={rowStatus + "left-end grid-cell" + shadeStatus}>
        <p>{country.name}</p>
      </div>
      <div className={rowStatus + "middle bar-chart-cell" + shadeStatus}>
        {createBars(country, activeGraphColumns, selectedCountries)}
      </div>
      <div className={rowStatus + "right-end grid-cell" + shadeStatus}>
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

function createBars(country: Country, activeColumns: ColumnConfig[], selectedCountries: Country[]) {
  return activeColumns.map((column) => {
    if (column.barRenderMode === "RELATIVE") {
      const highest = selectedCountries
        .map((object) => Number.parseFloat((object as any)[column.label.toLowerCase()]))
        .reduce((prev, curr) => (curr > prev ? curr : prev));

      const width = Math.round(
        (Number.parseFloat((country as any)[column.label.toLowerCase()]) / highest) * 100
      );

      return (
        <div
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
    const width = Math.round(Number.parseFloat((country as any)[column.label.toLowerCase()]));
    return (
      <div
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
