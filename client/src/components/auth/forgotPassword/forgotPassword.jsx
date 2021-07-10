import React, { useState, useContext } from "react";
import { forgotPassword } from "../../../api/index";
import { useHistory } from "react-router-dom";
import { ModalContext } from "../../../context/context";

// Image Imports
import Modal from "../../modal/index";
import Line from "../../utils/Line";

const ForgotPassword = () => {
  const history = useHistory();
  const { openModal } = useContext(ModalContext);

  const [formData, setFormData] = useState({ email: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitOnEnter = async (e) => {
    if (e.which === 13) {
      await forgotPassword(formData, history, openModal);
    }
  };
  function validateEmail(email) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(String(email).toLowerCase());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || !validateEmail(formData.email)) {
      openModal("Type a valid email address");
      <Modal />;
      return;
    }
    forgotPassword(formData, history, openModal);
  };
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
                            name="email"
                            onKeyPress={handleSubmitOnEnter}
                            value={formData.email}
                            type="email"
                            className="font-vcr font-blue "
                            placeholder="Email"
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
                  <div className="mt-4">
                    {" "}
                    <Line />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
