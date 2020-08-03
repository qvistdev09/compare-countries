import React from 'react';

function SuggestedCountries(props) {
  return (
    <div
      id="suggestions-container"
      className={props.suggestions.length === 0 ? 'hidden' : props.classes}
    >
      {props.suggestions.slice(0, 4).map((item) => (
        <div className="flex-row justify-between" key={item}>
          <p>{item}</p>
          <button onClick={() => props.add(item)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SuggestedCountries;
