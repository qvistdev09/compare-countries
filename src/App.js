import React from 'react';
import './css/utilities.css';
import './css/style.css';
import { shortened, fullName } from './CountryCodes';
import Country from './components/Country';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'No message loaded',
      input: 'Type here',
      suggestions: [],
      cached: [],
      selectedCountries: [],
    };

    this.fetchCountry = this.fetchCountry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
  }

  deleteCountry(code) {
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
    } else {
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
    if (
      this.state.selectedCountries.some(
        (country) => country.alpha2Code === string
      )
    ) {
      alert('Country already selected');
      return;
    }

    fetch('https://restcountries.eu/rest/v2/alpha/' + string)
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
          }),
          () => console.log('An API call was made')
        );
      })
      .catch((error) => console.log('Could not get data'));
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  getSuggestions(event) {
    this.setState({ input: event.target.value }, () => {
      if (this.state.input === '') {
        this.setState({ suggestions: [] });
        return;
      }
      const regex = RegExp('^' + this.state.input, 'i');
      this.setState({
        suggestions: fullName.filter((item) => regex.test(item)),
      });
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.getSuggestions}
          value={this.state.input}
        />
        {this.state.suggestions.slice(0, 4).map((item) => (
          <p
            key={item}
            onClick={() => this.fetchCountry(shortened[fullName.indexOf(item)])}
          >
            {item}
          </p>
        ))}
        {this.state.selectedCountries.map((country) => (
          <Country
            {...country}
            key={country.name}
            delete={this.deleteCountry}
          />
        ))}
      </div>
    );
  }
}

export default App;
