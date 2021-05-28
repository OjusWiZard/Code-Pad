import React from "react";
import signup from "../../../images/auth/signup.png";
import line from '../../../images/home/line.png'
import { Link } from "react-router-dom";

function Login() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-10 col-10 mx-auto my-5 content-background px-lg-5">
              <div className="my-5 py-3 px-lg-3">                
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;LOGIN&nbsp;**
                </h4>                
                <form action="" className="mt-5 px-lg-5 mx-lg-5">
                  <div className="mt-4">
                    <input
                      type="text"
                      className="form-control font-vcr font-blue"
                      placeholder="EMAIL"
                    />
                  </div>                  
                  <div className="mt-4">
                    <input
                      type="text"
                      className="form-control font-vcr font-blue"
                      placeholder="PASSWORD"
                    />
                  </div>
                  <div className="d-flex justify-content-end font-vcr font-lightGrey mt-3">
                    FORGOT PASSWORD?  
                  </div>             
                </form>
                <div className="mt-5 text-center">
                <img src={signup} alt="signup" className="img-fluid mt-4" />
                </div> 
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

export default Login;
