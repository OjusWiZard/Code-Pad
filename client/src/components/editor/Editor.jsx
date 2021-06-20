import "codemirror/lib/codemirror.css";
import Editor1 from "@monaco-editor/react";
import React from "react";

const Editor = ({ language, value, onChange, inputChange, input }) => {
  // const handleChange = (editor, data, value) => {
  //   onChange(value);
  // };

  var sources = {
    45: "assemblySource",
    46: "bashSource",
    47: "basicSource",
    48: "cSource",
    49: "cSource",
    50: "cSource",
    51: "csharpSource",
    52: "cppSource",
    53: "cppSource",
    54: "cppSource",
    55: "lispSource",
    56: "dSource",
    57: "elixirSource",
    58: "erlangSource",
    44: "executableSource",
    59: "fortranSource",
    60: "goSource",
    61: "haskellSource",
    62: "javaSource",
    63: "javaScriptSource",
    64: "luaSource",
    65: "ocamlSource",
    66: "octaveSource",
    67: "pascalSource",
    68: "phpSource",
    43: "plainTextSource",
    69: "prologSource",
    70: "pythonSource",
    71: "pythonSource",
    72: "rubySource",
    73: "rustSource",
    74: "typescriptSource",
    75: "cSource",
    76: "cppSource",
    77: "cobolSource",
    78: "kotlinSource",
    79: "objectiveCSource",
    80: "rSource",
    81: "scalaSource",
    82: "sqliteSource",
    83: "swiftSource",
    84: "vbSource",
    85: "perlSource",
    86: "clojureSource",
    87: "fsharpSource",
    88: "groovySource",
  };

  return (
    <React.Fragment>
      <Editor1
        className="code-mirror-wrapper"
        language={language}
        defaultLanguage="cpp"
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
