import { Country } from "../../types";
import { createGraphBars } from "../../utils";
import columns from "../../config/columns";

export default function CountryRowGraphMobile({
  country,
  deleteAction,
  activeColumns,
  selectedCountries,
}: Props) {
  const activeGraphColumns = columns.filter(
    (column) => column.modes.includes("GRAPH") && activeColumns.includes(column.label)
  );
  return (
    <>
      <div className="MobileGraphModeCountry-cell MobileGraphModeCountry-upper-left">
        <img
          src={country.flag}
          alt={"The flag of " + country.name}
          className="MobileCountry-flag"
        />
      </div>
      <div className="MobileGraphModeCountry-name-cell MobileGraphModeCountry-upper-right">
        <p>{country.name}</p>
        <button className="delete-button" onClick={() => deleteAction(country.alpha2Code)}>
          <i className="fas fa-times delete-icon"></i>
        </button>
      </div>
      <div className="MobileGraphModeCountry-bar-container">
        {createGraphBars(country, activeGraphColumns, selectedCountries)}
      </div>
    </>
  );
}

interface Props {
  country: Country;
  deleteAction: (code: string) => void;
  activeColumns: string[];
  selectedCountries: Country[];
}
