"use client";
import ProductsTable from "@/components/ProductsTable";
import { apiHelper } from "@/helpers/apiHelper";
import Layout from "@/Layout/Layout";
import React, { useEffect, useState } from "react";
import WithAdminAuth from "../../components/withAdminAuth";
import { Button } from "@heroui/react";
import { useModalContext } from "@/Providers/ModalProvider";
import AddProductFormModal from "@/components/Modals/AddProductModalForm";

function Page() {
  const [products, setProducts] = useState(null);
  const [searchProduct, setSearchProduct] = useState(null);
  const { isModalOpened, toggleModal } = useModalContext();

  const getProducts = async () => {
    const res = await apiHelper({
      method: "GET",
      endpoint: "get-products",
    });

    if (res?.status === 200) {
      console.log(res);
      setProducts(res?.data);
    }
  };

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, [products]);

  const filteredProducts = searchProduct
    ? products?.filter((product) =>
        product?.title?.toLowerCase()?.includes(searchProduct)
      )
    : products;

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 flex flex-row justify-between gap-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
            <Button
              onPress={(e) => toggleModal()}
              className="bg-black text-white"
            >
              Add Product
            </Button>
          </div>
          {/* Show this button only on mobile devices */}
          {/* <div className="flex sm:hidden mt-3 justify-end mx-2">
          <Button className="bg-black text-white">Add Product</Button>
        </div> */}
        </div>
        <ProductsTable products={filteredProducts} />
      </div>
      {isModalOpened && (
        <AddProductFormModal
          isOpen={isModalOpened}
          onOpenChange={toggleModal}
        />
      )}
    </>
  );
}

export default WithAdminAuth(Page);
