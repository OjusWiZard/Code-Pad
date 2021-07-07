import React, { useState, useContext } from "react";
import { resetPassword } from "../../../api/index";
import { useHistory, useParams } from "react-router-dom";
import login from "../../../images/auth/login.svg";
import line from "../../../images/home/line.svg";
import Modal from "../../modal";
import { ModalContext } from "../../../context/context";
import "../login/login.css";

const ResetPassword = () => {
  const { openModal } = useContext(ModalContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.new_password === formData.re_new_password) {
      resetPassword(formData, uid, token, history);
    } else {
      openModal("Passwords do not match", "Okay");
      <Modal />;
    }
  };
  const params = useParams();
  const { uid, token } = params;
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
                            name="new_password"
                            value={formData.new_password}
                            type="password"
                            className="font-vcr font-blue"
                            placeholder="Password"
                            required
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
                            name="re_new_password"
                            value={formData.re_new_password}
                            type="text"
                            className="font-vcr font-blue"
                            placeholder="Re-Password"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center button-hover">
                    <div
                      onClick={handleSubmit}
                      className="img-fluid mt-4 see-all-buttons font-vcr"
                    >*CHANGE*</div>
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

export default ResetPassword;
