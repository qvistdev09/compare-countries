import { useState } from "react";
import { Country } from "../types";

export default function useSortedCountries(
  defaultSortProperty: string,
  defaultSortDirection: "ASC" | "DESC",
  selectedCountries: Country[]
) {
  const [currentProperty, setCurrentProperty] = useState(defaultSortProperty);
  const [currentDirection, setCurrentDirection] = useState(defaultSortDirection);

  const sortedCountries = [...selectedCountries].sort((countryA, countryB) => {
    const valueA = (countryA as any)[currentProperty.toLowerCase()];
    const valueB = (countryB as any)[currentProperty.toLowerCase()];
    if (currentDirection === "ASC") {
      return valueA < valueB ? -1 : 1;
    }
    return valueA < valueB ? 1 : -1;
  });

  return {
    setSort: (property: string, direction: "ASC" | "DESC") => {
      setCurrentProperty(property);
      setCurrentDirection(direction);
    },
    currentSort: {
      column: currentProperty,
      direction: currentDirection,
    },
    sortedCountries,
  };
}
