import "codemirror/lib/codemirror.css";
import Editor1 from "@monaco-editor/react";
import React from "react";

const Editor = ({ language, value, onChange, inputChange, input }) => {
  // const handleChange = (editor, data, value) => {
  //   onChange(value);
  // };
  return (
    <React.Fragment>
      <Editor1
        className="code-mirror-wrapper"
        language={language}
        theme="vs-dark"
        value={value}
        height="50vh"
        onChange={onChange}
        options={{
          acceptSuggestionOnEnter: "smart",
          autoIndent: "advanced",
          colorDecorators: "true",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "true",
          dragAndDrop: "true",
          folding: "true",
          formatOnPaste: "true",
          formatOnType: "true",
          links: "true",
          renderControlCharacters: "true",
          smoothScrolling: true,
          wrappingIndent: "same",
        }}
      />
    </React.Fragment>
  );
};

export default Editor;
