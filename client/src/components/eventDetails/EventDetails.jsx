import React, { useEffect, useState } from "react";
import pointerLeft from "../../images/eventDetails/pointer-left.svg";
import dash from "../../images/eventDetails/dash.svg";
import "./eventDetails.css";
import avatar1 from "../../images/auth/frog.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/peach.svg";
import avatar4 from "../../images/auth/pacman.svg";
import line from "../../images/eventDetails/line.svg";
import heart from "../../images/footer/heart.svg";
import folder from "../../images/eventDetails/folder.svg";
import { getEvent, getLeaderboard, getLeaderboardUser } from "../../api/index";
import { useParams, Redirect, Link } from "react-router-dom";
import moment from "moment";
function EventDetails() {
  const params = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});
  const avatarData = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4,
  };
  useEffect(() => {
    getEvent(params.slug).then((data) => {
      setEvent(data);
      getLeaderboard(params.slug).then((data) => {
        setLeaderboard(data);
        getLeaderboardUser(
          params.slug,
          JSON.parse(localStorage.getItem("user"))?.username
        ).then((data) => {
          console.log(data);
          setUser(data);
        });
      });
    });
    getLeaderboard(params.slug)
      .then((data) => {
        setLeaderboard(data);
      })
      .catch((err) => {
        console.log("Leaderboard Error: ", err);
      });
    if (localStorage.getItem("user")) {
      getLeaderboardUser(
        params.slug,
        JSON.parse(localStorage.getItem("user"))?.username
      )
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          <Redirect to="/" />;
        });
    }
  }, [params.slug]);

  const [active, setActive] = useState("about");
  console.log(params.slug);
  const removeClass = (e) => {
    document
      .querySelectorAll("li")
      .forEach((link) => link.classList.remove("active-event"));
  };
  console.log(
    user,
    leaderboard,
    JSON.parse(localStorage.getItem("user"))?.username
  );
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-lg-5">
          <div className="row">
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-lg-5 content-background px-lg-5">
              <div className="my-lg-5 py-lg-3 px-lg-3">
                <div className="d-flex mainContainer font-vcr font-lightGrey text-center justify-content-between mt-lg-5">
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
                          className="active-event"
                          onClick={(e) => {
                            setActive("about");
                            removeClass(e);
                            e.target.classList.add("active-event");
                          }}
                        >
                          # about
                        </li>
                        <li
                          onClick={(e) => {
                            setActive("rules");
                            removeClass(e);
                            e.target.classList.add("active-event");
                          }}
                        >
                          # rules
                        </li>
                        <li
                          onClick={(e) => {
                            setActive("leaderboard");
                            removeClass(e);
                            e.target.classList.add("active-event");
                          }}
                        >
                          # leaderboard
                        </li>
                        <li
                          onClick={(e) => {
                            setActive("problems");
                            removeClass(e);
                            e.target.classList.add("active-event");
                          }}
                        >
                          # problems
                        </li>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 0.95 }}>
                    <div className="dashboard-header">
                      <div className="dashboard">*&nbsp;Dashboard&nbsp;*</div>
                      <div className="score">
                        {user ? `${user?.score}` : `0`}
                      </div>
                    </div>
                    <div className="rules mt-5 pt-2 pb-5 py-2 px-2">
                      {active === "about" && (
                        <div className="about__section m-2">
                          <div className="about__header d-flex align-items-center">
                            <img
                              src={event?.icon}
                              alt="frame"
                              className="event-icon"
                            />
                            <div className="about__header__content">
                              <div className="mx-3">
                                <span className="font-blue font-vcr font-18">
                                  {event?.title}{" "}
                                </span>
                                <br />
                                <img src={heart} alt="heart" />{" "}
                                <img src={heart} alt="heart" /> <br />
                                {moment(event?.datetime).format("MMMM Do YYYY")}
                              </div>
                            </div>
                          </div>
                          <div className="about__content mt-3">
                            {event?.description}
                          </div>
                        </div>
                      )}
                      {active === "problems" && (
                        <>
                          <div className="font-blue font-vcr font-18 mt-3">
                            #PROBLEMS
                          </div>
                          <div
                            className=" d-flex mt-3"
                            style={{ flexDirection: "column" }}
                          >
                            <div className=" d-flex leadeboard-leads justify-content-between">
                              <span>Name</span>
                              <span>Q.Code</span>
                              <span>Points</span>
                            </div>
                            {event?.problem_set?.map((problem, index) => (
                              <Link
                                key={index}
                                to={`/problems/${problem.slug}`}
                              >
                                <div className="user-data d-flex justify-content-between leaderboard-bg">
                                  <div
                                    className="user-rank font-blue font-vcr"
                                    style={{ flex: 0.4, textAlign: "left" }}
                                  >
                                    {problem.title}
                                  </div>
                                  <div className="user-info px-lg-3 mx-auto">
                                    <span
                                      className="user-name"
                                      style={{ flex: 0.4 }}
                                    >
                                      {problem.slug}
                                    </span>
                                  </div>
                                  <div
                                    className="user-score"
                                    style={{ flex: 0.2 }}
                                  >
                                    {problem.points}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </>
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
                              <span style={{ flex: 0.6 }}>Name</span>
                              <span style={{ flex: 0.2 }}>Score</span>
                            </div>
                            {leaderboard?.results?.map((user, index) => (
                              <div
                                key={index}
                                className="user-data d-flex justify-content-around leaderboard-bg"
                              >
                                <span
                                  className="user-rank"
                                  style={{ flex: 0.2 }}
                                >
                                  {index + 1}
                                </span>
                                <div
                                  style={{ flex: 0.6 }}
                                  className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                                >
                                  <img
                                    src={avatarData[user?.user.avatar]}
                                    className="user-image"
                                    alt="avatar"
                                  />
                                  <span className="user-name">
                                    {user?.user?.username}
                                  </span>
                                </div>
                                <span
                                  className="user-score"
                                  style={{ flex: 0.2 }}
                                >
                                  {user.score}
                                </span>
                              </div>
                            ))}
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
