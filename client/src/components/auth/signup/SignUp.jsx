import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import avatarThree from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";
import signup from "../../../images/auth/signup.svg";
import line from "../../../images/home/line.svg";
import { signUp } from "../../../api";
import { ModalContext } from "../../../context/context";
import "./signup.css";

function SignUp() {
  const { openModal, errorMessage } = useContext(ModalContext);
  // const [a, seta] = useState(0);
  let a = 0;
  const history = useHistory();
  const arrFields = [
    "username",
    "admission_no",
    "full_name",
    "email",
    "avatar",
    "password",
    "contact_no",
    "re_password",
  ];
  const initialState = {
    username: "",
    admission_no: "",
    full_name: "",
    email: "",
    avatar: "",
    password: "",
    contact_no: "",
    re_password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleAvatar = (e) => {
    setFormData({ ...formData, avatar: e.target.name });
    document
      .querySelectorAll(".avatar-container .img-fluid")
      .forEach((img) => img.classList.remove("active-avatar"));
    e.target.classList.add("active-avatar");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.re_password) {
      signUp(formData, history, openModal);
    }
  };

  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-11 mx-auto my-lg-5 content-background px-lg-5  py-lg-3 ">
              <div className="my-lg-5 px-lg-3 my-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;SIGNUP&nbsp;**
                </h4>
                <p className="font-vcr font-lightGrey text-center mt-5">
                  SELECT YOUR AVATAR
                </p>
                <div className="d-flex justify-content-center mt-3 avatar-container">
                  <img
                    width="40px"
                    height="40px"
                    name="1"
                    src={avatarOne}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                  />
                  <img
                    width="40px"
                    height="40px"
                    name="2"
                    src={avatarTwo}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                  />
                  <img
                    width="40px"
                    height="40px"
                    name="3"
                    src={avatarThree}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                  />
                  <img
                    width="40px"
                    height="40px"
                    name="4"
                    src={avatarFour}
                    alt=""
                    onClick={handleAvatar}
                    className="img-fluid mx-2"
                  />
                </div>
                <form action="" className="mt-5 px-lg-5 mx-lg-5 px-3">
                  {arrFields.map((field) => (
                    <div className="mt-3">
                      <div className="input-group">
                        <div className="pixel-input-wrapper">
                          <span></span>
                          <div className="pixel-input w-100">
                            <input
                              required
                              onChange={handleChange}
                              name={field}
                              value={formData.field}
                              type="text"
                              className="font-vcr font-blue"
                              placeholder={field}
                            />
                          </div>
                        </div>
                      </div>
                      {Object.keys(errorMessage)[a++] === field && (
                        <div className="font-vcr font-14 pl-3 text-muted">
                          {Object.values(errorMessage)[a++]}
                          {/* {seta((prevState) => prevState + 1)} */}
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    className="mt-5 text-center button-hover"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    type="submit"
                  >
                    <img src={signup} alt="signup" className="img-fluid mt-4" />
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

export default SignUp;
