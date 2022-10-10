import columns from "../../config/columns";
import { Country } from "../../types";
import CountriesMobileHeader from "../CountriesMobileHeader";
import CountryRowDesktop from "../CountryRowDesktop";
import CountryRowHeadersDesktop from "../CountryRowHeadersDesktop";
import CountryRowMobile from "../CountryRowMobile";

export default function CountriesTable({
  activeColumns,
  sortFunction,
  currentSort,
  selectedCountries,
  deleteFunction,
  isMobile,
}: Props) {
  const gridTemplateColumns = isMobile
    ? "auto 1fr"
    : columns
        .filter((column) => activeColumns.includes(column.label))
        .map((column) => column.width)
        .join(" ");

  return (
    <div id="data-grid" style={{ gridTemplateColumns }}>
      {isMobile && <CountriesMobileHeader sortFunction={sortFunction} currentSort={currentSort} />}
      {isMobile &&
        selectedCountries.map((country) => (
          <CountryRowMobile country={country} deleteAction={deleteFunction} />
        ))}
      {!isMobile && (
        <CountryRowHeadersDesktop
          activeColumns={activeColumns}
          sortFunction={sortFunction}
          currentSort={currentSort}
        />
      )}
      {!isMobile &&
        selectedCountries.map((country, index) => (
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
  isMobile: boolean;
}
