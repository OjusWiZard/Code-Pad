import React from "react";
import okay from "../../images/common/okay.svg";
import "./modal.css";

function Modal({ errorMessage }) {
  const modalState = localStorage.getItem("modal") || false;
  const closeModal = () => {
    localStorage.setItem("modal", false);
  };
  if (!modalState) {
    return null;
  } else {
    return (
      <div>
        <div className="modal-container">
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto col-md-6 col-lg-4 text-center p-5"
              >
                <p className="font-blue font-vcr" style={{ fontSize: "20px" }}>
                  {errorMessage}Error Bla bla bla bla bla bla
                </p>

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
      </div>
    );
  }
}

export default Modal;
