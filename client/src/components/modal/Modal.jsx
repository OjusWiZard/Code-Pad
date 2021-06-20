import React, { useContext } from "react";
import { ModalContext } from "../../context/context";
import okay from "../../images/common/okay.svg";
import "./modal.css";

function Modal() {
  const { modalOpen, closeModal, message } = useContext(ModalContext);
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
                className="col-8 mx-auto col-md-6 col-lg-4 text-center py-5 px-5"
              >
                <h4 className="font-vcr font-blue mb-4 text-center font-weight-bold">
                  &lt;&lt;&nbsp;&nbsp;Welcome wizard!&nbsp;&nbsp;&gt;&gt;
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
