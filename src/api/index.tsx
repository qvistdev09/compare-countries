import { Country } from "../hooks/useSelectCountries";

export function getCountryByCode(code: string): Promise<Country> {
  return fetch(`https://restcountries.com/v2/alpha/${code}`)
    .then((response) => {
      if (response.status > 399) {
        throw response;
      }
      return response.json();
    })
    .then((data) => ({
      alpha2Code: data.alpha2Code as string,
      flag: data.flag as string,
      capital: data.capital as string,
      population: data.population as number,
      area: data.area as number,
      demonym: data.demonym as string,
      gini: data.gini as number,
    }));
}
