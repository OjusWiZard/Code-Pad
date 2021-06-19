import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Editor.css";
import IDE from "../../images/editor/IDE.svg";
import download from "../../images/editor/download.svg";
import Editor from "./Editor";

const Form = () => {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState([]);
  const [languageId, setLanguageId] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    async function abc() {
      const lang = await axios.get(
        "https://467ff821670c.in.ngrok.io/languages"
      );
      console.log(lang);
      // setLanguage(new Object(lang.data));
    }
    abc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      source_code: value,
      language_id: languageId,
    };
    try {
      const res = await axios.post(
        "https://467ff821670c.in.ngrok.io/submissions/?wait=true",
        JSON.stringify(data),
        config
      );
      setInput(res.data.status.description);
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
              <div className="d-flex justify-content-center pt-lg-5">
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
                <div className="d-flex font-vcr justify-content-between align-items-center py-3">
                  <select onChange={(e) => setLanguageId(e.target.value)}>
                    {language.map((lan) => (
                      <option value={lan.id}>{lan.name}</option>
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
              <textarea className="output w-100" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
