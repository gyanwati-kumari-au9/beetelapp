import React from "react";

const Footer = () => {
  return (
    <footer className="container footer">
      <div className="d-flex justify-content-between">
        <p>© Beetlehunt</p>
        <p>
          Developed by{" "}
          <a href="https://github.com/varun-hldr" className="link-light">
            Gyaan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
