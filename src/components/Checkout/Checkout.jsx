"use client";

import { apiHelper } from "@/helpers/apiHelper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoModal from "../InfoModal";
import { useModalContext } from "@/Providers/ModalProvider";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router= useRouter();
  const cart = useSelector((state) => state.cart);
  const [isLoading,setIsLoading]= useState(false);
  const totalAmount = cart?.items.reduce(
    (acc, item) => acc + item.price * item?.quantity,
    0
  );
  const { isModalOpened, toggleModal } = useModalContext();
  const dispatch = useDispatch();
  const deliveryCharges = 150;

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

  const [errors, setErrors] = useState({});

  const orderInfo = cart?.items?.map((c) => ({
    product_id: c?.product_id,
    quantity: c?.quantity,
  }));

  const setInfoOfCustomer = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCustomerAndReturnId = async () => {
    setIsLoading(true)
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

  const validateForm = () => {
    let formErrors = {};
    if (!customerInfo.first_name)
      formErrors.first_name = "First Name is required";
    if (!customerInfo.last_name) formErrors.last_name = "Last Name is required";
    if (!customerInfo.email) formErrors.email = "Email is required";
    if (!customerInfo.phone_number)
      formErrors.phone_number = "Phone Number is required";
    if (!customerInfo.address) formErrors.address = "Address is required";
    if (!customerInfo.city) formErrors.city = "City is required";
    // Add more fields if needed
    return formErrors;
  };

  const onSubmitOrder = async (e) => {
    //e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    } else {
      setErrors({});
    }

    const customer_id = await createCustomerAndReturnId();
    if (customer_id) {
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
        setIsLoading(false);
        alert("Your order has been confirmed successfully");
      }
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
                  Delivery Charges{" "}
                  <span className="ml-auto">Rs. {deliveryCharges}</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base font-bold text-gray-800">
                  Total{" "}
                  <span className="ml-auto">
                    Rs. {totalAmount + deliveryCharges}
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-0 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  {errors.first_name && (
                    <span className="text-red-500 text-xs">
                      {errors.first_name}
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  {errors.last_name && (
                    <span className="text-red-500 text-xs">
                      {errors.last_name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    name="phone_number"
                    placeholder="Phone No."
                    onChange={setInfoOfCustomer}
                    className="input-field text-black"
                  />
                  {errors.phone_number && (
                    <span className="text-red-500 text-xs">
                      {errors.phone_number}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                Shipping Address
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Address */}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="address"
                    onChange={setInfoOfCustomer}
                    placeholder="Address Line"
                    className="input-field text-black"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-xs">
                      {errors.address}
                    </span>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="city"
                    onChange={setInfoOfCustomer}
                    placeholder="City"
                    className="input-field text-black"
                  />
                  {errors.city && (
                    <span className="text-red-500 text-xs">{errors.city}</span>
                  )}
                </div>

                
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Note: Payment will be collected upon delivery.
              </h3>
              
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
        isLoading={isLoading}
          isOpen={isModalOpened}
          onOpenChange={toggleModal}
          onConfirm={async (e) => {
            await onSubmitOrder(e);
            toggleModal(false);
            router?.back();
          }}
        />
      )}
    </>
  );
}
