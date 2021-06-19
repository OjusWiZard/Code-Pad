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
        defaultLanguage="c"
        theme="vs-dark"
        height="50vh"
        options={{
          acceptSuggestionOnCommitCharacter: "true",
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          automaticLayout: "true",
          colorDecorators: "true",
          contextmenu: "true",
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: "true",
          cursorStyle: "line",
          dragAndDrop: "true",
          fixedOverflowWidgets: "true",
          folding: "true",
          foldingStrategy: "auto",
          fontLigatures: "true",
          formatOnPaste: "true",
          formatOnType: "true",
          hideCursorInOverviewRuler: "true",
          highlightActiveIndentGuide: "true",
          multiCursorMergeOverlapping: "true",
          multiCursorModifier: "alt",
          overviewRulerBorder: "true",
          overviewRulerLanes: 2,
          quickSuggestions: "true",
          quickSuggestionsDelay: 100,
          renderControlCharacters: true,
          renderFinalNewline: "true",
          renderIndentGuides: "true",
          renderLineHighlight: "all",
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: "true",
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: "true",
          selectOnLineNumbers: "true",
          selectionClipboard: "true",
          selectionHighlight: "true",
          showFoldingControls: "mouseover",
          smoothScrolling: true,
          suggestOnTriggerCharacters: "true",
          wordBasedSuggestions: "true",
          wordWrap: "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapBreakObtrusiveCharacters: ".",
          wordWrapColumn: 80,
          wordWrapMinified: "true",
          wrappingIndent: "none",
        }}
      />
    </React.Fragment>
  );
};

export default Editor;
