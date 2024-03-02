import React from 'react';
import '../css/Footer.css'; // Create a CSS file for styling (Footer.css)

const FooterComponent = () => {
  return (
    <div className="footer" style={{position : 'fixed', bottom : 0, width : '100vw'}}>
      <p className="centered-text">2024 Grind Starts</p>
    </div>
  );
};

export default FooterComponent;