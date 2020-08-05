import React from 'react';

function Header(props) {
  return (
    <header className={props.classes} id="site-header">
      <div className="m-left-small flex-row align-center">
        <i className="fas h1-icon fa-globe-africa m-right"></i>
        <h1 className="m-right">{props.title}</h1>
      </div>
      {props.children}
    </header>
  );
}

export default Header;
