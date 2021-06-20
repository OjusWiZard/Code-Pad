import React, { useEffect, useState } from "react";
import axios from "axios";
import button from "../../images/home/button.svg";
import avatar1 from "../../images/auth/frog.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/peach.svg";
import avatar4 from "../../images/auth/pacman.svg";
import runCode from "../../images/problems/runCode.svg";
import submitCode from "../../images/problems/submitCode.svg";
import { Link } from "react-router-dom";
import { codeSubmission, getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";
import { useParams } from "react-router-dom";
import Editor from "../editor/Editor";
import { getProblem } from "../../api/index";
import "./problem.css";
function Problem() {
  const params = useParams();
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [languageId, setLanguageId] = useState(54);
  const avatarData = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4,
  };
  const langData = [
    { id: 54, name: "CPP" },
    { id: 50, name: "C" },
    { id: 62, name: "java" },
    { id: 71, name: "python" },
  ];
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState();
  const handleRunCode = async (e, value, languageId, input) => {
    e.preventDefault();
    setOutput("");

    let data;
    let l = Number(languageId);

    if (input) {
      data = {
        source_code: btoa(value),
        language_id: parseInt(l),
        stdin: btoa(input),
      };
    } else {
      data = {
        source_code: btoa(value),
        language_id: parseInt(l),
      };
    }

    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "LetUsCodeHackNCS",
        },
      };
      const res = await axios.post(
        "https://judge.hackncs.com/submissions/?wait=true&base64_encoded=true",
        data,
        config
      );

      let out = res.data.stdout !== null ? atob(res.data.stdout) : null;
      setOutput(out || res.data.status.description);
    } catch (error) {
      alert(error);
    }
  };
  const handleSubmitCode = async (e, value) => {
    e.preventDefault();
    let l = Number(languageId);
    let data = {
      solution: value,
      language_id: l,
      problem_slug: params.slug,
    };
    try {
      await codeSubmission(data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getProblem(params.slug)
      .then((data) => {
        setProblem(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  const submissionArray = problem?.submissions?.splice(0, 5);
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

                    <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deavatarserunt mollit anim id est laborum.
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
                      {submissionArray?.map((submission, index) => (
                        <div
                          key={index}
                          className="user-data d-flex justify-content-around leaderboard-bg"
                        >
                          <span style={{ flex: 0.2 }}>
                            <img
                              src={avatarData[submission.user.avatar]}
                              className="user-image"
                              alt="avatar"
                            />
                          </span>
                          <div
                            style={{ flex: 0.4 }}
                            className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                          >
                            <span className="user-name">
                              {submission.user.username}
                            </span>
                          </div>
                          <span className="user-score" style={{ flex: 0.4 }}>
                            {submission.problem.points}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 pt-md-5">
                    <div className="d-flex justify-content-between upper-section mb-2 py-2">
                      <select
                        onChange={(e) => {
                          setLanguageId(e.target.value);
                          setLanguage(
                            e.target.options[
                              e.target.selectedIndex
                            ].text.toLowerCase()
                          );
                          setInput("");
                          setOutput("");
                          setValue("");
                        }}
                      >
                        {langData.map((lan) => (
                          <option value={lan.id} className="font-lightGrey">
                            {lan.name}
                          </option>
                        ))}
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
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        id="custom"
                      />
                      <img
                        src={runCode}
                        alt="runCOde"
                        onClick={(e) =>
                          handleRunCode(e, value, languageId, input)
                        }
                      />
                      <img
                        src={submitCode}
                        alt="submitCOde"
                        onClick={(e) => handleSubmitCode(e, value)}
                      />
                    </div>
                    <div className="output-section">
                      <p className="font-vcr font-blue font-weight-bold mt-5 text-center mb-3">
                        &lt;&lt;&nbsp;&nbsp;HELLO OUTPUT&nbsp;&nbsp;&gt;&gt;
                      </p>
                      <textarea
                        className="output w-100"
                        value={output}
                        rows="5"
                      ></textarea>
                    </div>
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
