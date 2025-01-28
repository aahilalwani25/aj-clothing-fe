"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened((p) => !p);

  return (
    <ModalContext.Provider
      value={{
        isModalOpened,
        setIsModalOpened,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext =()=> useContext(ModalContext);
