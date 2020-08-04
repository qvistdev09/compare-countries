import React from 'react';
import './css/utilities.css';
import './css/style.css';
import { shortened, fullName } from './CountryCodes';

import Header from './components/Header';
import Country from './components/Country';
import InputField from './components/InputField';
import SuggestedCountries from './components/SuggestedCountries';
import TableHeader from './components/TableHeader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'No message loaded',
      input: '',
      suggestions: [],
      cached: [],
      selectedCountries: [],
    };

    this.fetchBlock = false;

    this.fetchCountry = this.fetchCountry.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
  }

  deleteCountry(code) {
    // check if country should be cached
    if (!this.state.cached.some((country) => country.alpha2Code === code)) {
      this.setState(
        (state, props) => ({
          cached: [
            ...state.cached,
            ...state.selectedCountries.filter(
              (country) => country.alpha2Code === code
            ),
          ],
          selectedCountries: state.selectedCountries.filter(
            (country) => country.alpha2Code !== code
          ),
        }),
        () => console.log(this.state.cached)
      );
    }
    // if already cached, just delete
    else {
      this.setState(
        (state, props) => ({
          selectedCountries: state.selectedCountries.filter(
            (country) => country.alpha2Code !== code
          ),
        }),
        () => console.log(this.state.cached)
      );
    }
  }

  fetchCountry(string) {
    if (this.fetchBlock) {
      return;
    }

    const code = shortened[fullName.indexOf(string)];
    // check if country is already selected
    if (
      this.state.selectedCountries.some(
        (country) => country.alpha2Code === code
      )
    ) {
      console.log('Country already selected');
      return;
    }

    this.fetchBlock = true;

    // check if country can be retrieved from cache of already viewed countries
    if (this.state.cached.some((country) => country.alpha2Code === code)) {
      this.setState(
        (state, props) => ({
          selectedCountries: [
            ...state.selectedCountries,
            ...state.cached.filter((country) => country.alpha2Code === code),
          ],
          suggestions: [],
          input: '',
        }),
        () => {
          console.log('Country collected from cache, no API call needed');
          this.fetchBlock = false;
        }
      );
    }
    // fetch previously unviewed country from API
    else {
      fetch('https://restcountries.eu/rest/v2/alpha/' + code)
        .then((response) => response.json())
        .then((data) => {
          this.setState(
            (state, props) => ({
              selectedCountries: [
                ...state.selectedCountries,
                {
                  ...data,
                },
              ],
              suggestions: [],
              input: '',
            }),
            () => {
              console.log('An API call was made');
              this.fetchBlock = false;
            }
          );
        })
        .catch((error) => console.log('Could not get data'));
    }
  }

  getSuggestions(event) {
    if (/[A-Za-z]/g.test(event.target.value) === false) {
      this.setState({
        input: '',
        suggestions: [],
      });
      return;
    }
    const cleanedInput = event.target.value.replace(/[^A-Za-z|\s]/g, '');
    let regex = RegExp('^' + cleanedInput, 'i');
    const matchedCountries = fullName.filter((item) => regex.test(item));
    if (matchedCountries.length >= 4) {
      this.setState((state) => ({
        input: cleanedInput,
        suggestions: matchedCountries.filter(
          (item) =>
            !state.selectedCountries.some(
              (element) =>
                element.alpha2Code === shortened[fullName.indexOf(item)]
            )
        ),
      }));
    } else {
      regex = RegExp(cleanedInput, 'i');
      const tier2searches = fullName
        .filter((item) => regex.test(item))
        .filter((item) => !matchedCountries.includes(item));
      this.setState((state) => ({
        input: cleanedInput,
        suggestions: matchedCountries
          .concat(tier2searches)
          .filter(
            (item) =>
              !state.selectedCountries.some(
                (element) =>
                  element.alpha2Code === shortened[fullName.indexOf(item)]
              )
          ),
      }));
    }
  }

  render() {
    return (
      <div id="site-container" className="p">
        <Header
          classes="m-bottom"
          title="Compare Countries"
          description="by qvistdev09, using REST countries API"
        />
        <div id="input-area" className="m-bottom">
          <InputField onChange={this.getSuggestions} input={this.state.input} />
          <SuggestedCountries
            classes="flex-column"
            suggestions={this.state.suggestions}
            input={this.state.input}
            add={this.fetchCountry}
          />
        </div>
        <div id="countries-container">
          <TableHeader />
          {this.state.selectedCountries.map((country) => (
            <Country
              {...country}
              key={country.name}
              delete={this.deleteCountry}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
