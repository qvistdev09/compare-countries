import React from 'react';

function Footer(props) {
  return (
    <footer className={props.classes}>
      <p className="footer-text">
        by Oscar Lindqvist{' '}
        <a
          href="https://qvistdev09.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          [qvistdev09]
        </a>
      </p>
      <i className="hide screen-medium-block fas fa-circle footer-icon m-left-small m-right-small"></i>
      <p className="footer-text">
        data fetched from{' '}
        <a
          href="https://restcountries.eu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          REST Countries API
        </a>
      </p>
    </footer>
  );
}

export default Footer;
