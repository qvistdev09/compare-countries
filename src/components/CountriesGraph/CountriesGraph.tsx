import { Country } from "../../types";
import CountryGraphHeader from "../CountryGraphHeader";
import CountryRowGraphDesktop from "../CountryRowGraphDesktop";

export default function CountriesGraph({
  sortAction,
  currentSort,
  activeColumns,
  selectedCountries,
  deleteAction,
}: Props) {
  return (
    <div id="graph-grid">
      <CountryGraphHeader
        sortAction={sortAction}
        currentSort={currentSort}
        activeColumns={activeColumns}
      />
      {selectedCountries.map((country, index, array) => (
        <CountryRowGraphDesktop
          evenRow={index % 2 === 0}
          isLastRow={index === array.length - 1}
          deleteAction={deleteAction}
          country={country}
          selectedCountries={selectedCountries}
          activeColumns={activeColumns}
        />
      ))}
    </div>
  );
}

interface Props {
  sortAction: (column: string, direction: "ASC" | "DESC") => void;
  currentSort: { column: string; direction: "ASC" | "DESC" };
  activeColumns: string[];
  selectedCountries: Country[];
  deleteAction: (code: string) => void;
}
