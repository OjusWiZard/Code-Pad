/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { signUp } from "../../../api";
import { ModalContext } from "../../../context/context";

// Image Imports
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import avatarThree from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";

// CSS imports
import "./signup.css";
import Line from "../../utils/Line";

function SignUp() {
  const { openModal, formMessage, errorMessage, clearErrors } =
    useContext(ModalContext);
  const [passwordType, setPasswordType] = useState("password");
  const [rePasswordType, setRePasswordType] = useState("password");
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
    clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      .forEach((img) => img.classList.remove("active-avatar"));
    e.target.classList.add("active-avatar");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitOnEnter = async (e) => {
    if (e.which === 13 && e.target.name === "re_password") {
      await signUp(formData, history, formMessage, openModal);
    }
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
    <>
      <div className="main-background">
        <div className="container py-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-11 col-11 mx-auto my-lg-5 content-background px-lg-5 py-lg-3 ">
              <div className="my-lg-5 px-lg-3 my-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;SIGNUP&nbsp;**
                </h4>
                <p className="font-vcr font-lightGrey text-center mt-5">
                  SELECT YOUR AVATAR
                </p>
                <div
                  id="avatar-sign-up"
                  className="d-flex justify-content-center mt-3 avatar-container px-lg-5 mx-lg-5 px-3"
                >
                  <img
                    width="60px"
                    height="60px"
                    name="1"
                    src={avatarOne}
                    alt="Peach"
                    className="img-fluid mx-2 active-avatar"
                    onClick={handleAvatar}
                  />
                  <img
                    width="60px"
                    height="60px"
                    name="2"
                    src={avatarTwo}
                    alt="Mario"
                    className="img-fluid mx-2 active-avatar"
                    onClick={handleAvatar}
                  />
                  <img
                    width="60px"
                    height="60px"
                    name="3"
                    src={avatarThree}
                    alt="Pacman"
                    className="img-fluid mx-2 active-avatar"
                    onClick={handleAvatar}
                  />
                  <img
                    width="60px"
                    height="60px"
                    name="4"
                    src={avatarFour}
                    alt="Frog"
                    onClick={handleAvatar}
                    className="img-fluid mx-2 active-avatar"
                  />
                </div>
                <div className="font-vcr font-14 text-center mt-2 text-muted">
                  {errorMessage.avatar}
                </div>
                <form action="" className="mt-5 px-lg-5 mx-lg-5 px-3">
                  {Object.keys(arrFields).map(
                    (field, index) =>
                      field !== "avatar" && (
                        <div className="mt-4" key={index}>
                          <div className="input-group">
                            <div className="pixel-input-wrapper">
                              <span></span>
                              <div className="pixel-input w-100">
                                {field !== "re_password" && (
                                  <input
                                    required
                                    onChange={handleChange}
                                    name={field}
                                    value={formData.field}
                                    onKeyPress={handleSubmitOnEnter}
                                    type={
                                      field === "password"
                                        ? passwordType
                                        : "text"
                                    }
                                    className="font-vcr font-blue"
                                    placeholder={field}
                                  />
                                )}
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
                                  <>
                                    <input
                                      required
                                      onChange={handleChange}
                                      name={field}
                                      value={formData.field}
                                      onKeyPress={handleSubmitOnEnter}
                                      type={rePasswordType}
                                      className="font-vcr font-blue"
                                      placeholder={field}
                                    />
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
                                  </>
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
                  <div className="mt-5 text-center button-hover">
                    <div
                      onClick={handleSubmit}
                      className="mt-4 see-all-buttons font-vcr px-5 pt-2 pb-3 text-black"
                    >
                      *SIGNUP*
                    </div>
                  </div>
                </form>
                <div className="mt-4 text-center font-robot font-lightGrey">
                  Already have an account?{" "}
                  <Link to="/login" className="font-blue font-weight-bold">
                    Login
                  </Link>
                </div>
                <div className="mt-3 text-center">
                  <Line />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
