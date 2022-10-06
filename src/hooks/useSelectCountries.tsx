import { useState } from "react";
import { getCountryByCode } from "../api";
import { Country } from "../types";

const cache = new Map<string, Country>();

export default function useSelectCountries() {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  async function selectCountryByCode(code: string) {
    if (!!selectedCountries.find((country) => country.alpha2Code === code)) {
      return;
    }
    const cached = cache.get(code);
    if (cached) {
      return setSelectedCountries([...selectedCountries, cached]);
    }
    const fetched = await getCountryByCode(code);
    cache.set(fetched.alpha2Code, fetched);
    setSelectedCountries([...selectedCountries, fetched]);
  }

  function removeCountryByCode(code: string) {
    setSelectedCountries(selectedCountries.filter((country) => country.alpha2Code !== code));
  }

  return {
    selectedCountries,
    removeCountryByCode,
    selectCountryByCode,
  };
}
