"use client";
import { apiHelper } from "@/helpers/apiHelper";
import { useModalContext } from "@/Providers/ModalProvider";
import { useDisclosure } from "@heroui/react";
import React, { useEffect, useState } from "react";
import CustomDrawer from "../CustomDrawer";
import ProductList from "../ProductList";
import Nav from "../Nav";
import { useProductSelectedContext } from "@/Providers/productSelectedProvider";
import ProductDetailsModal from "../ProductDetailsModal";
import Layout from "@/Layout/Layout";

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        <ProductList products={productLists} />
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
