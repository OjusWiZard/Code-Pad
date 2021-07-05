import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import avatarThree from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";
import update from "../../../images/auth/update.svg";
import line from "../../../images/home/line.svg";
import { editUserInfo } from "../../../api";
import { ModalContext } from "../../../context/context";
import "../editProfile/editProfile.css";

function EditProfile() {
  const { openModal } = useContext(ModalContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    ...JSON.parse(localStorage.getItem("user")),
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAvatar = (e) => {
    setFormData({ ...formData, avatar: e.target.name });
    document
      .querySelectorAll(".avatar-container .img-fluid")
      .forEach((img) => img.classList.add("active-avatar"));
    e.target.classList.remove("active-avatar");
  };

  const handleSubmit = (e, formData, history) => {
    e.preventDefault();
    editUserInfo(formData, history, openModal);
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5">
              <div className="my-5 py-3 px-lg-3">
                <h4 className="font-vcr font-blue text-center font-weight-bold">
                  **&nbsp;EDIT PROFILE&nbsp;**
                </h4>
                <div className="d-flex justify-content-center mt-5 avatar-container">
                  <img
                    name="1"
                    src={avatarOne}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                  />
                  <img
                    name="2"
                    src={avatarTwo}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                  />
                  <img
                    name="3"
                    src={avatarThree}
                    alt=""
                    className="img-fluid mx-2"
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                  />
                  <img
                    name="4"
                    src={avatarFour}
                    alt=""
                    onClick={handleAvatar}
                    width="60px"
                    height="60px"
                    className="img-fluid mx-2"
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
                  </div>
                </form>
                <div className="mt-5 text-center button-hover">
                  <img
                    src={update}
                    onClick={(e) => handleSubmit(e, formData, history)}
                    alt="update"
                    className="img-fluid mt-4 see-all-buttons"
                  />
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

export default EditProfile;
