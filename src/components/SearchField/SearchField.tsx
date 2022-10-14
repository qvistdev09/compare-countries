import { useEffect, useRef, useState } from 'react';
import countriesMap from '../../consts/countriesMap.json';
const countriesNames = Object.keys(countriesMap);

export default function SearchField({ onCountryAdd, selectedCountriesCodes, connectionFailure = false }: Props) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<any>();

  useEffect(() => {
    function clickListener(e: MouseEvent) {
      if (
        containerRef.current instanceof HTMLDivElement &&
        e.target instanceof Node &&
        !containerRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    }
    document.body.addEventListener('click', clickListener);
    return () => document.body.removeEventListener('click', clickListener);
  }, []);

  function handleInput(value: string) {
    setValue(value);
    generateSuggestions(value);
  }

  function generateSuggestions(input: string) {
    if (!input) {
      return setSuggestions([]);
    }
    const inputRegex = new RegExp(`^${input}`, 'i');
    const matchedCountries = countriesNames.filter(
      (name) =>
        inputRegex.test(name) && !selectedCountriesCodes.includes((countriesMap as Record<string, string>)[name]),
    );
    if (matchedCountries.length >= 4) {
      return setSuggestions(matchedCountries);
    }
    const secondTierRegex = new RegExp(input, 'i');
    const secondTierMatches = countriesNames.filter(
      (name) =>
        secondTierRegex.test(name) &&
        !matchedCountries.includes(name) &&
        !selectedCountriesCodes.includes((countriesMap as Record<string, string>)[name]),
    );
    setSuggestions([...matchedCountries, ...secondTierMatches]);
  }

  return (
    <div ref={containerRef} id="input-area" className="grow m-right-small screen-small-m-right">
      <input
        onClick={() => generateSuggestions(value)}
        id="search-field"
        placeholder="Type to add country"
        type="text"
        autoComplete="off"
        value={value}
        className={`country-search-field${suggestions.length > 0 ? ' showing-suggestions' : ''}${
          connectionFailure ? ' connection-fail' : ''
        }`}
        onChange={(e) => handleInput(e.target.value)}
      />
      <div id="suggestions-container" className={suggestions.length === 0 ? 'hidden' : 'flex-column'}>
        {suggestions.length > 0 &&
          suggestions.slice(0, 4).map((suggestion) => (
            <button
              className="suggestion-div flex-row justify-start align-center"
              key={suggestion}
              onClick={() => {
                handleInput('');
                onCountryAdd((countriesMap as Record<string, string>)[suggestion]);
              }}
            >
              <i className="fas fa-chevron-right suggestion-icon"></i>
              <p>{boldReplace(value, suggestion)}</p>
            </button>
          ))}
      </div>
    </div>
  );
}

interface Props {
  selectedCountriesCodes: string[];
  onCountryAdd: (countryCode: string) => void;
  connectionFailure?: boolean;
}

function boldReplace(userString: string, suggestion: string) {
  const split = suggestion.split(new RegExp(`(${userString})`, 'i')).filter((str) => str !== '');
  return split.map((element, index) => {
    if (element.toLowerCase() === userString.toLowerCase()) {
      return <strong key={`${element}${index}`}>{element}</strong>;
    }
    return element;
  });
}
