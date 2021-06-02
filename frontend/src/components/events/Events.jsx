import React from "react";
import frame from "../../images/events/Frame.svg";
import logo from "../../images/events/event_logo.svg";
import line from "../../images/home/line.png";
import { Link } from "react-router-dom";
import "./events.css";

function Events() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container pt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-8 col-sm-11 col-11 mx-auto my-5 content-background px-5 pb-5">
              <div className="d-flex justify-content-center pt-5">
                <img src={logo} alt="" className="img-fluid" />
              </div>
              <h4
                className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold"
                id="ongoing"
              >
                &lt;&lt;&nbsp;&nbsp;ONGOING EVENTS&nbsp;&nbsp;&gt;&gt;
              </h4>
              <div className="row d-flex justify-content-center mt-3">
                <Link
                  to="/events/1"
                  className="button-hover link col-lg-4 col-md-4 col-sm-12 col-12 mt-3"
                >
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center pt-5">
                <img src={line} alt="" className="img-fluid" />
              </div>
              <h4
                className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold"
                id="ongoing"
              >
                &lt;&lt;&nbsp;&nbsp;UPCOMING EVENTS&nbsp;&nbsp;&gt;&gt;
              </h4>
              <div className="row d-flex justify-content-center mt-3">
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center pt-5">
                <img src={line} alt="" className="img-fluid" />
              </div>
              <h4
                className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold"
                id="ongoing"
              >
                &lt;&lt;&nbsp;&nbsp;PAST EVENTS&nbsp;&nbsp;&gt;&gt;
              </h4>
              <div className="row d-flex justify-content-center mt-3">
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                  <div className="text-center">
                    <img src={frame} alt="" className="img-fluid frame" />
                    <div className="text-center pt-3">
                      <span className="font-vcr font-blue">CODEWARS</span>
                      <p className="date pt-1 font-robot">
                        ENDS ON 10-JAN-2018
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Events;
