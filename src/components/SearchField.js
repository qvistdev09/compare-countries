import React from 'react';

class SearchField extends React.Component {
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
      <div id="input-area" className={this.props.classes}>
        <input
          id="search-field"
          type="text"
          autoComplete="off"
          className={
            'country-search-field' +
            (this.props.suggestions.length > 0 ? ' showing-suggestions' : '') +
            (this.props.connectionFail ? ' connection-fail' : '')
          }
          placeholder={this.props.placeholderMessage(this.props.connectionFail)}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onClick={this.props.onChange}
          value={this.props.input}
        />
        <div
          id="suggestions-container"
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          className={
            this.props.suggestions.length === 0 ? 'hidden' : 'flex-column'
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
      </div>
    );
  }
}

export default SearchField;
