import { useState } from "react";
import countriesHashMap from "../consts/countriesHashMap.json";
import apiClient from "../api/apiClient";
import { findCountryByCode } from "../utils";

const useCountriesContainer = (addError) => {
  const [countriesCache, setCountriesCache] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const deleteCountry = (code) =>
    setSelectedCountries((prevState) =>
      prevState.filter((countryObj) => countryObj.alpha2Code !== code)
    );

  const addCountry = (countryName) => {
    const alpha2Code = countriesHashMap[countryName];
    const matchInSelected = findCountryByCode(alpha2Code, selectedCountries);
    if (matchInSelected) {
      return;
    }
    const matchInCached = findCountryByCode(alpha2Code, countriesCache);
    if (matchInCached) {
      return setSelectedCountries((prevState) => [...prevState, matchInCached]);
    }
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    apiClient
      .fetchCountry(alpha2Code)
      .then((countryObject) => {
        setSelectedCountries((prevState) => [...prevState, countryObject]);
        setCountriesCache((prevState) => [...prevState, countryObject]);
      })
      .catch((err) => {
        console.log(err);
        addError(`Could not fetch country: ${countryName}`);
      })
      .finally(() => setIsFetching(false));
  };

  return {
    deleteCountry,
    addCountry,
    selectedCountries,
  };
};

export default useCountriesContainer;
