import { useEffect, useRef, useState } from "react";
import { getCountryByCode } from "../api";
import { Country } from "../types";
import countriesMap from "../consts/countriesMap.json";

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

  useEffect(() => {
    Promise.all(
      getRandomCountries(10)
        .map((name) => (countriesMap as any)[name])
        .map((code) => getCountryByCode(code))
    )
      .then((countries) => {
        countries.forEach((country) => {
          cache.set(country.alpha2Code, country);
        });
        setSelectedCountries([...selectedCountries, ...countries]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    selectedCountries,
    removeCountryByCode,
    selectCountryByCode,
  };
}

function getRandomCountries(amount: number) {
  const countriesKeys = Object.keys(countriesMap);
  const countriesToAdd: string[] = [];
  while (countriesToAdd.length !== amount) {
    const randomKey = countriesKeys[randomInt(0, countriesKeys.length)];
    if (!countriesToAdd.includes(randomKey)) {
      countriesToAdd.push(randomKey);
    }
  }
  return countriesToAdd;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
