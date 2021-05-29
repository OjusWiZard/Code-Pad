import React, { useState } from "react";
import Axios from "axios";
import "./Editor.css";
import IDE from "../../images/editor/IDE.png";
import download from "../../images/editor/download.png";
import Editor from "./Editor";

const Form = () => {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const langData = {
    cpp: "text/x-c++src",
    c: "text/x-csrc",
    java: "text/x-java",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      code: value,
      lang: Object.keys(langData).find((key) => langData[key] === language),
      input,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("ok", data);
    try {
      const res = await Axios.post(
        "https://cors-anywhere.herokuapp.com/http://ide.shoa-apps.live/api/question/run",
        JSON.stringify(data),
        config
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(language, JSON.stringify(value));
  };
  const [language, setLanguage] = useState("text/x-c++src");
  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-10 col-10 mx-auto my-5 content-background px-lg-5 py-5">
              <div className="d-flex justify-content-center pt-5">
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
                  <select onChange={(e) => changeLanguage(e)} value={language}>
                    <option value="text/x-c++src">C++</option>
                    <option value="text/x-csrc">C</option>
                    <option value="text/x-java">Java</option>
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
                <div className="mt-3">
                  <textarea
                    className="output w-100"
                    rows="10"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    id="custom"
                  />
                </div>
                <div className="text-center mt-4">
                  <button type="submit"></button>
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
