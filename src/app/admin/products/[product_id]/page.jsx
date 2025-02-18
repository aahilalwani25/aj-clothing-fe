"use client";
import { apiHelper } from "@/helpers/apiHelper";
import formatDate from "@/utils/dateFormat";
import { shrinkOrderId } from "@/utils/orderIdShrik";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

function Page() {
  const product_id = usePathname()?.split("/")[3];
  const [productDetails, setProductDetails] = useState(null);

  const getProduct = useCallback(async () => {
    const res = await apiHelper({
      method: "GET",
      endpoint: `get-product?product_id=${product_id}`,
    });

    if (res?.status === 200) {
      setProductDetails(res?.data);
    }
  },[productDetails]);

  useEffect(() => {
    //if (!productDetails) {
      getProduct();
    //}
  }, []);

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col px-2">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Product #{shrinkOrderId(product_id)}
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            Created at {formatDate(productDetails?.createdAt)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <img
          //alt={productDetails.title}
          src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${productDetails?.main_image}`}
          className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="w-auto h-auto border text-black gap-10 px-3 py-6">
          <h3 className="font-bold break-words max-w-full">{productDetails?.title}</h3>
          <span
            className={`px-6 py-1 text-xs font-semibold rounded-full left-2 right-2 ${
              productDetails?.availability === "In stock"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {" " + productDetails?.availability + " "}
          </span>
          <div>Rs. {productDetails?.price}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
