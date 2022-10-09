import columns from "../../config/columns";
import { Country } from "../../types";
import CountryRowDesktop from "../CountryRowDesktop";
import CountryRowHeadersDesktop from "../CountryRowHeadersDesktop";

export default function CountriesDesktopTable({
  activeColumns,
  sortFunction,
  currentSort,
  selectedCountries,
  deleteFunction,
}: Props) {
  const gridTemplateColumns = columns
    .filter((column) => activeColumns.includes(column.label))
    .map((column) => column.width)
    .join(" ");

  return (
    <div id="data-grid" style={{ gridTemplateColumns }}>
      <CountryRowHeadersDesktop
        activeColumns={activeColumns}
        sortFunction={sortFunction}
        currentSort={currentSort}
      />
      {selectedCountries.map((country, index) => (
        <CountryRowDesktop
          key={country.alpha2Code}
          country={country}
          activeColumns={activeColumns}
          isLastRow={index === selectedCountries.length - 1}
          isShaded={index % 2 === 0}
          deleteFunction={deleteFunction}
        />
      ))}
    </div>
  );
}

interface Props {
  activeColumns: string[];
  sortFunction: (column: string, direction: "ASC" | "DESC") => void;
  currentSort: { column: string; direction: "ASC" | "DESC" };
  selectedCountries: Country[];
  deleteFunction: (id: string) => void;
}
