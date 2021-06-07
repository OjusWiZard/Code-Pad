import React from "react";
import borderBottom from "../../images/footer/borderBottom.svg";
import heart from "../../images/footer/heart.svg";

function Footer() {
  return (
    <>
      <div className="text-center font-lightGrey font-vcr pt-4">
        <p className="px-3 text-center">
          MADE WITH <img src={heart} alt="heart" className="img-fluid" /> BY
          NIBBLE COMPUTER SOCIETY
        </p>
      </div>
      <img
        src={borderBottom}
        alt="illustration"
        className="img-fluid"
        style={{ width: "100%" }}
      />
    </>
  );
}

export default Footer;
