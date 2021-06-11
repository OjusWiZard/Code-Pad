import React, { useEffect, useState } from "react";
import pointerLeft from "../../images/eventDetails/pointer-left.svg";
import dash from "../../images/eventDetails/dash.svg";
import "./eventDetails.css";
import avatarOne from "../../images/auth/frog.svg";
import line from "../../images/eventDetails/line.svg";
import heart from "../../images/footer/heart.svg";
import folder from "../../images/eventDetails/folder.svg";
import { getEvent } from "../../api/index";
import frame from "../../images/eventDetails/frame-details.svg";
import { useParams, Redirect } from "react-router-dom";
function EventDetails() {
  const params = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    getEvent(params.slug)
      .then((data) => {
        setEvent(data);
      })
      .catch(() => {
        <Redirect to="/" />;
      });
  }, [params.slug]);

  const [active, setActive] = useState("about");

  useEffect(() => {
    getEvent(params.slug).then((data) => {
      setEvent(data);
    });
  }, [params.slug]);
  const removeClass = (e) => {
    document
      .querySelectorAll("li")
      .forEach((link) => link.classList.remove("active"));
  };
  console.log(event);
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-5">
          <div className="row">
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5">
              <div className="my-5 py-3 px-lg-3">
                <div className="d-flex mainContainer font-vcr font-lightGrey text-center justify-content-between mt-5">
                  <div style={{ textAlign: "left" }}>
                    <img src={pointerLeft} alt="left-pointer" /> Exit
                    <div className="d-flex codewars mt-5 pt-2 pb-5">
                      <div className="dash">
                        <img src={dash} alt="dash" className="img-fluid mt-3" />
                      </div>
                      <div className="codewar-title d-flex">
                        <div className="main d-flex px-1 justify-content-between">
                          <img
                            src={folder}
                            alt="folder"
                            className="img-fluid mt-3"
                          />
                          <span className="codewars-span font-vcr font-16 mt-3 font-blue">
                            CODEWARS
                          </span>
                        </div>
                        <li
                          className="active"
                          onClick={(e) => {
                            setActive("about");
                            removeClass(e);
                            e.target.classList.add("active");
                          }}
                        >
                          # about
                        </li>
                        <li
                          onClick={(e) => {
                            setActive("rules");
                            removeClass(e);
                            e.target.classList.add("active");
                          }}
                        >
                          # rules
                        </li>
                        <li
                          onClick={(e) => {
                            setActive("leaderboard");
                            removeClass(e);
                            e.target.classList.add("active");
                          }}
                        >
                          # leaderboard
                        </li>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 0.95 }}>
                    *&nbsp;Dashboard&nbsp;*
                    <div className="rules mt-5 pt-2 pb-5 py-2 px-2">
                      {active === "about" && (
                        <div className="about__section m-2">
                          <div className="about__header d-flex align-items-center">
                            <img src={frame} alt="frame" />
                            <div className="about__header__content">
                              <div className="mx-3">
                                <span className="font-blue font-vcr font-18">
                                  {event?.title}{" "}
                                </span>
                                <br />
                                <img src={heart} alt="heart" />{" "}
                                <img src={heart} alt="heart" /> <br />
                                END ON 10 JAN 00
                              </div>
                            </div>
                          </div>
                          <div className="about__content mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quod id natus amet et ipsa eos dolor provident
                            quam adipisci voluptates?
                          </div>
                        </div>
                      )}
                      {active === "leaderboard" && (
                        <>
                          <div className="font-blue font-vcr font-18 mt-3">
                            #LEADERBOARD
                          </div>
                          <div
                            className=" d-flex mt-3"
                            style={{ flexDirection: "column" }}
                          >
                            <div
                              className=" d-flex leadeboard-leads justify-content-around"
                              style={{ textAlign: "center" }}
                            >
                              <span style={{ flex: 0.2 }}>Rank</span>
                              <span style={{ flex: 0.6 }}> Name</span>
                              <span style={{ flex: 0.2 }}>Score</span>
                            </div>
                            <div className="user-data d-flex justify-content-around leaderboard-bg">
                              <span className="user-rank" style={{ flex: 0.2 }}>
                                1
                              </span>
                              <div
                                style={{ flex: 0.6 }}
                                className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                              >
                                <img
                                  src={avatarOne}
                                  className="user-image"
                                  alt="avatar"
                                />
                                <span className="user-name">Mr Mooh</span>
                              </div>
                              <span
                                className="user-score"
                                style={{ flex: 0.2 }}
                              >
                                69
                              </span>
                            </div>{" "}
                            <div className="user-data d-flex justify-content-around leaderboard-bg">
                              <span className="user-rank" style={{ flex: 0.2 }}>
                                2
                              </span>
                              <div
                                style={{ flex: 0.6 }}
                                className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                              >
                                <img
                                  src={avatarOne}
                                  className="user-image"
                                  alt="avatar"
                                />
                                <span className="user-name">
                                  Mr Rollercoaster
                                </span>
                              </div>
                              <span
                                className="user-score"
                                style={{ flex: 0.2 }}
                              >
                                69
                              </span>
                            </div>
                            <div className="user-data d-flex justify-content-around leaderboard-bg">
                              <span className="user-rank" style={{ flex: 0.2 }}>
                                3
                              </span>
                              <div
                                style={{ flex: 0.6 }}
                                className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                              >
                                <img
                                  src={avatarOne}
                                  className="user-image"
                                  alt="avatar"
                                />
                                <span className="user-name">
                                  Mr Rollercoaster
                                </span>
                              </div>
                              <span
                                className="user-score"
                                style={{ flex: 0.2 }}
                              >
                                69
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {active === "rules" && (
                        <>
                          <li>
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                            amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                            amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                            amet.
                          </li>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pt-5"></div>
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

export default EventDetails;
