import { Country } from "../../types";
import CountryGraphHeader from "../CountryGraphHeader";
import CountryGraphHeaderMobile from "../CountryGraphHeaderMobile";
import CountryRowGraphDesktop from "../CountryRowGraphDesktop";
import CountryRowGraphMobile from "../CountryRowGraphMobile";

export default function CountriesGraph({
  sortAction,
  currentSort,
  activeColumns,
  selectedCountries,
  deleteAction,
  isMobile,
  toggleColumn,
}: Props) {
  return (
    <div id={isMobile ? "graph-grid-mobile" : "graph-grid"}>
      {!isMobile && (
        <CountryGraphHeader
          sortAction={sortAction}
          currentSort={currentSort}
          activeColumns={activeColumns}
        />
      )}
      {!isMobile &&
        selectedCountries.map((country, index, array) => (
          <CountryRowGraphDesktop
            key={country.alpha2Code}
            evenRow={index % 2 === 0}
            isLastRow={index === array.length - 1}
            deleteAction={deleteAction}
            country={country}
            selectedCountries={selectedCountries}
            activeColumns={activeColumns}
          />
        ))}
      {isMobile && (
        <CountryGraphHeaderMobile
          sortAction={sortAction}
          currentSort={currentSort}
          toggleColumn={toggleColumn}
          activeColumns={activeColumns}
        />
      )}
      {isMobile &&
        selectedCountries.map((country) => (
          <CountryRowGraphMobile
            country={country}
            deleteAction={deleteAction}
            activeColumns={activeColumns}
            selectedCountries={selectedCountries}
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
  isMobile: boolean;
  toggleColumn: (label: string) => void;
}
