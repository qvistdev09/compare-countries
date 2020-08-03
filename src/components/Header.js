import React from 'react';

function Header(props) {
  return (
    <header className={props.classes}>
      <h1 className="m-bottom-small">{props.title}</h1>
      <p>{props.description}</p>
    </header>
  );
}

export default Header;
