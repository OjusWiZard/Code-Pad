import React, { useState, useContext } from "react";
import { forgotPassword } from "../../../api/index";
import { useHistory } from "react-router-dom";
import login from "../../../images/auth/login.svg";
import Modal from "../../modal/index";
import line from "../../../images/home/line.svg";
import { ModalContext } from "../../../context/context";
import "../login/login.css";
const ForgotPassword = () => {
  const history = useHistory();
  const { openModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({ email: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "") {
      openModal("Email? -_-");
      <Modal />;
      return;
    }
    forgotPassword(formData, history, openModal);
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-sm-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-10 col-sm-11 col-11 mx-auto my-md-5 content-background px-sm-5">
              <div className="my-md-5 py-md-3 px-lg-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;-_- Forgot Password? &nbsp;**
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
                            placeholder="Email -_-"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center button-hover">
                    <div
                      onClick={handleSubmit}
                      className="mt-4 see-all-buttons font-vcr px-5 pt-2 pb-3 text-black"
                    >
                      *CHANGE*
                    </div>
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
};

export default ForgotPassword;
