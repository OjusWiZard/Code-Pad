import React from "react";
import frame from "../../images/events/Frame.png";
import logo from "../../images/events/event_logo.png";
import line from "../../images/home/line.png";
import { Link } from "react-router-dom";
import "./events.css";

function Events() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container pt-5">
          <div className="row pt-5">
            <div className="col-lg-8 col-md-8 col-sm-10 col-10 mx-auto my-5 content-background px-5">
              <div className="d-flex justify-content-center pt-5">
                <img src={logo} alt="" className="img-fluid" />
              </div>
              <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold" id="ongoing">
                &lt;&lt;&nbsp;&nbsp;ONGOING EVENTS&nbsp;&nbsp;&gt;&gt;
              </h4>
              <div className="d-flex justify-content-around pt-5 mt-5">
                <span className="d-flex flex-column frame-container">
                  <img src={frame} alt="" className="img-fluid frame" />
                  <div className="text-center pt-3">
                    <span className="font-vcr font-blue">CODEWARS</span>
                    <p className="date font-robot pt-1">ENDS ON 10-JAN-2018</p>
                  </div>
                </span>
                <span className="d-flex flex-column frame-container">
                  <img src={frame} alt="" className="img-fluid frame" />
                  <div className="text-center pt-3">
                    <span className="font-vcr font-blue">CODEWARS</span>
                    <p className="date font-robot pt-1">ENDS ON 10-JAN-2018</p>
                  </div>
                </span>
                <span className="d-flex flex-column frame-container">
                  <img src={frame} alt="" className="img-fluid frame" />
                  <div className="text-center pt-3">
                    <span className="font-vcr font-blue">CODEWARS</span>
                    <p className="date font-robot pt-1">ENDS ON 10-JAN-2018</p>
                  </div>
                </span>
              </div>
              <div className="d-flex justify-content-center pt-5">
                <img src={line} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Events;
