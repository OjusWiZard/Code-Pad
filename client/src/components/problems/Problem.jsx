import React, { useEffect, useState } from "react";
import logo from "../../images/home/logo.svg";
import line from "../../images/home/line.svg";
import button from "../../images/home/button.svg";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";
import { useParams } from "react-router-dom";
import Editor from "../editor/Editor";
import { getProblem } from "../../api/index";
import { Resizable } from "re-resizable";

function Problem() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState();
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState([]);
  const [languageId, setLanguageId] = useState("");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  useEffect(() => {
    getProblem(params.slug).then((data) => {
      setProblem(data);
      setLoading(false);
    });
  }, []);

  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width);
    setHeight(size.height);
  };
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-background">
          <div className="problem-wrapper pt-sm-5">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-12 col-lg-10 col-md-10 col-sm-11 col-11 mx-auto my-md-5 my-2 content-background">
                <div className="row">
                  <div className="col-lg-5 col-md-12 col-sm-12 col-12 pt-md-5">
                    <Resizable
                      defaultSize={{
                        width: 500,
                        height: 500,
                      }}
                    >
                      <div className="d-flex justify-content-center font-vcr font-blue">
                        {problem?.title}
                      </div>
                      <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                      <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                      <p className="font-robot font-lightGrey mt-5 font-14 font-weight-bold px-xl-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </Resizable>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 pt-md-5">
                    <Resizable
                      defaultSize={{
                        width: 200,
                        height: 500,
                      }}
                    >
                      <Editor
                        language={language}
                        displayName="Code"
                        value={value}
                        input={input}
                        onChange={setValue}
                      ></Editor>
                    </Resizable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Problem;
