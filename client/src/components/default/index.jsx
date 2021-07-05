import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../context/context";
import Modal from "../../components/modal/index";
function Default() {
  // const { modalOpen, closeModal, message, modalHeading } =
  //   useContext(ModalContext);
  // useEffect(() => {
  //   modalOpen("Are you lost babygirl?", "okay");
  // }, []);
  return (
    <div>
      Are you lost bbg?
      {/* <Modal />; */}
    </div>
  );
}

export default Default;
