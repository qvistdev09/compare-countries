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
      selectedCountries: [],
    };

    this.fetchCountry = this.fetchCountry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  fetchCountry(string) {
    fetch('https://restcountries.eu/rest/v2/alpha/' + string)
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          (state, props) => ({
            selectedCountries: [
              ...state.selectedCountries,
              {
                name: data.name,
                population: data.population,
                capital: data.capital,
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
          <Country {...country} key={country.name} />
        ))}
      </div>
    );
  }
}

export default App;
