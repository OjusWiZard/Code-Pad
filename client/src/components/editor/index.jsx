import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "../modal/index";
import Editor from "./Editor";
import { ModalContext } from "../../context/context";

// Image imports
import IDE from "../utils/IDELogo";

// CSS imports
import "./Editor.css";

const Form = () => {
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
  const { openModal } = useContext(ModalContext);
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [outputData, setOutputData] = useState({
    status: "",
    memory: "",
    time: "",
  });
  const [output, setOutput] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageId, setLanguageId] = useState(54);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "LetUsCodeHackNCS",
    },
  };
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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_JUDGELANGUAGE}`, config).then((data) => {
      setLanguages(
        data.data.filter(
          (lang) => lang.id !== 54 && lang.id !== 44 && lang.id !== 89
        )
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
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
      const res = await axios.post(
        `${process.env.REACT_APP_JUDGEHOST}`,
        data,
        config
      );
      setOutputData({
        ...outputData,
        memory: res.data.memory,
        time: res.data.time,
        status: res.data.status.description,
      });
      window.scrollTo(0, document.body.scrollHeight);
      let out =
        res.data.stdout !== null
          ? b64DecodeUnicode(res.data.stdout)
          : b64DecodeUnicode(res.data.compile_output);
      setOutput(out || res.data.status.description);
    } catch (error) {
      if (error.message === "URI malformed") {
        setOutput("No Output");
        return;
      }
      openModal("Write some code");
      <Modal />;
    }
  };

  return (
    <>
      <div className="main-background">
        <div className="container pt-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-10 col-10 mx-auto my-5 content-background px-lg-5 py-lg-3">
              <div className="d-flex justify-content-center pt-sm-5">
                <IDE />
              </div>
              <p className="font-robot font-lightGrey text-justify mt-3 pt-3 font-14 font-weight-bold text-center mb-4">
                Compile & run your code with the Codepad online IDE. Our online
                compiler supports multiple programming languages like C++, C,
                Java, Python Kotlin, NodeJS, and many more.
              </p>
              <form onSubmit={(e) => handleSubmit(e)}>
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
                          <option
                            selected
                            value={54}
                            className="font-lightGrey"
                          >
                            C++ (GCC 9.2.0)
                          </option>
                          {languages?.map((lan) => (
                            <option value={lan.id} className="font-lightGrey">
                              {lan.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="input-group" style={{ width: "auto", cursor:"pointer" }}>
                    <div className="pixel-input-wrapper">
                      <span></span>
                      <div
                        className="pixel-input file-button font-vcr font-blue"
                        style={{ whiteSpace: "pre" }}
                      >
                        Choose File
                        <input
                          type="file"
                          className="hide-file"
                          value=""
                          onChange={(e) => {
                            setValue(".");
                            handleFileChosen(e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Editor
                  languageId={languageId}
                  displayName="Code"
                  value={value}
                  input={input}
                  onChange={setValue}
                  resizeable
                ></Editor>

                <div className="lower-section d-flex w-100 justify-content-between align-item-start pt-5">
                  <div className="textarea-input ">
                    <textarea
                      className="output w-80 font-vcr px-2"
                      rows="3"
                      placeholder="Custom Input here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      id="custom"
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="see-all-buttons"></button>
                  </div>
                </div>
              </form>
              <p className="font-vcr font-blue font-weight-bold mt-5 text-center mb-3">
                &lt;&lt;&nbsp;&nbsp;HELLO OUTPUT&nbsp;&nbsp;&gt;&gt;
              </p>
              {output && (
                <div className="d-flex justify-content-between p-3 bg-black">
                  <div className="font-vcr font-blue">
                    Status: {outputData?.status}
                  </div>
                  <div className="font-vcr font-lightGrey">
                    {outputData?.time && (
                      <span>Time: {outputData?.time} sec</span>
                    )}
                  </div>
                  <div className="font-vcr font-lightGrey">
                    {outputData?.time && (
                      <span>Memory: {outputData?.memory} kB</span>
                    )}
                  </div>
                </div>
              )}
              <textarea
                className="output mb-2 w-100 font-robot px-3 py-2"
                rows="10"
                value={output}
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
