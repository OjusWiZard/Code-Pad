import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Editor.css";
import IDE from "../../images/editor/IDE.svg";
import download from "../../images/editor/download.svg";
import Editor from "./Editor";

const Form = () => {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [languageId, setLanguageId] = useState(54);
  const langData = [
    { id: 46, name: "shell" },
    { id: 50, name: "c" },
    { id: 51, name: "csharp" },
    { id: 54, name: "cpp" },
    { id: 55, name: "clojure" },
    { id: 58, name: "kotlin" },
    { id: 60, name: "go" },
    { id: 62, name: "java" },
    { id: 63, name: "javascript" },
    { id: 64, name: "lua" },
    { id: 67, name: "pascal" },
    { id: 68, name: "php" },
    { id: 70, name: "python" },
    { id: 71, name: "python" },
    { id: 72, name: "ruby" },
    { id: 73, name: "rust" },
    { id: 74, name: "typescript" },
    { id: 75, name: "c" },
    { id: 76, name: "cpp" },
    { id: 78, name: "kotlin" },
    { id: 79, name: "objective-c" },
    { id: 80, name: "r" },
    { id: 81, name: "scala" },
    { id: 82, name: "sql" },
    { id: 83, name: "swift" },
    { id: 84, name: "vb" },
    { id: 85, name: "perl" },
    { id: 86, name: "clojure" },
    { id: 87, name: "fsharp" },
  ];
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "LetUsCodeHackNCS",
    },
  };
  useEffect(() => {
    async function getLanguages() {
      const lang = await axios.get(
        "https://judge.hackncs.com/languages",
        config
      );
    }
    getLanguages();
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
      let out = res.data.stdout !== null ? atob(res.data.stdout) : null;
      setOutput(out || res.data.status.description);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container pt-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5 py-lg-3">
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
                  <img src={download} alt="Download" />
                </div>
                <Editor
                  language={language}
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
                    <button type="submit"></button>
                  </div>
                </div>
              </form>

              <p className="font-vcr font-blue font-weight-bold mt-5 text-center mb-3">
                &lt;&lt;&nbsp;&nbsp;HELLO OUTPUT&nbsp;&nbsp;&gt;&gt;
              </p>
              <textarea
                className="output w-100 font-vcr"
                rows="5"
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
