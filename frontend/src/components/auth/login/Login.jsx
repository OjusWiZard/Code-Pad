import React, { useState, useContext } from "react";
import { signIn } from "../../../api/index";
import { useHistory } from "react-router-dom";
import login from "../../../images/auth/login.svg";
import line from "../../../images/home/line.svg";
import { ModalContext } from "../../../context/context";
import "./login.css";

function Login() {
  const { openModal } = useContext(ModalContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(formData, history, openModal);
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5">
              <div className="my-5 py-3 px-lg-3">
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
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            type="password"
                            className="font-vcr font-blue"
                            placeholder="PASSWORD"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end font-vcr font-lightGrey mt-3">
                    FORGOT PASSWORD?
                  </div>
                  <div className="mt-5 text-center button-hover">
                  <img
                    src={login}
                    onClick={handleSubmit}
                    alt="signup"
                    className="img-fluid mt-4"
                  />
                </div>
                </form>                
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
