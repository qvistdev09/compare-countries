import React from 'react';

class SuggestedCountries extends React.Component {
  constructor(props) {
    super(props);
    this.boldReplace = this.boldReplace.bind(this);
  }

  boldReplace(userString, suggestion) {
    const marked = suggestion.replace(
      new RegExp(userString, 'i'),
      '@' + userString + '@'
    );
    return marked.split('@').map((element) => {
      if (element === userString) {
        return (
          <strong key={suggestion}>
            {suggestion.match(new RegExp(userString, 'i'))}
          </strong>
        );
      } else {
        return element;
      }
    });
  }

  render() {
    return (
      <div
        id="suggestions-container"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        className={
          this.props.suggestions.length === 0 ? 'hidden' : this.props.classes
        }
      >
        {this.props.suggestions.slice(0, 4).map((item) => (
          <div
            className="suggestion-div flex-row justify-start align-center"
            key={item}
            onClick={() => this.props.add(item)}
          >
            <i className="fas fa-chevron-right suggestion-icon"></i>
            <p>{this.boldReplace(this.props.input, item)}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SuggestedCountries;
