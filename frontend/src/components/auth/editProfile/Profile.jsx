import React from "react";
import avatarOne from "../../../images/auth/peach.svg";
import avatarTwo from "../../../images/auth/mario.svg";
import activeAvatar from "../../../images/auth/pacman.svg";
import avatarFour from "../../../images/auth/frog.svg";
import update from "../../../images/auth/update.svg";
import line from "../../../images/home/line.svg";

function EditProfile() {
  const handleAvatar = (e) => {
    // setFormData({ ...formData, avatar: e.target.name });
    document
      .querySelectorAll(".avatar-container .img-fluid")
      .forEach((img) => img.classList.remove("active-avatar"));
    e.target.classList.add("active-avatar");
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
                            type="email"
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
                            className="font-vcr font-blue"
                            placeholder="PASSWORD"
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
                            className="font-vcr font-blue"
                            placeholder="CONTACT NUMBER"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-5 text-center button-hover">
                  <img src={update} alt="update" className="img-fluid mt-4" />
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
