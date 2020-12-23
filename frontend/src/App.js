import "./App.css";
import { useState } from "react";
import Editor from "./components/Editor/Editor";
function App() {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("text/x-c++src");
  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div className="App">
      Codepad
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.table(language, value);
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
          onChange={setValue}
        ></Editor>
        <button type="submit">Submit Code</button>
      </form>
    </div>
  );
}

export default App;
