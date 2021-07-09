import React, { useEffect, useState } from "react";
import pointerLeft from "../../images/eventDetails/pointer-left.svg";
import dash from "../../images/eventDetails/dash.svg";
import "./eventDetails.css";
import avatar1 from "../../images/auth/peach.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/pacman.svg";
import avatar4 from "../../images/auth/frog.svg";
import noLeaderboard from "../../images/eventDetails/noleaderboard.svg";
import trophy from "../../images/events/trophy.svg";
import noQuestions from "../../images/eventDetails/noquestions.svg";
import line from "../../images/eventDetails/line.svg";
import heart from "../../images/footer/heart.svg";
import folder from "../../images/eventDetails/folder.svg";
import {
  getEvent,
  getLeaderboard,
  getLeaderboardUser,
  getLeaderboardPagination,
} from "../../api/index";
import { useParams, Redirect, Link, useHistory } from "react-router-dom";
import moment from "moment";
function EventDetails() {
  const history = useHistory();
  const params = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});
  const [counter, setCounter] = React.useState(1000);

  // First Attempts

  const [eventdate, seteventdate] = useState();
  const avatarData = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4,
  };
  useEffect(() => {
    getEvent(params.slug, history)
      .then((data) => {
        setEvent(data);
        console.log(data);
        const abc = new Date(data.datetime);
        const currentTime = new Date().getTime();
        const eventStartTime = new Date(data.datetime).getTime();
        const duration = data.duration;
        const eventDuration =
          Number(duration.split(":")[0]) * 60 * 60 +
          Number(duration.split(":")[1]) * 60 +
          Number(duration.split(":")[2]);
        const eventEndTime = eventStartTime + eventDuration * 1000;

        console.log(Date.parse(data.duration));

        if (abc == new Date()) {
          const eventStartTime = new Date(data.datetime).getTime();
          const eventDuration =
            Number(duration.split(":")[0]) * 60 * 60 +
            Number(duration.split(":")[1]) * 60 +
            Number(duration.split(":")[2]);
          console.log("EventStartTime: ", eventStartTime);
          console.log("eventDuration: ", eventDuration * 1000);
        }
        // const getTime = new Date(today - eventtime);
        // console.log(today);
        // console.log(data.datetime);
        // console.log("GETTTTTTTTTTTTTTTT", getTime);
        // console.log("CurrenTime: ", currentTime);
        // console.log("EventStartTime: ", eventStartTime);
        // console.log("eventDuration: ", eventDuration * 1000);
        // console.log("eventEndTime: ", eventEndTime);
        const timeLeft = eventEndTime - currentTime;
        // console.log("TimeLeft: ", timeLeft);
        setCounter(timeLeft);

        seteventdate(data.datetime);
        getLeaderboard(params.slug).then((data) => {
          setLeaderboard(data);
          getLeaderboardUser(
            params.slug,
            JSON.parse(localStorage.getItem("user"))?.username
          ).then((data) => {
            setUser(data);
          });
        });
      })
      .catch((err) => {
        localStorage.clear();
        history.push("/login");
      });
    getLeaderboard(params.slug)
      .then((data) => {
        setLeaderboard(data);
        console.log(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);
  // setInterval(() => setCounter(counter - 1), 1000);
  const [active, setActive] = useState("about");
  const removeClass = (e) => {
    document
      .querySelectorAll("div.events-options")
      .forEach((link) => link.classList.remove("active-event"));
  };

  const paginationLeaderboard = (text) => {
    getLeaderboardPagination(text).then((data) => {
      setLeaderboard(data);
      console.log(data);
    });
  };
 let currentPage = leaderboard?.current;

  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container py-md-5">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-10 col-sm-10 col-10 mx-auto my-md-5 content-background px-md-5">
              <div className="my-md-5 py-md-3 px-lg-3">
                <div className="row">
                  <div className="col-lg-3 col-md-5 col-sm-5 col-12">
                    <div className="font-vcr font-lightGrey">
                      <span className="exit" onClick={() => history.goBack()}>
                        <img src={pointerLeft} alt="left-pointer" /> Exit
                      </span>
                      <div className="d-flex codewars mt-5 pt-2 pb-5">
                        <div className="dash">
                          <img src={dash} alt="dash" className="img-fluid" />
                        </div>
                        <div>
                          <div className="main mb-3">
                            <img
                              src={folder}
                              alt="folder"
                              className="img-fluid"
                            />
                            <span className="codewars-span font-vcr font-16 mt-3 font-blue">
                              CODEWARS
                            </span>
                          </div>
                          <div className="flex-mobile">
                            <div
                              className="mt-3 active-event events-options event-detail-option"
                              onClick={(e) => {
                                setActive("about");
                                removeClass(e);
                                e.target.classList.add("active-event");
                              }}
                            >
                              <span className="display-hash">#</span> about
                            </div>
                            <div
                              className="mt-3 events-options event-detail-option"
                              onClick={(e) => {
                                setActive("rules");
                                removeClass(e);
                                e.target.classList.add("active-event");
                              }}
                            >
                              <span className="display-hash">#</span> rules
                            </div>
                            <div
                              className="mt-3 events-options event-detail-option"
                              onClick={(e) => {
                                setActive("leaderboard");
                                removeClass(e);

                                e.target.classList.add("active-event");
                              }}
                            >
                              <span className="display-hash">#</span>{" "}
                              leaderboard
                            </div>
                            <div
                              className="mt-3 events-options"
                              onClick={(e) => {
                                setActive("problems");
                                removeClass(e);
                                e.target.classList.add("active-event");
                              }}
                            >
                              <span className="display-hash">#</span> problems
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-7 col-sm-7 col-12">
                    <div className="mainContainer font-vcr font-lightGrey w-100">
                      <div>
                        <div className="top-section d-flex justify-content-between align-items-center">
                          <div className="dashboard font-vcr font-lightGrey">
                            <h5>*&nbsp;Dashboard&nbsp;*</h5>
                            {/* <div>
                            {counter > 0 && <span>Countdown: {counter}</span>}
                          </div> */}
                          </div>
                          {user &&  user?.score ? (
                            <div className="score font-blue font-robot font-16">
                              <img src={trophy} alt="trophy" />
                              <span className="ml-4">
                               {user?.score ? `${user.score}` : "0"}
                              </span>
                            </div>
                          ) : (
                             <div className="score font-blue font-robot font-16">
                              <img src={trophy} alt="trophy" />
                              <span className="ml-4">
                              0
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="rules mt-5 pt-2 pb-5 py-2 px-2">
                          {active === "about" && (
                            <div className="about__section m-2 min-height-event-details">
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
                                    {moment(event?.datetime).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="about__content mt-3">
                                {event?.description}
                              </div>
                            </div>
                          )}
                          {active === "problems" && (
                            <div className="min-height-event-details">
                              <div className="font-blue font-vcr font-18 mt-3">
                                #PROBLEMS
                              </div>
                              {!event?.problem_set ? (
                                <div className="text-center my-2">
                                  <img src={noQuestions} alt="No Question" />
                                  <div className="mt-2 font-blue font-vcr font-16">
                                   Problems will appear once the contest is live!
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className=" d-flex mt-3"
                                  style={{ flexDirection: "column" }}
                                >
                                  <div className=" d-flex leadeboard-leads justify-content-between">
                                    <span>Name</span>
                                    <span
                                      className="text-right"
                                      style={{ width: "30%" }}
                                    >
                                      Q.Code
                                    </span>
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
                                          style={{
                                            width: "40%",
                                            textAlign: "left",
                                          }}
                                        >
                                          {problem.title}
                                        </div>
                                        <div className="user-info px-lg-3 mx-auto">
                                          <span
                                            className="user-name"
                                            style={{ width: "40%" }}
                                          >
                                            {problem.slug}
                                          </span>
                                        </div>
                                        <div
                                          className="user-score text-right"
                                          style={{ width: "20%" }}
                                        >
                                          {problem?.points}
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          {active === "leaderboard" && (
                            <div className="min-height-event-details">
                              <div className="font-blue font-vcr font-18 mt-3">
                                #LEADERBOARD
                              </div>
                              {leaderboard?.results?.length > 0 ? (
                                <div
                                  className=" d-flex mt-3"
                                  style={{ flexDirection: "column" }}
                                >
                                  <div
                                    className=" d-flex leadeboard-leads justify-content-around"
                                    style={{ textAlign: "center" }}
                                  >
                                    <span style={{ width: "20%" }}>Rank</span>
                                    <span style={{ width: "60%" }}>
                                      Username
                                    </span>
                                    <span style={{ width: "20%" }}>Score</span>
                                  </div>
                                  {leaderboard?.results?.map((user, index) => (
                                    <div
                                      key={index}
                                      className="user-data d-flex justify-content-around leaderboard-bg"
                                    >
                                      <span
                                        className="user-rank"
                                        style={{ width: "20%" }}
                                      >
                                       {(currentPage-1)*10 + index + 1}
                                      </span>
                                      <div
                                        style={{ width: "60%" }}
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
                                        style={{ width: "20%" }}
                                      >
                                        {user.score}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="d-flex justify-content-center font-vcr font-blue ">
                                    <nav className="mt-4">
                                      <div className="pagination">
                                        {leaderboard?.previous && (
                                          <span
                                            className="pagination-previous pagination-icon"
                                            onClick={() =>
                                              paginationLeaderboard(
                                                leaderboard.previous
                                              )
                                            }
                                          >
                                            <i className="fas fa-arrow-left"></i>
                                          </span>
                                        )}

                                        {leaderboard?.next && (
                                          <span
                                            className="pagination-next ml-3 pagination-icon"
                                            onClick={() =>
                                              paginationLeaderboard(
                                                leaderboard.next
                                              )
                                            }
                                          >
                                            <i className="fas fa-arrow-right"></i>
                                          </span>
                                        )}
                                      </div>
                                    </nav>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3 mx-auto text-center">
                                  <img
                                    src={noLeaderboard}
                                    className="img-fluid"
                                    alt="no leaderboard"
                                  />{" "}
                                  <br />
                                  <div className="mt-2 py-2 font-vcr font-blue">
                                    No Leadeboard
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          {active === "rules" && (
                            <div className="min-height-event-details">
                              <div className="font-blue font-vcr font-18 mt-3">
                                #RULES
                              </div>
                              <li>{event.rules}</li>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pt-5"></div>
                <div className="mt-4 text-center">
                  <img src={line} alt="line" className="img-fluid mt-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventDetails;
