/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "../modal/index";
import { ModalContext } from "../../context/context";
import avatar1 from "../../images/auth/frog.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/peach.svg";
import avatar4 from "../../images/auth/pacman.svg";
import runCode from "../../images/problems/runCode.svg";
import submitCode from "../../images/problems/submitCode.svg";
import Spinner from "../utils/Spinner";
import { useParams, useHistory } from "react-router-dom";
import Editor from "../editor/Editor";
import {
  getSubmissionsPagination,
  getSubmissions,
  getProblem,
  codeSubmission,
} from "../../api/index";
import "./problem.css";

function Problem() {
  function b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }
  const history = useHistory();
  const { openModal } = useContext(ModalContext);
  const params = useParams();
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outputData, setOutputData] = useState({
    status: "",
    memory: "",
    time: "",
  });

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
    getProblem(params.slug.toString().toUpperCase(), history)
      .then((data) => {
        setProblem(data);
        setLoading(false);
      })
      .catch((err) => {
        localStorage.clear();
        history.push("/login");
      });
    getSubmissions(params.slug.toString().toUpperCase()).then((data) => {
      setSubmissions(data);
    });
  }, [params.slug]);
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
      let out =
        res.data.stdout !== null ? b64DecodeUnicode(res.data.stdout) : null;
      setOutputData({
        ...outputData,
        memory: res.data.memory,
        time: res.data.time,
        status: res.data.status.description,
      });
      setOutput(out || res.data.status.description);
    } catch (error) {
      openModal("Type something duh");
      <Modal />;
    }
  };
  const paginationSubmission = (text) => {
    getSubmissionsPagination(text).then((data) => {
      setSubmissions(data);
    });
  };
  const handleSubmitCode = async (e, value) => {
    e.preventDefault();
    let l = Number(languageId);
    let data = {
      solution: value,
      language_id: l,
      problem_slug: params.slug,
    };
    if (value === "") {
      openModal("Type something duh");
      <Modal />;
      return;
    }
    try {
      await codeSubmission(data);
    } catch (error) {
      openModal(error);
      <Modal />;
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
                  <div className="col-lg-5 col-md-12 col-sm-12 col-12 pt-md-5 py-2 left-section">
                    <div className="d-flex justify-content-center font-vcr font-blue ">
                      {problem?.title}
                    </div>
                    <div className="mt-2 font-vcr d-flex justify-content-between">
                      <span style={{ color: "green" }}>
                        Points; {problem?.points}
                      </span>
                      <span style={{ color: "red" }}>
                        Penalty: {problem?.penalty}
                      </span>
                    </div>
                    {problem?.problem_statement && (
                      <>
                        <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                          QUESTION: <br />
                          <span>{problem.problem_statement}</span>
                        </p>
                        <hr />
                      </>
                    )}
                    {problem?.input_statement && (
                      <>
                        <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                          INPUT STATMENT: <br />
                          <span>{problem.input_statement}</span>
                        </p>
                        <hr />
                      </>
                    )}
                    {problem?.example_input && (
                      <>
                        <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                          EXAMPLE INPUT: <br />
                          <pre className="font-lightGrey mt-3">{problem.example_input}</pre>
                        </p>
                        <hr />
                      </>
                    )}
                    {problem?.output_statement && (
                      <>
                        <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                          OUTPUT STATEMENT: <br />
                          <span>{problem.output_statement}</span>
                        </p>
                        <hr />
                      </>
                    )}
                    {problem?.example_output && (
                      <>
                        <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                          EXAMPLE OUTPUT: <br />
                          <pre className="font-lightGrey mt-3">{problem.example_output}</pre>
                        </p>
                        <hr />
                      </>
                    )}
                    {problem?.example_explanation && (
                      <>
                        <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                          EXAMPLE EXPLANATION: <br />
                          <span>{problem.example_explanation}</span>
                        </p>
                        <hr />
                      </>
                    )}
                    {problem?.contraints && (
                      <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                        CONSTRAINTS: <br />
                        <span>{problem.contraints}</span>
                      </p>
                    )}

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
                        className="d-flex leadeboard-leads justify-content-around"
                        style={{
                          textAlign: "center",
                          border: "1px solid #405C6B",
                        }}
                      >
                        <span
                          className="font-vcr"
                          style={{ width: "20%" }}
                        ></span>
                        <span className="font-vcr" style={{ width: "40%" }}>
                          Name
                        </span>
                        <span className="font-vcr" style={{ width: "40%" }}>
                          Time
                        </span>
                      </div>
                      {submissions?.results?.map((submission, index) => (
                        <div
                          key={index}
                          className="user-data d-flex justify-content-around leaderboard-bg font-vcr"
                        >
                          <span style={{ width: "20%" }}>
                            <img
                              src={avatarData[submission.user.avatar]}
                              className="user-image"
                              alt="avatar"
                            />
                          </span>
                          <div
                            style={{ width: "40%" }}
                            className="d-flex user-info px-lg-3 mx-auto justify-content-center align-items-center"
                          >
                            <span className="user-name">
                              {submission.user.username}
                            </span>
                          </div>
                          <span className="user-score" style={{ width: "40%" }}>
                            {submission.problem?.points}
                          </span>
                        </div>
                      ))}
                      <div className="d-flex justify-content-center font-vcr font-blue ">
                        <nav className="mt-4">
                          <div className="pagination">
                            {submissions?.previous && (
                              <span
                                className="pagination-previous"
                                onClick={() =>
                                  paginationSubmission(submissions.previous)
                                }
                              >
                                <i className="fas fa-arrow-left"></i>
                              </span>
                            )}

                            {submissions?.next && (
                              <span
                                className="pagination-next ml-3"
                                onClick={() =>
                                  paginationSubmission(submissions.next)
                                }
                              >
                                <i className="fas fa-arrow-right"></i>
                              </span>
                            )}
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 pt-md-5">
                    <div className="d-flex justify-content-between upper-section mb-2 py-2 font-vcr">
                      <div className="input-group" style={{ width: "auto" }}>
                        <div className="pixel-input-wrapper">
                          <span></span>
                          <div className="pixel-input my-2">
                            <select
                              onChange={(e) => {
                                setLanguageId(e.target.value);
                              }}
                              className="font-vcr font-blue"
                            >
                              {languages.map((lan) => (
                                <option
                                  value={lan.id}
                                  className="font-lightGrey"
                                >
                                  {lan.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* <div className="timer px-5 py-2 pb-2 font-blue font-vcr">
                        05h : 35m : 42s
                      </div> */}
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
                        className="output font-vcr px-2 py-2"
                        rows="5"
                        placeholder="Custom Input here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        id="custom"
                      />
                      <div className="lower-section-images">
                        <img
                          src={runCode}
                          alt="runCode"
                          className="see-all-button"
                          onClick={(e) =>
                            handleRunCode(e, value, languageId, input)
                          }
                        />
                        <img
                          src={submitCode}
                          alt="submitCOde"
                          className="see-all-button ml-3"
                          onClick={(e) => handleSubmitCode(e, value)}
                        />
                      </div>
                    </div>
                    <div className="output-section">
                      <p className="font-vcr font-blue font-weight-bold mt-5 text-left mb-3">
                        &lt;&lt;&nbsp;HELLO OUTPUT&nbsp;&gt;&gt;
                      </p>
                      {output && (
                        <div className="d-flex justify-content-between p-3 bg-black">
                          <div className="font-vcr font-blue">
                            Status: {outputData?.status}
                          </div>
                          <div className="font-vcr font-lightGrey">
                            Time: {outputData?.time} sec
                          </div>
                          <div className="font-vcr font-lightGrey">
                            Mem: {outputData?.memory} KB
                          </div>
                        </div>
                      )}

                      <textarea
                        className="output w-100 font-robot"
                        value={output}
                        rows="10"
                        disabled
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
