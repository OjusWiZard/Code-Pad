import React, { useState } from "react";

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const [state, setState] = useState({
    modalOpen: false,
    errorMessage: {},
    message: "",
    modalHeading: "",
  });

  const clearErrors = () => {
    setState((prevState) => ({
      ...prevState,
      errorMessage: {},
    }))
  }

  const formMessage = (e) => {
    setState(() => ({
      errorMessage: Object.assign({}, e),
    }));
  };
  const openModal = (e, head) => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: true,
      message: e,
      modalHeading: head,
    }));
  };
  const closeModal = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));
  };
  return (
    <ModalContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        formMessage,
        clearErrors
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
