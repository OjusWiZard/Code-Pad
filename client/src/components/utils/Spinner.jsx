import React from "react";
import spinner from "../../images/common/loader.gif";

const Spinner = () => {
  return (
    <div
      style={{ minHeight: "100vh", textAlign: "center", lineHeight: "50vh" }}
    >
      <img src={spinner} height="20px" alt="spinner" />;
    </div>
  );
};

export default Spinner;
