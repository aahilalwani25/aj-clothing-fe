"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import ProductDetailsModal from "@/components/Modals/ProductDetailsModal";
import ProductList from "@/components/ProductList";
import { apiHelper } from "@/helpers/apiHelper";
import Layout from "@/Layout/Layout";
import { useModalContext } from "@/Providers/ModalProvider";
import { useProductSelectedContext } from "@/Providers/productSelectedProvider";
import React, { useEffect, useState } from "react";

function Page() {
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
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-screen">
      <Breadcrumb path={"bin-saeed-vol-1"}/>
        {productLists?.length > 0 ? (
          <ProductList
            valueToBeFiltered={"Bin Saeed embroided stitched 3 peice lawn"}
            products={productLists}
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
        <Footer/>
      </div>
    </Layout>
  );
}

export default Page;
