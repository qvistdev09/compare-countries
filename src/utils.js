export const findCountryByCode = (alpha2Code, array) =>
  array.find((countryObj) => countryObj.alpha2Code === alpha2Code);
