/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "../modal/index";
import { ModalContext } from "../../context/context";
import avatar1 from "../../images/auth/peach.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/pacman.svg";
import avatar4 from "../../images/auth/frog.svg";
import NoSubmission from "../utils/NoSubmission";
import accepted from "../../images/problems/accepted.svg";
import processing from "../../images/problems/pending.svg";
import rejected from "../../images/problems/cross.svg";
import runCode from "../../images/problems/runCode.svg";
import submitCode from "../../images/problems/submitCode.svg";
import pointerLeft from "../../images/eventDetails/pointer-left.svg";
import Spinner from "../utils/Spinner";
import { useParams, Link, useHistory } from "react-router-dom";
import Editor from "../editor/Editor";
import moment from "moment";
import {
  getSubmissionsPagination,
  getSubmissions,
  getProblem,
  codeSubmission,
} from "../../api/index";
import "./problem.css";

function Problem() {
  const user = localStorage.getItem("user");
  function b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str)
        ?.split("")
        ?.map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        ?.join("")
    );
  }
  let fileReader;
  const handleFileRead = (e) => {
    const content = fileReader.result;
    setValue(content);
  };

  const handleFileChosen = async (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const history = useHistory();
  const { openModal } = useContext(ModalContext);
  const params = useParams();
  const [disabled, setDisabled] = useState(false);
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
    axios.get(`${process.env.REACT_APP_JUDGELANGUAGE}`, config).then((data) => {
      setLanguages(
        data?.data?.filter(
          (lang) => lang.id !== 54 && lang.id !== 44 && lang.id !== 89
        )
      );
    });
    getProblem(params.slug.toString().toUpperCase(), history).then((data) => {
      setProblem(data);
      setLoading(false);
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
        `${process.env.REACT_APP_JUDGEHOST}`,
        data,
        config
      );
      window.scrollTo(0, document.body.scrollHeight);
      let out =
        res.data.stdout !== null
          ? b64DecodeUnicode(res?.data?.stdout)
          : b64DecodeUnicode(res?.data?.compile_output);
      setOutputData({
        ...outputData,
        memory: res.data.memory,
        time: res.data.time,
        status: res?.data?.status?.description,
      });
      setOutput(out || res?.data?.status?.description);
    } catch (error) {
      if (error.message === "URI malformed") {
        setOutput("No Output");
        return;
      }
      openModal("Write some code");
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
      openModal("Write some code");
      <Modal />;
      return;
    }
    try {
      setDisabled(true);
      await codeSubmission(data, openModal, setDisabled);
    } catch (error) {
      if (error.message === "URI malformed") {
        setOutput("No Output");
        return;
      }
      setDisabled(false);
      openModal(error.message);
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
                  <div className="col-lg-5 col-md-12 col-sm-12 col-12 pt-md-5 py-2 ">
                    <div className="font-lightGrey font-vcr">
                      <span
                        className="exit d-flex align-items-center px-3 mt-2"
                        onClick={() => history.goBack()}
                      >
                        <img
                          src={pointerLeft}
                          alt="left-pointer"
                          className="mr-1"
                        />
                        <span>Exit</span>
                      </span>
                    </div>
                    <div className="left-section">
                      <div className="d-flex font-vcr font-blue font-heading font-weight-bold px-xl-3">
                        {problem?.title}
                      </div>
                      <div className="mt-2 font-robot d-flex px-xl-3 text-uppercase font-weight-bold">
                        <span className="font-blue">
                          Points: {problem?.points}
                        </span>
                      </div>
                      <div className="mt-2 font-robot d-flex px-xl-3 text-uppercase font-weight-bold">
                        <span className="font-lightGrey">
                          Penalty: {problem?.penalty}
                        </span>
                      </div>
                      {problem?.problem_statement && (
                        <>
                          <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3 text-justify">
                            <div className="font-blue pb-2">QUESTION:</div>
                            <span>{problem.problem_statement}</span>
                          </p>
                          <hr />
                        </>
                      )}
                      {problem?.input_statement && (
                        <>
                          <p className="font-robot font-lightGrey mt-4 font-14 font-weight-bold px-xl-3 text-justify">
                            <div className="font-blue pb-2">
                              INPUT STATMENT:
                            </div>{" "}
                            <span>{problem.input_statement}</span>
                          </p>
                          <hr />
                        </>
                      )}
                      {problem?.example_input && (
                        <>
                          <p className="font-robot font-lightGrey mt-4 font-14 font-weight-bold px-xl-3 text-justify">
                            <div className="font-blue pb-2">EXAMPLE INPUT:</div>
                            <pre
                              className="font-lightGrey"
                              style={{ fontSize: "17px" }}
                            >
                              {problem.example_input}
                            </pre>
                          </p>
                          <hr />
                        </>
                      )}
                      {problem?.output_statement && (
                        <>
                          <p className="font-robot font-lightGrey mt-4 font-14 font-weight-bold px-xl-3 text-justify">
                            <div className="font-blue pb-2">
                              OUTPUT STATEMENT:
                            </div>
                            <span>{problem.output_statement}</span>
                          </p>
                          <hr />
                        </>
                      )}
                      {problem?.example_output && (
                        <>
                          <p className="font-robot font-lightGrey mt-4 font-14 font-weight-bold px-xl-3 text-justify">
                            <div className="font-blue pb-2">
                              EXAMPLE OUTPUT:
                            </div>
                            <pre
                              className="font-lightGrey"
                              style={{ fontSize: "17px" }}
                            >
                              {problem.example_output}
                            </pre>
                          </p>
                          <hr />
                        </>
                      )}
                      {problem?.example_explanation && (
                        <>
                          <p className="font-robot font-lightGrey mt-4 font-14 font-weight-bold px-xl-3 text-justify">
                            <div className="font-blue pb-2">
                              EXAMPLE EXPLANATION:
                            </div>
                            <span>{problem.example_explanation}</span>
                          </p>
                          <hr />
                        </>
                      )}
                      {problem?.contraints && (
                        <p className="font-robot font-lightGrey mt-4 font-14 font-weight-bold px-xl-3 text-justify">
                          <div className="font-blue pb-2">CONSTRAINTS:</div>
                          <pre className="font-robot font-14 font-lightGrey">
                            {problem.contraints}
                          </pre>
                        </p>
                      )}

                      <div className=" font-robot font-18 mt-5 px-xl-3 font-blue text-uppercase font-weight-blue">
                        Recent Submissions
                      </div>
                      <div
                        className=" d-flex mt-3 px-xl-3"
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        {!submissions?.results?.length > 0 ? (
                          <div
                            className="d-flex justify-content-center align-items-center text-center w-100 py-3"
                            style={{ flexDirection: "column" }}
                          >
                            <NoSubmission />
                            <br />
                            <div className="font-vcr font-blue font-16">
                              NO SUBMISSION
                            </div>
                          </div>
                        ) : (
                          <React.Fragment>
                            <div
                              className="d-flex leadeboard-leads justify-content-around"
                              style={{
                                border: "1px solid #405C6B",
                              }}
                            >
                              <span
                                className="font-robot"
                                style={{ width: "10%" }}
                              ></span>
                              <span
                                className="font-vcr text-center"
                                style={{ width: "40%" }}
                              >
                                Name
                              </span>
                              <span
                                className="font-vcr text-center"
                                style={{ width: "40%" }}
                              >
                                Time
                              </span>
                            </div>
                            {submissions?.results?.map((submission, index) => {
                              if (submission.status === "Accepted") {
                                return (
                                  <div
                                    key={index}
                                    className="user-data d-flex justify-content-around leaderboard-bg font-robot"
                                  >
                                    <span style={{ width: "10%" }}>
                                      <img
                                        src={avatarData[submission.user.avatar]}
                                        className="user-image"
                                        alt="avatar"
                                      />
                                    </span>
                                    <div
                                      style={{ width: "40%" }}
                                      className="font-lightGrey"
                                    >
                                      {submission.user.username}
                                    </div>
                                    <span
                                      className="user-score"
                                      style={{ width: "40%" }}
                                    >
                                      {" "}
                                      {moment(submission.datetime)
                                        .startOf("minutes")
                                        .fromNow()}
                                    </span>
                                    <img src={accepted} alt="12" />
                                  </div>
                                );
                              } else if (
                                submission.status === "Processing" ||
                                submission.status === "In Queue"
                              ) {
                                return (
                                  <div
                                    key={index}
                                    className="user-data d-flex justify-content-around leaderboard-bg font-robot"
                                  >
                                    {" "}
                                    <span style={{ width: "10%" }}>
                                      <img
                                        src={avatarData[submission.user.avatar]}
                                        className="user-image"
                                        alt="avatar"
                                      />
                                    </span>
                                    <div
                                      style={{ width: "40%" }}
                                      className="font-lightGrey"
                                    >
                                      {submission.user.username}
                                    </div>
                                    <span
                                      className="user-score"
                                      style={{ width: "40%" }}
                                    >
                                      {moment(submission.datetime)
                                        .startOf("minutes")
                                        .fromNow()}
                                    </span>
                                    <img src={processing} alt="12" />
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    key={index}
                                    className="user-data d-flex justify-content-around leaderboard-bg font-robot"
                                  >
                                    <span style={{ width: "10%" }}>
                                      <img
                                        src={avatarData[submission.user.avatar]}
                                        className="user-image"
                                        alt="avatar"
                                      />
                                    </span>
                                    <div
                                      style={{ width: "40%" }}
                                      className="font-lightGrey"
                                    >
                                      {submission.user.username}
                                    </div>
                                    <span
                                      className="user-score"
                                      style={{ width: "40%" }}
                                    >
                                      {moment(submission.datetime)
                                        .startOf("minutes")
                                        .fromNow()}
                                    </span>
                                    <img src={rejected} alt="12" />
                                  </div>
                                );
                              }
                            })}
                          </React.Fragment>
                        )}

                        <div className="d-flex justify-content-center font-robot font-blue ">
                          <nav className="mt-4">
                            <div className="pagination">
                              {submissions?.previous && (
                                <span
                                  className="pagination-previous pagination-icon"
                                  onClick={() =>
                                    paginationSubmission(submissions.previous)
                                  }
                                >
                                  <i className="fas fa-arrow-left"></i>
                                </span>
                              )}

                              {submissions?.next && (
                                <span
                                  className="pagination-next pagination-icon ml-3"
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
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 pt-md-5">
                    <div className="d-flex font-vcr justify-content-between align-items-center py-3 font-lightGrey">
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
                              <option selected value={54}>
                                C++ (GCC 9.2.0)
                              </option>

                              {languages &&
                                languages?.map((lan, index) => (
                                  <option
                                    key={index}
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
                      <div
                        className="file-button font-vcr font-blue"
                        style={{ cursor: "pointer" }}
                      >
                        Choose File
                        <input
                          type="file"
                          value=""
                          onChange={(e) => {
                            setValue(".");
                            handleFileChosen(e.target.files[0]);
                          }}
                          className="hide-file"
                        />
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
                        className="output font-vcr px-2 py-2"
                        rows="5"
                        placeholder="Custom Input here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        id="custom"
                      />
                      <div className="d-flex justify-content-around lower-section-images ml-md-2">
                        <img
                          src={runCode}
                          alt="runCode"
                          className="see-all-button mr-3"
                          onClick={(e) =>
                            handleRunCode(e, value, languageId, input)
                          }
                        />

                        {user ? (
                          <div>
                            {!disabled ? (
                              <img
                                src={submitCode}
                                alt="submitCode"
                                style={{
                                  pointerEvents: disabled ? "none" : "inherit",
                                }}
                                className="see-all-button"
                                onClick={(e) => {
                                  handleSubmitCode(e, value);
                                }}
                              />
                            ) : (
                              <div className="text-center button-hover">
                                <div className="see-all-buttons font-vcr px-5 pt-2 pb-3 text-black">
                                  *WAIT*
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link to="/login">
                            <div className="text-center button-hover">
                              <div className="see-all-buttons font-vcr px-5 pt-2 pb-3 text-black">
                                *LOGIN*
                              </div>
                            </div>
                          </Link>
                        )}
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
