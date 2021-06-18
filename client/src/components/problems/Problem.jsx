import React, { useEffect, useState } from "react";
import logo from "../../images/home/logo.svg";
import line from "../../images/home/line.svg";
import button from "../../images/home/button.svg";
import avatar1 from "../../images/auth/frog.svg";
import runCode from "../../images/problems/runCode.svg";
import submitCode from "../../images/problems/submitCode.svg";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";
import { useParams } from "react-router-dom";
import Editor from "../editor/Editor";
import { getProblem } from "../../api/index";
import { Resizable } from "re-resizable";
import "./problem.css";
function Problem() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState();
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState([]);
  const [languageId, setLanguageId] = useState("");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  useEffect(() => {
    getProblem(params.slug)
      .then((data) => {
        setProblem(data);

        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width);
    setHeight(size.height);
  };
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-background">
          <div className="problem-wrapper pt-sm-5">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-12 col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-md-5 my-2 content-background">
                <div className="row pt-3">
                  <div className="col-lg-5 col-md-12 col-sm-12 col-12 pt-md-5 py-2">
                    {/* <Resizable
                      defaultSize={{
                        width: 500,
                        height: 500,
                      }}
                    > */}
                    <div className="d-flex justify-content-center font-vcr font-blue">
                      {problem?.title}
                    </div>
                    <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <hr color="blue" />
                    <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>

                    <div
                      className=" font-vcr font-18 mt-3"
                      style={{ color: "#7a8589" }}
                    >
                      Recent Submissions
                    </div>
                    <div
                      className=" d-flex mt-3"
                      style={{
                        flexDirection: "column",
                        border: "1px solid #405C6B",
                      }}
                    >
                      <div
                        className=" d-flex leadeboard-leads justify-content-around"
                        style={{
                          textAlign: "center",
                          border: "1px solid #405C6B",
                        }}
                      >
                        <span style={{ flex: 0.2 }}></span>
                        <span style={{ flex: 0.4 }}>Name</span>
                        <span style={{ flex: 0.4 }}>Score</span>
                      </div>
                      <div className="user-data d-flex justify-content-around leaderboard-bg">
                        <span style={{ flex: 0.2 }}>
                          <img
                            src={avatar1}
                            className="user-image"
                            alt="avatar"
                          />
                        </span>
                        <div
                          style={{ flex: 0.4 }}
                          className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                        >
                          <span className="user-name">Test User</span>
                        </div>
                        <span className="user-score" style={{ flex: 0.4 }}>
                          69
                        </span>
                      </div>
                      <div className="user-data d-flex justify-content-around leaderboard-bg">
                        <span style={{ flex: 0.2 }}>
                          <img
                            src={avatar1}
                            className="user-image"
                            alt="avatar"
                          />
                        </span>
                        <div
                          style={{ flex: 0.4 }}
                          className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                        >
                          <span className="user-name">Test User</span>
                        </div>
                        <span className="user-score" style={{ flex: 0.4 }}>
                          69
                        </span>
                      </div>{" "}
                      <div className="user-data d-flex justify-content-around leaderboard-bg">
                        <span style={{ flex: 0.2 }}>
                          <img
                            src={avatar1}
                            className="user-image"
                            alt="avatar"
                          />
                        </span>
                        <div
                          style={{ flex: 0.4 }}
                          className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                        >
                          <span className="user-name">Test User</span>
                        </div>
                        <span className="user-score" style={{ flex: 0.4 }}>
                          69
                        </span>
                      </div>
                    </div>

                    {/* </Resizable> */}
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 pt-md-5">
                    {/* <Resizable
                      defaultSize={{
                        width: 200,
                        height: 500,
                      }}
                    > */}
                    <div className="d-flex justify-content-between upper-section mb-2 py-2">
                      <select>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                      </select>
                      <div className="timer px-5 py-2 pb-2 font-blue font-vcr">
                        05h : 35m : 42s
                      </div>
                    </div>
                    <Editor
                      language={language}
                      displayName="Code"
                      value={value}
                      input={input}
                      onChange={setValue}
                    ></Editor>
                    <div className="d-flex mt-3 py-2 lower-section">
                      <textarea
                        className="output w-50 font-vcr px-2 py-2"
                        rows="10"
                        placeholder="Custom Input here..."
                        // value={input}
                        // onChange={(e) => setInput(e.target.value)}
                        id="custom"
                      />
                      <img src={runCode} alt="runCOde" />
                      <img src={submitCode} alt="submitCOde" />
                    </div>
                    <div className="output-section">
                      <p className="font-vcr font-blue font-weight-bold mt-5 text-center mb-3">
                        &lt;&lt;&nbsp;&nbsp;HELLO OUTPUT&nbsp;&nbsp;&gt;&gt;
                      </p>
                      <textarea className="output w-100" rows="5"></textarea>
                    </div>
                    {/* </Resizable> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Problem;
