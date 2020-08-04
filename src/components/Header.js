import React from 'react';

function Header(props) {
  return (
    <header className={props.classes} id="site-header">
      <div className="m-bottom">
        <i className="fas fa-globe h1-icon m-right-small"></i>
        <h1 className="m-right-small">{props.title}</h1>
        <p className="site-description">{props.description}</p>
      </div>
      {props.children}
    </header>
  );
}

export default Header;
