import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/mode/clike/clike";
import React from "react";

const Editor = ({ language, value, onChange, inputChange, input }) => {
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <React.Fragment>
      <CodeMirror
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: "text/x-csrc",
          theme: "material",
          lineNumbers: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
        }}
      ></CodeMirror>
    </React.Fragment>
  );
};

export default Editor;
