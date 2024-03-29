import React from "react";
import Editor1 from "@monaco-editor/react";

// Code Mirror Css
import "codemirror/lib/codemirror.css";

const Editor = ({ value, onChange, languageId }) => {
  let judgeIdToMonaco = {
    46: "shell",
    48: "c",
    49: "c",
    50: "c",
    51: "csharp",
    52: "cpp",
    53: "cpp",
    54: "cpp",
    55: "clojure",
    57: "kotlin",
    58: "kotlin",
    60: "go",
    62: "java",
    63: "javascript",
    64: "lua",
    67: "pascal",
    68: "php",
    70: "python",
    71: "python",
    72: "ruby",
    73: "rust",
    74: "typescript",
    75: "c",
    76: "cpp",
    78: "kotlin",
    79: "objective-c",
    80: "r",
    81: "scala",
    82: "sql",
    83: "swift",
    84: "vb",
    85: "perl",
    86: "clojure",
    87: "fsharp",
  };
  return (
    <>
      <Editor1
        className="code-mirror-wrapper"
        language={judgeIdToMonaco[languageId]}
        defaultLanguage="cpp"
        theme="vs-dark"
        value={value}
        height="50vh"
        automaticLayout={true}
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
    </>
  );
};

export default Editor;
