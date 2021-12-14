import React from "react";

// Image imports
import footer from "../../images/footer/footer.svg";

function Footer() {
  return (
    <footer>
      <img
        src={footer}
        alt="Footer"
        className="img-fluid"
        style={{ width: "100%" }}
      />
    </footer>
  );
}

export default Footer;
