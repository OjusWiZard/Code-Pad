import React, { useState } from "react";

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const [state, setState] = useState({
    modalOpen: false,
    errorMessage: "",
  });
  const openModal = (err) => {
    setState((prevState) => ({
      ...prevState,
      errorMessage: "Please fill in all the fields",
      modalOpen: true,
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
