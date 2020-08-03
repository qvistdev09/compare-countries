import React from 'react';

function InputField(props) {
  return (
    <input
      id="search-field"
      type="text"
      className={props.classes}
      placeholder="Type to add country"
      onChange={props.onChange}
      value={props.input}
    />
  );
}

export default InputField;