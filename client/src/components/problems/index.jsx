import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar1 from "../../images/auth/frog.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/peach.svg";
import avatar4 from "../../images/auth/pacman.svg";
import runCode from "../../images/problems/runCode.svg";
import submitCode from "../../images/problems/submitCode.svg";
import Spinner from "../utils/Spinner";
import { useParams } from "react-router-dom";
import Editor from "../editor/Editor";
import { getSubmissions, getProblem, codeSubmission } from "../../api/index";
import "./problem.css";

function Problem() {
  const params = useParams();
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [problem, setProblem] = useState();
  const [languages, setLanguages] = useState("");
  const [languageId, setLanguageId] = useState(54);
  const avatarData = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "LetUsCodeHackNCS",
    },
  };

  // Fetching Languages
  useEffect(() => {
    axios.get("https://judge.hackncs.com/languages", config).then((data) => {
      setLanguages(data.data);
    });
    getProblem(params.slug.toString().toUpperCase()).then((data) => {
      setProblem(data);
      setLoading(false);
    });
    getSubmissions(params.slug.toString().toUpperCase()).then((data) => {
      setSubmissions(data);
    });
  }, []);
  console.log("Sub", submissions);
  // Run Code
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

  // const submissionArray = problem?.submissions?.splice(0, 5);
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-background">
          <div className="problem-wrapper pt-sm-5">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-12 col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-md-5 my-2 content-background pb-5">
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
                      {submissions?.results?.map((submission, index) => (
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
                            {submission.problem?.points}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 pt-md-5">
                    <div className="d-flex justify-content-between upper-section mb-2 py-2 font-vcr">
                      <select
                        onChange={(e) => {
                          setLanguageId(e.target.value);
                          setInput("");
                          setOutput("");
                          setValue("");
                        }}
                      >
                        {languages.map((lan) => (
                          <option
                            value={lan.id}
                            className="font-lightGrey font-vcr"
                          >
                            {lan.name}
                          </option>
                        ))}
                      </select>
                      <div className="timer px-5 py-2 pb-2 font-blue font-vcr">
                        05h : 35m : 42s
                      </div>
                    </div>
                    <Editor
                      languageId={languageId}
                      displayName="Code"
                      value={value}
                      input={input}
                      onChange={setValue}
                    ></Editor>
                    <div className="d-flex mt-3 py-2 lower-section">
                      <textarea
                        className="output w-50 font-vcr px-2 py-2"
                        rows="5"
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
                        &lt;&lt;&nbsp;HELLO OUTPUT&nbsp;&gt;&gt;
                      </p>
                      <div className="d-flex justify-content-between p-3 bg-black">
                        <div className="font-vcr font-blue">
                          Status: Successfull
                        </div>
                        <div className="font-vcr font-lightGrey">
                          Time: 0.05sec
                        </div>
                        <div className="font-vcr font-lightGrey">Mem: 63kb</div>
                      </div>
                      <textarea
                        className="output w-100"
                        value={output}
                        rows="10"
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
