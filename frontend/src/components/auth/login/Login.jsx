import React from "react";
import logo from "../../../images/home/logo.png";
import line from "../../../images/home/line.png";
import frame from "../../../images/home/Frame.png";
import button from "../../../images/home/button.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8 col-md-10 col-sm-10 col-10 mx-auto my-5 content-background px-lg-5">
              <div className="my-5">
                <h4 className="font-vcr font-blue pt-4 text-center font-weight-bold">
                  **&nbsp;SIGNUP&nbsp;**
                </h4>
                <form action="" className="mt-5">
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mt-3">
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
