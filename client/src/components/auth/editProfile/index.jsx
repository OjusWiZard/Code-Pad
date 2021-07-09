import React, { useState,useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { editUserInfo } from "../../../api";
import { ModalContext } from "../../../context/context";

// Images Imports
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import avatarThree from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";
import line from "../../../images/home/line.svg";

// Css
import "../editProfile/editProfile.css";

function EditProfile() {
  const { openModal, errorMessage, formMessage } = useContext(ModalContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    ...JSON.parse(localStorage.getItem("user")),
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
useEffect(() => {

      Array.from(document.querySelectorAll(".img-avatar"))
        .find((img) => img.name === String(formData.avatar))
        .classList.add("active-avatar")

  }, []);
  const handleAvatar = (e) => {
    setFormData({ ...formData, avatar: e.target.name });
    document
      .querySelectorAll(".avatar-container .img-fluid")
      .forEach((img) => img.classList.remove("active-avatar"));
    e.target.classList.add("active-avatar");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserInfo(formData, history, openModal, formMessage);
  };

  return (
    <>
      <div className="main-background">
        <div className="container py-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-11 mx-auto my-md-5 content-background px-lg-5">
              <div className="my-md-5 py-lg-3 px-lg-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;EDIT PROFILE&nbsp;**
                </h4>
                <div className="d-flex justify-content-center mt-5 avatar-container">
                  <img
                    name="1"
                    src={avatarOne}
                    alt="peach"
                    className="img-fluid mx-2 img-avatar"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                  />
                  <img
                    name="2"
                    src={avatarTwo}
                    alt="mario"
                    className="img-fluid mx-2 img-avatar"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                  />
                  <img
                    name="3"
                    src={avatarThree}
                    alt="pacman"
                    className="img-fluid mx-2 img-avatar"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                  />
                  <img
                    name="4"
                    src={avatarFour}
                    alt="frog"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                    className="img-fluid mx-2 img-avatar"
                  />
                </div>
                <form className="mt-5 px-lg-5 mx-lg-5">
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="name"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            className="font-vcr font-blue"
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                    {errorMessage?.username && (
                      <div
                        id="error"
                        className="font-vcr font-14 pl-3 text-muted"
                      >
                        {errorMessage.username[0]}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="text"
                            name="full_name"
                            onChange={handleChange}
                            value={formData.full_name}
                            className="font-vcr font-blue"
                            placeholder="Full name"
                          />
                        </div>
                      </div>
                    </div>
                    {errorMessage?.full_name && (
                      <div
                        id="error"
                        className="font-vcr font-14 pl-3 text-muted"
                      >
                        {errorMessage.full_name[0]}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            type="tel"
                            name="contact_no"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={handleChange}
                            value={formData.contact_no}
                            className="font-vcr font-blue"
                            placeholder="contact_no"
                          />
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
                </form>
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
                    *UPDATE*
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <img src={line} alt="signup" className="img-fluid mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
