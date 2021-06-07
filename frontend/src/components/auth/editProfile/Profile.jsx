import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import activeAvatar from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";
import update from "../../../images/auth/update.svg";
import line from "../../../images/home/line.svg";
import { editUserInfo } from "../../../api";

function EditProfile() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    ...JSON.parse(localStorage.getItem("user")),
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleAvatar = (e) => {
    setFormData({ ...formData, avatar: e.target.name });
    document
      .querySelectorAll(".avatar-container .img-fluid")
      .forEach((img) => img.classList.remove("active-avatar"));
    e.target.classList.add("active-avatar");
  };
  useEffect(() => {
    let avatars = document.querySelectorAll(".avatar-container .img-fluid");
    avatars[formData.avatar - 1].classList.add("active-avatar");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                    src={avatarOne}
                    onClick={handleAvatar}
                    alt=""
                    className="img-fluid m-2"
                  />
                  <img
                    src={avatarTwo}
                    onClick={handleAvatar}
                    alt=""
                    className="img-fluid m-2"
                  />
                  <img
                    src={activeAvatar}
                    onClick={handleAvatar}
                    alt=""
                    className="img-fluid mx-2"
                  />
                  <img
                    src={avatarFour}
                    onClick={handleAvatar}
                    alt=""
                    className="img-fluid m-2"
                  />
                </div>
                <form className="mt-5 px-lg-5 mx-lg-5">
                  <div className="mt-4">
                    <div className="input-group">
                      <div className="pixel-input-wrapper">
                        <span></span>
                        <div className="pixel-input w-100">
                          <input
                            value={formData.email}
                            type="email"
                            name="email"
                            onChange={handleChange}
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
                            type="name"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            className="font-vcr font-blue"
                            placeholder="NAME"
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
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            className="font-vcr font-blue"
                            placeholder="Leave blank if you dont want to change"
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
                            name="contact_no"
                            onChange={handleChange}
                            value={formData.contact_no}
                            className="font-vcr font-blue"
                            placeholder="CONTACT NUMBER"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-5 text-center button-hover">
                  <img
                    src={update}
                    onClick={() => editUserInfo(formData, history)}
                    alt="update"
                    className="img-fluid mt-4"
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
