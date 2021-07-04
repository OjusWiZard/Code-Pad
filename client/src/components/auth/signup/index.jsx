/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
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
  const context = useContext(ModalContext);
  const { openModal, formMessage, errorMessage } = useContext(ModalContext);
  const [passwordType, setPasswordType] = useState("password");
  const [rePasswordType, setRePasswordType] = useState("password");
  console.log(context);
  const [arrFields, setarrFields] = useState({
    username: "",
    admission_no: "",
    full_name: "",
    contact_no: "",
    email: "",
    password: "",
    re_password: "",
  });
  const history = useHistory();

  useEffect(() => {
    setarrFields(initialState);
    for (const property in errorMessage) {
      for (const arrProperty in arrFields) {
        if (arrProperty === property) {
          setarrFields((prevArrFields) => {
            return {
              ...prevArrFields,
              [arrProperty]: errorMessage[property][0],
            };
          });
          break;
        }
      }
    }
  }, [errorMessage]);

  const initialState = {
    username: "",
    admission_no: "",
    full_name: "",
    contact_no: "",
    email: "",
    password: "",
    re_password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleAvatar = (e) => {
    setFormData({ ...formData, avatar: e.target.name });
    document
      .querySelectorAll(".avatar-container .img-fluid")
      .forEach((img) => img.classList.add("active-avatar"));
    e.target.classList.remove("active-avatar");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.re_password) {
      return signUp(formData, history, formMessage, openModal);
    }
    setarrFields(initialState);
    setarrFields((prevArrFields) => {
      return {
        ...prevArrFields,
        password: "Password and Confirm password should be same",
        re_password: "Password and Confirm password should be same",
      };
    });
  };

  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-11 mx-auto my-lg-5 content-background px-lg-5 py-lg-3 ">
              <div className="my-lg-5 px-lg-3 my-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;SIGNUP&nbsp;**
                </h4>
                <p className="font-vcr font-lightGrey text-center mt-5">
                  SELECT YOUR AVATAR
                </p>
                <div className="d-flex justify-content-between mt-3 avatar-container px-lg-5 mx-lg-5 px-3">
                  <img
                    width="60px"
                    height="60px"
                    name="1"
                    src={avatarOne}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                  />
                  <img
                    width="60px"
                    height="60px"
                    name="2"
                    src={avatarTwo}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                  />
                  <img
                    width="60px"
                    height="60px"
                    name="3"
                    src={avatarThree}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                  />
                  <img
                    width="60px"
                    height="60px"
                    name="4"
                    src={avatarFour}
                    alt=""
                    onClick={handleAvatar}
                    className="img-fluid mx-2"
                  />
                </div>
                <div className="font-vcr font-14 text-center mt-2 text-muted">
                  {errorMessage.avatar}
                </div>
                <form action="" className="mt-5 px-lg-5 mx-lg-5 px-3">
                  {Object.keys(arrFields).map(
                    (field, index) =>
                      field !== "avatar" && (
                        <div className="mt-3" key={index}>
                          <div className="input-group">
                            <div className="pixel-input-wrapper">
                              <span></span>
                              <div className="pixel-input w-100">
                                <input
                                  required
                                  onChange={handleChange}
                                  name={field}
                                  value={formData.field}
                                  type={
                                    field === "password" ? passwordType : "text"
                                  }
                                  className="font-vcr font-blue"
                                  placeholder={field}
                                />
                                {field === "password" && (
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
                                )}
                                {field === "re_password" && (
                                  <div
                                    onClick={() => {
                                      rePasswordType === "password"
                                        ? setRePasswordType("text")
                                        : setRePasswordType("password");
                                    }}
                                  >
                                    {rePasswordType === "password" ? (
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
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            id="error"
                            className="font-vcr font-14 pl-3 text-muted"
                          >
                            {arrFields[field]}
                          </div>
                        </div>
                      )
                  )}
                  <div
                    className="mt-3 text-center button-hover"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    type="submit"
                  >
                    <img src={signup} alt="signup" className="img-fluid mt-4" />
                  </div>
                </form>
                <div className="mt-3 text-center">
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
