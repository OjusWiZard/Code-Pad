import React from "react";
import Router from "./Router";


function App() {
  return (
    <div className="App">
      <div className="scan-lines">
        <div></div>
      </div>
      {/* <div className="dots">
        <div className="dot-left-1"></div>
        <div className="dot-left-2"></div>
        <div className="dot-left-3"></div>
        <div className="dot-left-4"></div>
        <div className="dot-left-5"></div>
        <div className="dot-right-1"></div>
        <div className="dot-right-2"></div>
        <div className="dot-right-3"></div>
        <div className="dot-right-4"></div>
        <div className="dot-right-5"></div>
      </div> */}
      <Router />
    </div>
  );
}

export default App;
