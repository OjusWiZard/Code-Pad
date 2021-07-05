import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../context/context";
import okay from "../../images/common/okay.svg";
import "./modal.css";

function Modal() {
  const [heading, setHeading] = useState("Error");
  const { modalOpen, closeModal, message, modalHeading } =
    useContext(ModalContext);
  const messages = [
    "Hello, sunshine!",
    "Howdy, partner!",
    "Hey, howdy, hi!",
    "What’s kickin’, little chicken?",
    "Peek-a-boo!",
    "Howdy-doody!",
    "Hey there, freshman!",
    "Hi, mister!",
    "I come in peace!",
    "Put that cookie down!",
    "Ahoy, matey!",
    "Hiya!",
    "‘Ello, gov'nor!",
    "Top of the mornin’ to ya!",
    "What’s crackin’?",
    "‘Sup, homeslice?",
    "This call may be recorded for training purposes.",
    "Howdy, howdy ,howdy!",
    "I'm Batman.",
    "Here's Johnny!",
    "Yo!",
    "Whaddup.",
    "Greetings and salutations!",
  ];
  useEffect(() => {
    if (modalHeading) {
      const random = Math.floor(Math.random() * 22);
      setHeading(messages[random]);
    } else {
      setHeading("Error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  if (!modalOpen) {
    return null;
  } else {
    return (
      <>
        <div className="modal-container">
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto col-md-6 col-lg-6 text-center py-5 px-xl-3"
              >
                <h4 className="font-vcr font-blue mb-4 text-center font-weight-bold">
                  &lt;&lt;&nbsp;{heading}&nbsp;&gt;&gt;
                </h4>
                <p className="font-blue font-vcr">{message}</p>

                <div
                  onClick={() => closeModal()}
                  className="mt-4"
                  style={{ cursor: "pointer" }}
                >
                  <img src={okay} alt="okay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
