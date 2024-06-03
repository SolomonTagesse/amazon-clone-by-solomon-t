// src/components/Footer.js
import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Amazon Clone. Built by{" "}
          <a
            href="https://solomontagesse.github.io/solomon-tagesse-portfolio/website/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solomon Tagesse
          </a>
        </p>
        <p>Hawassa, Ethiopia</p>
      </div>
    </footer>
  );
};

export default Footer;
