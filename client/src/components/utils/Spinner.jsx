import React from "react";
import spinner from "../../images/common/loader.gif";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
     <img src={spinner} height="20px" alt="spinner"/>
    </div>
  );
};

export default Spinner;
