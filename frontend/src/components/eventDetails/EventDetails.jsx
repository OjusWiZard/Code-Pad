import React from "react";
import pointerLeft from "../../images/eventDetails/pointer-left.svg";
import dash from "../../images/eventDetails/dash.svg";
import "./eventDetails.css";
import line from "../../images/eventDetails/line.svg";
import folder from "../../images/eventDetails/folder.svg";
import vertical from "../../images/eventDetails/line-vertical.svg";

function EventDetails() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row">
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5">
              <div className="my-5 py-3 px-lg-3">
                <div className="d-flex font-vcr font-lightGrey text-center justify-content-between mt-5">
                  <div style={{ textAlign: "left" }}>
                    <img src={pointerLeft} alt="left-pointer" /> Exit
                    <div className="d-flex codewars mt-5 pt-2 pb-5">
                      <div className="dash">
                        <img src={dash} alt="dash" className="img-fluid mt-3"    />
                      </div>
                      <div className="codewar-title d-flex">
                        <div className="main d-flex px-1 justify-content-between">
                          <img
                            src={folder}
                            alt="folder"
                            className="img-fluid mt-3"
                          />
                          <span className="codewars-span font-vcr font-16 mt-3 font-blue">
                            CODEWARS
                          </span>
                        </div>
                        <li># A</li>
                        <li># B</li>
                        <li># C</li>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 0.95 }}>
                    *&nbsp;Dashboard&nbsp;*
                    <div className="rules mt-5 pt-2 pb-5 px-lg-4">
                      <div className="font-blue font-vcr font-18 mt-3">
                        #RULES
                      </div>
                      <li>
                        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                      </li>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pt-5"></div>
                <div className="mt-4 text-center">
                  <img src={line} alt="signup" className="img-fluid mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventDetails;
