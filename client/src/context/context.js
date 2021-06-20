import React, { useState } from "react";

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const [state, setState] = useState({
    modalOpen: false,
    errorMessage: {},
    message: "",
  });
  const formMessage = (e) => {
    setState((prevState) => ({
      ...prevState,
      errorMessage: Object.assign({}, e),
    }));
  };
  const openModal = (e) => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: true,
      message: e,
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
