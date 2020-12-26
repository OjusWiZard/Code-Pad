import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Editor from "./components/Editor/Editor";
function App() {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const langData = {
    cpp: "text/x-c++src",
    c: "text/x-csrc",
    java: "text/x-java"
  }
  const [language, setLanguage] = useState("text/x-c++src");
  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };


  return (
    <div className="App">
      <h2 align="center">NCS CODEPAD</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let data = {
            code: value,
            lang: Object.keys(langData).find(key => langData[key] === language),
            input,
          }
          const config = {
            headers: {
              "Content-Type": "application/json"
            }
          }
          console.log('ok', data);
          try {

            const res = await Axios.post("http://ide.shoa-apps.live/api/question/run", JSON.stringify(data), config)
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }

          console.log(language, JSON.stringify(value));
        }}
      >
        <select onChange={(e) => changeLanguage(e)} value={language}>
          <option value="text/x-c++src">C++</option>
          <option value="text/x-csrc">C</option>
          <option value="text/x-java">Java</option>
        </select>
        <Editor
          language={language}
          displayName="Code"
          value={value}
          input={input}
          inputChange={setInput}
          onChange={setValue}
        ></Editor>
        <button type="submit">Submit Code</button>
      </form>
    </div>
  );
}

export default App;
