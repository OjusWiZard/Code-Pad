import React, { useState, useContext } from "react";
import { resetPassword } from "../../../api/index";
import { useHistory, useParams } from "react-router-dom";
import { ModalContext } from "../../../context/context";
import Modal from "../../modal";
import Line from "../../utils/Line";

const ResetPassword = () => {
  const { openModal } = useContext(ModalContext);
  const history = useHistory();
  const [passwordType, setPasswordType] = useState("password");
  const [re_new_passwordType, setReNewPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitOnEnter = async (e) => {
    if (e.which === 13) {
      await resetPassword(formData, uid, token, history);
    }
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
    <>
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
                        <div className="pixel-input w-100 ">
                          <input
                            onChange={handleChange}
                            name="new_password"
                            value={formData.new_password}
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
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100 ">
                          <input
                            onChange={handleChange}
                            name="re_new_password"
                            onKeyPress={handleSubmitOnEnter}
                            value={formData.re_new_password}
                            type={re_new_passwordType}
                            className="font-vcr font-blue "
                            placeholder="New Password"
                          />
                          <div
                            onClick={() => {
                              re_new_passwordType === "password"
                                ? setReNewPasswordType("text")
                                : setReNewPasswordType("password");
                            }}
                          >
                            {re_new_passwordType === "password" ? (
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
                  <Line />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
