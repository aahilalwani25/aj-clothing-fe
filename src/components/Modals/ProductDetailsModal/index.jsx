import { addItemToCart } from "@/redux/slices/cartSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailsModal({ isOpen, onOpenChange, product }) {
  const dispatch = useDispatch();
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="text-black">
            <ModalHeader className="flex flex-col gap-1">
              {product?.title}
            </ModalHeader>
            <ModalBody>
              <div className="relative">
                <img
                  alt={product.imageAlt}
                  src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${product.main_image}`}
                  className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </div>

              <div>Category: {product?.category}</div>
              <div className="flex justify-between">
                <div className="font-bold">Rs. {product?.price}</div>
                <div className="border bg-slate-50 px-5 rounded">
                  Availability: In Stock
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {/* <Button
                className="bg-black text-white"
                onPress={onSelectAddToCart}
              >
                <ShoppingCart />+ Add to Cart
              </Button> */}

              <Button
                onPress={
                  hasUserAlreadyAddedThisProduct ? null : onSelectAddToCart
                }
                className={`${
                  hasUserAlreadyAddedThisProduct ? "bg-gray-700" : "bg-black"
                } text-white`}
              >
                {hasUserAlreadyAddedThisProduct ? (
                  <div className="gap-2 flex">
                    <CheckCircle />
                    Added to cart successfully
                  </div>
                ) : (
                  <>
                    <ShoppingCart/>+ Add to Cart
                  </>
                )}
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
