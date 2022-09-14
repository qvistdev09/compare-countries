export function getCountryByCode(code: string) {
  return fetch(`https://restcountries.com/v3.1/alpha/${code}`).then((response) => {
    if (response.status > 399) {
      throw response;
    }
    return response.json();
  });
}
