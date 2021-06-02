import React from "react";
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import avatarThree from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";
import signup from "../../../images/auth/signup.svg";
import line from "../../../images/home/line.svg";
import "./signup.css";
function SignUp() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5">
              <div className="my-5 py-3 px-lg-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;SIGNUP&nbsp;**
                </h4>
                <p className="font-vcr font-lightGrey text-center mt-5">
                  SELECT YOUR AVATAR
                </p>
                <div className="d-flex justify-content-center mt-3 avatar-container">
                  <img src={avatarOne} alt="" className="img-fluid mx-2" />
                  <img src={avatarTwo} alt="" className="img-fluid mx-2" />
                  <img src={avatarThree} alt="" className="img-fluid mx-2" />
                  <img src={avatarFour} alt="" className="img-fluid mx-2" />
                </div>
                <form action="" className="mt-5 px-lg-5 mx-lg-5 px-3">
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="text"
                            className="font-vcr font-blue"
                            placeholder="EMAIL"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="text"
                            className="font-vcr font-blue"
                            placeholder="NAME"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="password"
                            className="font-vcr font-blue"
                            placeholder="PASSWORD"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="password"
                            className="font-vcr font-blue"
                            placeholder="CONFIRM PASSWORD"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="text"
                            className="font-vcr font-blue"
                            placeholder="ADMISSION NUMBER"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="text"
                            className="font-vcr font-blue"
                            placeholder="CONTACT NUMBER"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-5 text-center button-hover">
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

export default SignUp;
