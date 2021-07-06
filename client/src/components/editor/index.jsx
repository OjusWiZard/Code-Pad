import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "../modal/index";
import { ModalContext } from "../../context/context";
import "./Editor.css";
import IDE from "../../images/editor/IDE.svg";
// import download from "../../images/editor/download.svg";
import Editor from "./Editor";

const Form = () => {
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
    axios.get("https://judge.hackncs.com/languages", config).then((data) => {
      setLanguages(data.data);
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
        "https://judge.hackncs.com/submissions/?wait=true&base64_encoded=true",
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
          ? atob(res.data.stdout)
          : atob(res.data.compile_output);
      setOutput(out || res.data.status.description);
    } catch (error) {
      openModal("Type something duh");
      <Modal />;
    }
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container pt-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-10 col-10 mx-auto my-5 content-background px-lg-5 py-lg-3">
              <div className="d-flex justify-content-center pt-sm-5">
                <img id="logo" src={IDE} alt="IDE" className="img-fluid" />
              </div>
              <p className="font-robot font-lightGrey text-justify mt-5 pt-3 font-14 font-weight-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. amet
                qui! Sed, distinctio maiores consequatur velit, voluptatibus
                deleniti voluptate suscipit corrupti odio amet inventore sunt,
                esse molestiae et iusto tenetur laboriosam ipsam ab nemo harum
                impedit.
              </p>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="d-flex font-vcr justify-content-between align-items-center py-3 font-lightGrey">
                  <div className="input-group w-50">
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
                            <option value={lan.id} className="font-lightGrey">
                              {lan.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* <img src={download} alt="Download" /> */}
                  <div className="file-button font-vcr font-blue">
                    Choose File
                    <input
                      type="file"
                      value=""
                      onChange={(e) => handleFileChosen(e.target.files[0])}
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
                <div className="lower-section d-flex w-100 justify-content-between">
                  <div className="textarea-input mt-3">
                    <textarea
                      className="output w-100 font-vcr px-2 py-2"
                      rows="10"
                      placeholder="Custom Input here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      id="custom"
                    />
                  </div>
                  <div className="text-center mt-4">
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
                className="output w-100 font-vcr"
                rows="10"
                value={output}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
