import React from "react";
import { Link } from "react-router-dom";

function Default() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-11 col-11 mx-auto my-lg-5 content-background px-lg-5 py-lg-3 ">
              <div className="my-lg-5 px-lg-3 my-3">
                <h1 className="font-vcr font-weight-bold text-center font-blue display-1">
                  404
                </h1>
                <h4 className="font-blue font-vcr mt-3 text-center">
                  Are you lost babygirl?
                </h4>
                <div className="mt-5 text-center button-hover">
                  <Link to="/">
                    <div className="mt-4 see-all-buttons font-vcr px-5 pt-2 pb-3 text-black">
                      *HOME*
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Default;
