import React from "react";
import borderBottom from "../../images/footer/borderBottom.png";
import heart from "../../images/footer/heart.png";

function Footer() {
  return (
    <div className="text-center bg-black font-lightGrey font-vcr pt-4">
      <p className="px-3">
        MADE WITH <img src={heart} alt="heart" className="img-fluid" /> BY
        NIBBLE COMPUTER SOCIETY
      </p>
      <img
        src={borderBottom}
        alt="illustration"
        className="img-fluid"
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default Footer;
