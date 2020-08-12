import React from 'react';

function SiteTitle(props) {
  return (
    <div className={props.classes}>
      <i className="fas h1-icon fa-globe-africa m-right"></i>
      <h1 className="m-right">
        {'COMPARE COUNTRIES' + (props.mobile ? ' (mobile)' : ' (desktop)')}
      </h1>
    </div>
  );
}

export default SiteTitle;
