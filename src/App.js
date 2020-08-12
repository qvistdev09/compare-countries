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
      mobile: false,
      showMobileSortOptions: false,
      input: '',
      suggestions: [],
      cached: startingCountries,
      selectedCountries: startingCountries,
      headerHeight: 10,
      sortStatus: 'name-false',
      listView: true,
      gridSetup: [
        {
          type: 'text',
          canToggle: false,
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
          canToggle: false,
          enabled: true,
          value: 'delete',
          header: 'Delete',
          width: 'auto',
        },
      ],
    };

    this.fetchBlock = false;
    this.blurBlock = false;
    this.headerObj = null;
    this.cKeys = Object.keys(countries);
    this.mobileBreakPoint = 600;

    this.fetchCountry = this.fetchCountry.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
    this.sortCountries = this.sortCountries.bind(this);
    this.resizeAction = this.resizeAction.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.toggleShowMobileSortOptions = this.toggleShowMobileSortOptions.bind(
      this
    );
    this.selectMobileSortOption = this.selectMobileSortOption.bind(this);
  }

  selectMobileSortOption(value) {
    this.setState(
      (state) => ({
        showMobileSortOptions: false,
        sortStatus: value + '-' + state.sortStatus.split('-')[1],
      }),
      this.sortCountries()
    );
  }

  toggleViewMode() {
    this.setState((state) => ({
      listView: !state.listView,
    }));
  }

  toggleShowMobileSortOptions() {
    this.setState((state) => ({
      showMobileSortOptions: !state.showMobileSortOptions,
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
        mobile: window.screen.width < this.mobileBreakPoint || window.innerWidth < this.mobileBreakPoint ? true : false,
      },
      () => window.addEventListener('resize', this.resizeAction)
    );

    this.sortCountries();
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

  resizeAction() {
    const rem = parseInt(
      getComputedStyle(document.documentElement).fontSize.slice(0, 2)
    );
    this.setState({
      headerHeight: this.headerObj.offsetHeight / rem,
      mobile: window.innerWidth < this.mobileBreakPoint ? true : false,
    });
  }

  sortCountries(property, ascending) {
    if (arguments.length === 0) {
      property = this.state.sortStatus.split('-')[0];
      ascending = this.state.sortStatus.split('-')[1] === 'true' ? true : false;
    }

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
      this.setState((state) => ({
        cached: [
          ...state.cached,
          ...state.selectedCountries.filter(
            (country) => country.alpha2Code === code
          ),
        ],
        selectedCountries: state.selectedCountries.filter(
          (country) => country.alpha2Code !== code
        ),
      }));
    }
    // if already cached, just delete
    else {
      this.setState((state, props) => ({
        selectedCountries: state.selectedCountries.filter(
          (country) => country.alpha2Code !== code
        ),
      }));
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
        }),
        () => {
          console.log('Country collected from cache, no API call needed');
          this.sortCountries();
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
              this.sortCountries();
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
        <header id="site-header" className="p-small screen-small-p">
          <div className="flex-column screen-small-flex-row screen-small-justify-between screen-small-align-center screen-small-m-bottom">
            <SiteTitle
              classes="flex-row align-center justify-between m-bottom-small screen-small-no-m-bottom screen-small-m-left"
              mobile={this.state.mobile}
            />
            <div className="flex-row-reverse screen-small-flex-row screen-small-align-center">
              <ViewSwitch
                classes="screen-small-m-right"
                listView={this.state.listView}
                toggleView={this.toggleViewMode}
              />
              <SearchField
                classes="grow m-right-small screen-small-m-right"
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
            classes="hide screen-small-flex-row screen-small-align-center screen-small-m-left"
            gridSetup={this.state.gridSetup}
            toggle={this.toggle}
            listView={this.state.listView}
          />
        </header>
        <div
          id="content-container"
          className="flex-column"
          style={{ paddingTop: this.state.headerHeight + 'rem' }}
        >
          <div
            id="grid-wrapper"
            className="p-left-small p-top-small p-right-small screen-small-p-left screen-small-p-top screen-small-p-right flex-column align-stretch grow"
          >
            {this.state.listView ? (
              <GridMaker
                sortAction={this.sortCountries}
                deleteAction={this.deleteCountry}
                sortStatus={this.state.sortStatus}
                gridSetup={this.state.gridSetup}
                selectedCountries={this.state.selectedCountries}
                mobile={this.state.mobile}
                showMobileSortOptions={this.state.showMobileSortOptions}
                toggleShowMobileSortOptions={this.toggleShowMobileSortOptions}
                selectMobileSortOption={this.selectMobileSortOption}
              />
            ) : (
              <GraphMaker
                selectedCountries={this.state.selectedCountries}
                sortAction={this.sortCountries}
                sortStatus={this.state.sortStatus}
                deleteAction={this.deleteCountry}
                gridSetup={this.state.gridSetup}
                mobile={this.state.mobile}
                toggle={this.toggle}
              />
            )}
            <div className="grow"></div>
            <Footer classes="flex-column screen-medium-flex-row justify-center align-center m-bottom-small m-top-small" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
