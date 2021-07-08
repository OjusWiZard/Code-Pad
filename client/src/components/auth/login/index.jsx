import React, { useState, useContext } from "react";
import { signIn } from "../../../api/index";
import { useHistory, Link } from "react-router-dom";
import line from "../../../images/home/line.svg";
import { ModalContext } from "../../../context/context";
import "./login.css";

function Login() {
  const { openModal, formMessage, errorMessage } = useContext(ModalContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const handleSubmitOnEnter = async (e) => {
    if (e.which === 13) {
      await signIn(formData, history, formMessage, openModal);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(formData, history, formMessage, openModal);
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-sm-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-10 col-sm-11 col-11 mx-auto my-md-5 content-background px-sm-5">
              <div className="my-md-5 py-md-3 px-lg-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;LOGIN&nbsp;**
                </h4>
                <form className="mt-5 px-lg-5 mx-lg-5" onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                            type="email"
                            className="font-vcr font-blue"
                            placeholder="EMAIL"
                          />
                        </div>
                      </div>
                    </div>
                    {errorMessage?.email && (
                      <div
                        id="error"
                        className="font-vcr font-14 pl-3 text-muted"
                      >
                        {errorMessage.email[0]}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100 ">
                          <input
                            onChange={handleChange}
                            name="password"
                            onKeyPress={handleSubmitOnEnter}
                            value={formData.password}
                            type={passwordType}
                            className="font-vcr font-blue "
                            placeholder="PASSWORD"
                          />
                          <div
                            onClick={() => {
                              passwordType === "password"
                                ? setPasswordType("text")
                                : setPasswordType("password");
                            }}
                          >
                            {passwordType === "password" ? (
                              <i
                                className="fas fa-eye font-blue"
                                style={{ marginTop: "0.6rem" }}
                              />
                            ) : (
                              <i
                                className="fas fa-eye-slash font-blue"
                                style={{ marginTop: "0.6rem" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {errorMessage?.password && (
                      <div
                        id="error"
                        className="font-vcr font-14 pl-3 text-muted"
                      >
                        {errorMessage.password[0]}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/forgot-password"
                    className="d-flex justify-content-end font-vcr font-lightGrey mt-3"
                  >
                    FORGOT PASSWORD?
                  </Link>
                  {errorMessage?.detail && (
                    <div
                      id="error"
                      className="font-vcr font-14 text-center mt-4 text-muted"
                    >
                      {errorMessage.detail}
                    </div>
                  )}
                  <div className="mt-5 text-center button-hover">
                    <div
                      onClick={handleSubmit}
                      className="mt-4 see-all-buttons font-vcr px-5 pt-2 pb-3 text-black"
                    >
                      *LOGIN*
                    </div>
                  </div>
                </form>
                <div className="mt-4 text-center font-robot font-lightGrey">
                  Not yet registered? <Link to="/signup" className="font-blue font-weight-bold">Signup</Link>
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
