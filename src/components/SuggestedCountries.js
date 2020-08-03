import React from 'react';

function SuggestedCountries(props) {
  return (
    <div
      id="suggestions-container"
      className={props.suggestions.length === 0 ? 'hidden' : props.classes}
    >
      {props.suggestions.slice(0, 4).map((item) => (
        <div className="flex-row justify-between" key={item}>
          <p>
            <strong>{item.slice(0, props.input.length)}</strong>
            {item.slice(props.input.length)}
          </p>
          <button onClick={() => props.add(item)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SuggestedCountries;
