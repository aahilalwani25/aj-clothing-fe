"use client";

import { apiHelper } from "@/helpers/apiHelper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoModal from "../InfoModal";
import { useModalContext } from "@/Providers/ModalProvider";
import { clearCart } from "@/redux/slices/cartSlice";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const totalAmount = cart?.items.reduce((acc, item) => acc + item.price, 0);
  const { isModalOpened, toggleModal } = useModalContext();
  const dispatch = useDispatch();
  const deliveryCharges=150;

  const [customerInfo, setCustomerInfo] = useState({
    email: null,
    first_name: null,
    last_name: null,
    phone_number: null,
    address: null,
    city: null,
    state: null,
    zip_code: null,
  });

  const orderInfo = cart?.items?.map((c) => ({
    product_id: c?.product_id,
    quantity: c?.quantity,
  }));

  const setInfoOfCustomer = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the field based on input's name
    }));
  };

  const createCustomerAndReturnId = async () => {
    const res = await apiHelper({
      method: "POST",
      endpoint: "create-customer",
      body: {
        customer_info: customerInfo,
      },
    });

    if (res?.status === 200) {
      const data = await res.data;
      const customer_id = data?.customer_id;
      return customer_id;
    }
    return null;
  };

  const onSubmitOrder = async (e) => {
    //e.preventDefault();
    const customer_id = await createCustomerAndReturnId();
    console.log(customer_id);
    const res = await apiHelper({
      method: "POST",
      endpoint: "create-orders",
      body: {
        customer_id: customer_id,
        products: orderInfo,
      },
    });

    if (res?.status === 200) {
      console.log(res?.data);
      dispatch(clearCart());
    }
  };

  return (
    <>
      <div className="font-sans bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gray-100 sm:h-full sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 overflow-auto sm:h-[calc(100vh-70px)]">
                <div className="space-y-4 sm:pb-20">
                  {cart?.items?.map((product) => (
                    <div
                      key={product.product_id}
                      className="flex items-start gap-4"
                    >
                      <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${product?.main_image}`}
                          className="w-full object-contain"
                          alt={product.title}
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm lg:text-base text-gray-800">
                          {product.title}
                        </h3>
                        <ul className="text-xs text-gray-800 space-y-1 mt-3">
                          <li className="flex flex-wrap gap-4">
                            Quantity{" "}
                            <span className="ml-auto">{product.quantity}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price{" "}
                            <span className="ml-auto">Rs. {product.price}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4 sticky">
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                  Delivery Charges <span className="ml-auto">Rs. {deliveryCharges}</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base font-bold text-gray-800">
                  Total <span className="ml-auto">Rs. {totalAmount+deliveryCharges}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-0 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <div className="mt-8">
              <div>
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  <input
                    type="number"
                    name="phone_number"
                    placeholder="Phone No."
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address"
                    onChange={setInfoOfCustomer}
                    placeholder="Address Line"
                    className="input-field text-black"
                  />
                  <input
                    type="text"
                    name="city"
                    onChange={setInfoOfCustomer}
                    placeholder="City"
                    className="input-field text-black"
                  />
                  <input
                    type="text"
                    name="state"
                    onChange={setInfoOfCustomer}
                    placeholder="State"
                    className="input-field text-black"
                  />
                  <input
                    type="text"
                    name="zip_code"
                    onChange={setInfoOfCustomer}
                    placeholder="Zip Code"
                    className="input-field text-black"
                  />
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button type="button" className="btn-cancel">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => toggleModal(true)}
                    className="btn-submit"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .input-field {
            padding: 12px;
            background: #f3f4f6;
            width: 100%;
            border-radius: 8px;
            font-size: 14px;
            border: 1px solid transparent;
          }
          .btn-cancel {
            padding: 10px;
            width: 100%;
            background: transparent;
            border: 1px solid #ccc;
            color: #333;
            border-radius: 8px;
          }
          .btn-submit {
            padding: 10px;
            width: 100%;
            background: #2563eb;
            color: white;
            border-radius: 8px;
          }
        `}</style>
      </div>
      {isModalOpened && (
        <InfoModal
          isOpen={isModalOpened}
          onOpenChange={toggleModal}
          onConfirm={async (e) => {
            //e.preventDefault();
            await onSubmitOrder(e);
            toggleModal(false);
          }}
        />
      )}
    </>
  );
}
