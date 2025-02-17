"use client";
import WithAdminAuth from "@/components/withAdminAuth";
import { apiHelper } from "@/helpers/apiHelper";
import formatDate from "@/utils/dateFormat";
import { fetchImageOfProducts } from "@/utils/fetchImageOfProducts";
import { shrinkOrderId } from "@/utils/orderIdShrik";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

function Page({ params }) {
  const [order_details, setOrderDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const order_id = usePathname()?.split("/")[3];

  const getOrderAndProductDetails = async () => {
    const res = await apiHelper({
      method: "GET",
      endpoint: `get-orders?order_id=${order_id}`,
    });

    if (res?.status === 200) {
      setOrderDetails(res?.data);

      const products = res?.data?.products || [];
      let total = 0;

      const prodDetails = await Promise.all(
        products.map(async (p) => {
          const res = await apiHelper({
            method: "GET",
            endpoint: `get-product?product_id=${p?.product_id}`,
          });

          if (res?.status === 200) {
            total += p?.quantity * res?.data?.price;
            return { ...res.data, quantity: p?.quantity };
          }
          return null;
        })
      );

      setProductDetails(prodDetails.filter(Boolean)); // Remove null values if any request fails
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    if (order_id) {
      getOrderAndProductDetails();
    }
  }, [order_id]); // Runs only once when order_id is available

  return (
    <>
      <div className="text-black font-bold">Order Details</div>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #{shrinkOrderId(order_id)}
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            Ordered at {formatDate(order_details?.createdAt)}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          {/* Cart Section */}
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white dark:bg-gray-800 table-auto">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="py-3 px-4 text-left text-gray-800 dark:text-white text-sm md:text-base">
                        Product
                      </th>
                      <th className="py-3 px-4 text-left text-gray-800 dark:text-white text-sm md:text-base">
                        Qty
                      </th>
                      <th className="py-3 px-4 text-left text-gray-800 dark:text-white text-sm md:text-base">
                        Original Price (Rs.)
                      </th>
                      <th className="py-3 px-4 text-left text-gray-800 dark:text-white text-sm md:text-base">
                        Total Price (Rs.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetails?.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 text-black"
                      >
                        <td className="py-4 px-4 flex items-center space-x-2 md:space-x-4">
                          <img
                            className="w-12 h-12 md:w-16 md:h-16"
                            src={fetchImageOfProducts(product?.main_image)}
                            alt={product.title}
                          />
                          <span className="text-sm md:text-base dark:text-white">
                            {product.title}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm md:text-base">
                          {product.quantity < 10
                            ? `0${product?.quantity}`
                            : product?.quantity}
                        </td>
                        <td className="py-4 px-4 text-sm md:text-base">
                          {product?.price}
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-800 dark:text-white text-sm md:text-base">
                          {product?.quantity * product?.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-lg md:text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex flex-col border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <p className="text-sm md:text-base dark:text-white text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-sm md:text-base dark:text-gray-300 text-gray-600">
                      Rs. {totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm md:text-base dark:text-white text-gray-800">
                      Shipping
                    </p>
                    <p className="text-sm md:text-base dark:text-gray-300 text-gray-600">
                      Rs. 150
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm md:text-base dark:text-white font-semibold text-gray-800">
                    Total
                  </p>
                  <p className="text-sm md:text-base dark:text-gray-300 font-semibold text-gray-600">
                    ${totalPrice+150}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex flex-col px-4 py-6 md:p-6 xl:p-8">
            <h3 className="text-lg md:text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col space-y-4 border-b border-gray-200 py-4">
              <p className="text-base dark:text-white font-semibold text-gray-800">
                {order_details?.customer?.first_name}{" "}
                {order_details?.customer?.last_name}
              </p>
            </div>
            <div className="flex flex-col space-y-4 py-4">
              <p className="text-sm dark:text-white leading-6 text-gray-600">
                📍 {order_details?.customer?.address}
              </p>
              <p className="text-sm dark:text-white leading-6 text-gray-600">
                📞 {order_details?.customer?.phone_number}
              </p>
              <p className="text-sm dark:text-white leading-6 text-gray-600">
                ✉️ {order_details?.customer?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithAdminAuth(Page);
