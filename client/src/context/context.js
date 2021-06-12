import React, { useState } from "react";

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const [state, setState] = useState({
    modalOpen: false,
    errorMessage: [],
  });
  const openModal = (err) => {
    console.log(err);
    const errVal = Object.values(err);
    const errKey = Object.keys(err);    
    setState((prevState) => ({
      ...prevState,
      errorMessage: [...errVal, ...errKey],
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
