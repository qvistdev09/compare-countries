import countriesHashMap from "../consts/countriesHashMap.json";
const countriesNames = Object.keys(countriesHashMap);

const getFirstTierMatches = (input) => {
  const firstTierRegex = RegExp("^" + input, "i");
  const firstTierMatches = countriesNames.filter((name) =>
    firstTierRegex.test(name)
  );
  return firstTierMatches;
};

const getSecondTierMatches = (firstTierMatches, input) => {
  const secondTierRegex = RegExp(input, "i");
  const secondTierMatches = countriesNames
    .filter((name) => secondTierRegex.test(name))
    .filter((name) => !firstTierMatches.includes(name));
  return secondTierMatches;
};

const useSearchSuggestions = (searchString) => {
  const cleanedInput = searchString.replace(/[^A-Za-z|\s]/g, "");

  const firstTierMatches = getFirstTierMatches(cleanedInput);

  return firstTierMatches.length >= 4
    ? firstTierMatches
    : [
        ...firstTierMatches,
        ...getSecondTierMatches(firstTierMatches, cleanedInput),
      ];
};

export default useSearchSuggestions;
