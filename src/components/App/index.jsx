"use client";
import { apiHelper } from "@/helpers/apiHelper";
import { useModalContext } from "@/Providers/ModalProvider";
import React, { useEffect, useState } from "react";
import ProductList from "../ProductList";
import { useProductSelectedContext } from "@/Providers/productSelectedProvider";
import ProductDetailsModal from "../Modals/ProductDetailsModal";

function App({ valueToBeFiltered = null, gender = null }) {
  const [productLists, setProductLists] = useState(null);
  const { isModalOpened, toggleModal } = useModalContext();
  const { productSelected } = useProductSelectedContext();

  const fetchProducts = async () => {
    const res = await apiHelper({
      endpoint: "get-products",
      method: "GET",
    });
    if (res.status == 200) {
      setProductLists(res?.data);
    }
  }; //, [productLists]);

  useEffect(() => {
    if (productLists === null) {
      fetchProducts();
    }
  }, [productLists]);
  return (
    <>
      {productLists?.length > 0 ? (
        <ProductList
          products={productLists}
          valueToBeFiltered={valueToBeFiltered}
          gender={gender}
        />
      ) : (
        <div>No Products to show</div>
      )}
      {isModalOpened && (
        <ProductDetailsModal
          isOpen={isModalOpened}
          onOpenChange={toggleModal}
          product={productSelected}
        />
      )}
    </>
  );
}

export default App;
