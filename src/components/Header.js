import React from 'react';

function Header(props) {
  return (
    <header className={props.classes} id="site-header">
      <div className="flex-row align-center m-bottom">
        <i className="fas fa-globe-europe h1-icon m-right-small"></i>
        <div>
          <h1 className="m-bottom-small">{props.title}</h1>
          <p>{props.description}</p>
        </div>
      </div>
      {props.children}
    </header>
  );
}

export default Header;
