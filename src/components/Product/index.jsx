import { useModalContext } from "@/Providers/ModalProvider";
import { useProductSelectedContext } from "@/Providers/productSelectedProvider";
import { addItemToCart } from "@/redux/slices/cartSlice";
import { CheckCircle, ShoppingCartIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Product({ product, index }) {
  const { toggleModal } = useModalContext();
  const dispatch = useDispatch();
  const { setProductSelected } = useProductSelectedContext();
  const cartState = useSelector((state) => state?.cart);
  const hasUserAlreadyAddedThisProduct =
    cartState?.items?.filter((item) => item?.product_id === product?.product_id)
      ?.length > 0
      ? true
      : false;

  const onSelectAddToCart = useCallback(() => {
    dispatch(
      addItemToCart({
        item: { ...product, quantity: 1 },
      })
    );
  }, [cartState]);

  return (
    <div
      data-modal-target="popup-modal"
      data-modal-toggle="popup-modal"
      key={product.product_id}
      className="group relative cursor-pointer"
    >
      <div
        onClick={() => {
          setProductSelected(product);
          toggleModal();
        }}
      >
        <div className="relative">
          <img
            alt={product.imageAlt}
            src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${product.main_image}`}
            className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
          <button className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm rounded">
            New
          </button>
        </div>
        <div className="mt-4 flex">
          <p className="text-sm font-medium text-gray-900">{product.title}</p>

          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
          <p className="text-sm font-bold text-gray-900">Rs. {product.price}</p>
        </div>
        <div className="mt-2"></div>
      </div>
      <button
        onClick={hasUserAlreadyAddedThisProduct ? null : onSelectAddToCart}
        className={`${
          hasUserAlreadyAddedThisProduct ? "bg-gray-700" : "bg-black"
        } w-full h-[3.125rem] flex justify-center items-center`}
      >
        {hasUserAlreadyAddedThisProduct ? (
          <div className="gap-2 flex">
            <CheckCircle />
            Added to cart successfully
          </div>
        ) : (
          <>
            <ShoppingCartIcon />+ Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

export default Product;
