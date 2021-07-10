import React from "react";

// Image imports
import borderBottom from "../../images/footer/borderBottom.svg";
import heart from "../../images/footer/heart.svg";

function Footer() {
  return (
    <footer>
      <div className="font-lightGrey font-vcr mt-4">
        <p className="px-3 text-center mb-0">
          MADE WITH <img src={heart} alt="heart" className="img-fluid" width="15px" height="15px"/> BY
          NIBBLE COMPUTER SOCIETY
        </p>
      </div>
      <img
        src={borderBottom}
        alt="illustration"
        className="img-fluid"
        style={{ width: "100%" }}
      />
    </footer>
  );
}

export default Footer;
