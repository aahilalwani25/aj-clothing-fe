import { useModalContext } from "@/Providers/ModalProvider";
import { useProductSelectedContext } from "@/Providers/productSelectedProvider";
import { addItemToCart } from "@/redux/slices/cartSlice";
import { ShoppingCartIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Product({ product, index }) {
  const { toggleModal } = useModalContext();
  const dispatch= useDispatch();
  const { setProductSelected } = useProductSelectedContext();
  const cartState= useSelector(state=>state?.cart);

  const onSelectAddToCart= useCallback(()=>{
    dispatch(addItemToCart({
      item: product
    }));
  },[cartState]);

  console.log(cartState);

  return (
    <div
      onClick={() => {
        setProductSelected(product);
        toggleModal();
      }}
      data-modal-target="popup-modal"
      data-modal-toggle="popup-modal"
      key={product.product_id}
      className="group relative cursor-pointer"
    >
      <div className="relative">
        <img
          alt={product.imageAlt}
          src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${product.main_image}`}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
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
      <div className="mt-2">
        <button onClick={onSelectAddToCart} className="bg-black w-full h-[3.125rem] flex justify-center items-center">
          <ShoppingCartIcon />+ Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
