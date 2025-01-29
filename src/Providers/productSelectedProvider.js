"use client";
import { createContext, useContext, useState } from "react";

const ProductSelectedContext = createContext();

export const ProductSelectedProvider = ({ children }) => {
  const [productSelected, setProductSelected] = useState(null);

  //const toggleProductSelected = () => setIsProductSelectedOpened((p) => !p);

  return (
    <ProductSelectedContext.Provider
      value={{
        productSelected,
        setProductSelected,
        //toggleProductSelected,
      }}
    >
      {children}
    </ProductSelectedContext.Provider>
  );
};

export const useProductSelectedContext =()=> useContext(ProductSelectedContext);
