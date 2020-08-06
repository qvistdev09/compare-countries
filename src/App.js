import React from 'react';
import './css/utilities.css';
import './css/style.css';
import { countries } from './Data';
import startingCountries from './StartingData';

import Header from './components/Header';
import Country from './components/Country';
import InputField from './components/InputField';
import SuggestedCountries from './components/SuggestedCountries';
import TableHeader from './components/TableHeader';
import Footer from './components/Footer';
import GridMaker from './components/GridMaker'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'No message loaded',
      input: '',
      suggestions: [],
      cached: startingCountries,
      selectedCountries: startingCountries,
      headerHeight: 10,
      sortStatus: 'unsorted',
    };

    this.fetchBlock = false;
    this.blurBlock = false;
    this.headerObj = null;
    this.cKeys = Object.keys(countries);

    this.fetchCountry = this.fetchCountry.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
    this.sortCountries = this.sortCountries.bind(this);
    this.adaptToHeader = this.adaptToHeader.bind(this);
  }

  componentDidMount() {
    const rem = parseInt(
      getComputedStyle(document.documentElement).fontSize.slice(0, 2)
    );
    this.headerObj = document.getElementById('site-header');
    this.setState(
      {
        headerHeight: this.headerObj.offsetHeight / rem,
      },
      () => window.addEventListener('resize', this.adaptToHeader)
    );
  }

  adaptToHeader() {
    const rem = parseInt(
      getComputedStyle(document.documentElement).fontSize.slice(0, 2)
    );
    this.setState({
      headerHeight: this.headerObj.offsetHeight / rem,
    });
  }

  sortCountries(property, ascending) {
    console.log('attempting to sort');
    const sortedCopy = JSON.parse(JSON.stringify(this.state.selectedCountries));

    if (ascending) {
      sortedCopy.sort((a, b) => (a[property] < b[property] ? 1 : -1));
    } else {
      sortedCopy.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    }
    this.setState({
      selectedCountries: sortedCopy,
      sortStatus: property + '-' + ascending,
    });
  }

  deleteCountry(code) {
    // check if country should be cached
    if (!this.state.cached.some((country) => country.alpha2Code === code)) {
      this.setState(
        (state) => ({
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

    const code = countries[string];
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
          sortStatus: 'unsorted',
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
              sortStatus: 'unsorted',
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
      this.blurBlock = false;
      this.setState({
        input: '',
        suggestions: [],
      });
      return;
    }
    const cleanedInput = event.target.value.replace(/[^A-Za-z|\s]/g, '');
    let regex = RegExp('^' + cleanedInput, 'i');
    const matchedCountries = this.cKeys.filter((item) => regex.test(item));

    if (matchedCountries.length >= 4) {
      this.setState((state) => ({
        input: cleanedInput,
        suggestions: matchedCountries.filter(
          (item) =>
            !state.selectedCountries.some(
              (element) => element.alpha2Code === countries[item]
            )
        ),
      }));
    } else {
      regex = RegExp(cleanedInput, 'i');
      const tier2searches = this.cKeys
        .filter((item) => regex.test(item))
        .filter((item) => !matchedCountries.includes(item));
      this.setState((state) => ({
        input: cleanedInput,
        suggestions: matchedCountries
          .concat(tier2searches)
          .filter(
            (item) =>
              !state.selectedCountries.some(
                (element) => element.alpha2Code === countries[item]
              )
          ),
      }));
    }
  }

  render() {
    return (
      <div id="site-container">
        <Header
          classes="p flex-row justify-between align-center"
          title="COMPARE COUNTRIES"
          description="using REST countries API"
        >
          <div id="input-area" className="m-right">
            <InputField
              onChange={this.getSuggestions}
              onBlur={() => {
                if (!this.blurBlock) {
                  this.setState({ suggestions: [] });
                }
              }}
              input={this.state.input}
              classes={
                this.state.suggestions.length > 0 ? 'showing-suggestions' : ''
              }
            />
            <SuggestedCountries
              classes="flex-column"
              suggestions={this.state.suggestions}
              input={this.state.input}
              add={this.fetchCountry}
              onMouseEnter={() => {
                this.blurBlock = true;
              }}
              onMouseLeave={() => {
                this.blurBlock = false;
              }}
            />
          </div>
        </Header>
        <div
          id="content-container"
          className="flex-column"
          style={{ paddingTop: this.state.headerHeight + 'rem' }}
        >
          <div id="grid-wrapper" className="p-left p-top p-right flex-column align-stretch grow">
            <div id="countries-container">
              <TableHeader
                action={this.sortCountries}
                sortStatus={this.state.sortStatus}
              />
              {this.state.selectedCountries.map((country, index, array) => (
                <Country
                  {...country}
                  key={country.name}
                  delete={this.deleteCountry}
                  thisRow={index}
                  lastRow={array.length - 1}
                />
              ))}
            </div>
            <GridMaker />
            <div className="grow"></div>
            <Footer classes="flex-column screen-medium-flex-row justify-center align-center m-bottom-small m-top"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
