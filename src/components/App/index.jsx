import { apiHelper } from "@/app/helpers/apiHelper";
import { useModalContext } from "@/app/Providers/ModalProvider";
import { useDisclosure } from "@heroui/react";
import React, { useEffect, useState } from "react";
import CustomDrawer from "../CustomDrawer";
import ProductList from "../ProductList";
import Nav from "../Nav";
import { useProductSelectedContext } from "@/app/Providers/productSelectedProvider";
import ProductDetailsModal from "../ProductDetailsModal";

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
      <div className="w-full h-full bg-white">
        <div>
          <Nav onOpenCart={onOpen} />
        </div>
        {/* <div className="md:pt-8 sm:pt-20">
        <Hero />
      </div> */}
        {productLists?.length > 0 ? (
          <ProductList products={productLists} />
        ) : (
          <div>No Products to show</div>
        )}
      </div>
      <CustomDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
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
