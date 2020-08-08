import React from 'react';
import './css/utilities.css';
import './css/style.css';
import { countries } from './Data';
import startingCountries from './StartingData';

import Footer from './components/Footer';
import GridMaker from './components/GridMaker';
import SiteTitle from './components/SiteTitle';
import SearchField from './components/SearchField';
import CheckboxMaker from './components/CheckboxMaker';
import ViewSwitch from './components/ViewSwitch';
import GraphMaker from './components/GraphMaker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      suggestions: [],
      cached: startingCountries,
      selectedCountries: startingCountries,
      headerHeight: 10,
      sortStatus: 'unsorted',
      listView: true,
      gridSetup: [
        {
          type: 'text',
          enabled: true,
          value: 'name',
          header: 'Name',
          width: '1fr',
        },
        {
          type: 'image',
          enabled: true,
          value: 'flag',
          header: 'Flag',
          width: '1fr',
        },
        {
          type: 'text',
          enabled: true,
          value: 'capital',
          header: 'Capital',
          width: '1fr',
        },
        {
          type: 'number',
          enabled: true,
          value: 'population',
          header: 'Population',
          width: '1fr',
          graph: 'relative',
          color: '#9beeff',
        },
        {
          type: 'number',
          enabled: true,
          value: 'area',
          header: 'Area',
          width: '1fr',
          graph: 'relative',
          color: '#ffd98d',
        },
        {
          type: 'text',
          enabled: true,
          value: 'demonym',
          header: 'Demonym',
          width: '1fr',
        },
        {
          type: 'number',
          enabled: true,
          value: 'gini',
          header: 'Gini',
          width: '1fr',
          graph: 'absolute',
          color: '#9cf89b',
          tooltip:
            'A measure of inequality of income or wealth, where 100% represents complete inequality and 0% complete equality.',
        },
        {
          type: 'delete',
          enabled: true,
          value: 'delete',
          header: 'Delete',
          width: '4rem',
        },
      ],
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
    this.toggle = this.toggle.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
  }

  toggleViewMode() {
    console.log('hey');
    this.setState((state) => ({
      listView: !state.listView,
    }));
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

  toggle(value) {
    const copiedGridSetup = this.state.gridSetup.map((item) => {
      if (item.value === value) {
        let copy = { ...item };
        copy.enabled = !copy.enabled;
        return copy;
      } else {
        return item;
      }
    });
    this.setState({
      gridSetup: copiedGridSetup,
    });
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
        <header id="site-header" className="p">
          <div className="flex-row justify-between align-center m-bottom">
            <SiteTitle classes="m-left flex-row align-center" />
            <div className="flex-row align-center">
              <ViewSwitch
                classes="m-right"
                listView={this.state.listView}
                toggleView={this.toggleViewMode}
              />
              <SearchField
                classes="m-right"
                suggestions={this.state.suggestions}
                onChange={this.getSuggestions}
                onBlur={() => {
                  if (!this.blurBlock) {
                    this.setState({ suggestions: [] });
                  }
                }}
                input={this.state.input}
                onMouseEnter={() => {
                  this.blurBlock = true;
                }}
                onMouseLeave={() => {
                  this.blurBlock = false;
                }}
                add={this.fetchCountry}
              />
            </div>
          </div>
          <CheckboxMaker
            classes="m-left flex-row align-center"
            gridSetup={this.state.gridSetup}
            toggle={this.toggle}
          />
        </header>
        <div
          id="content-container"
          className="flex-column"
          style={{ paddingTop: this.state.headerHeight + 'rem' }}
        >
          <div
            id="grid-wrapper"
            className="p-left p-top p-right flex-column align-stretch grow"
          >
            {this.state.listView ? (
              <GridMaker
                sortAction={this.sortCountries}
                deleteAction={this.deleteCountry}
                sortStatus={this.state.sortStatus}
                gridSetup={this.state.gridSetup}
                selectedCountries={this.state.selectedCountries}
              />
            ) : (
              <GraphMaker
                selectedCountries={this.state.selectedCountries}
                sortAction={this.sortCountries}
                sortStatus={this.state.sortStatus}
                deleteAction={this.deleteCountry}
                gridSetup={this.state.gridSetup}
              />
            )}
            <div className="grow"></div>
            <Footer classes="flex-column screen-medium-flex-row justify-center align-center m-bottom-small m-top" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
