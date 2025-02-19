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
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";
import 'swiper/css/pagination';


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
                {product?.further_images?.length > 0 ? (
                  <Swiper
                    modules={[Virtual, Pagination]}
                    virtual
                    slidesPerGroup={1}
                    spaceBetween={10} // Space between images
                    slidesPerView={1} // Allows dynamic sizing, so images stay their natural width
                    loop={false} // Infinite loop
                    navigation={true} // Add arrows for navigation
                    pagination={{ clickable: true }} // Enable clickable dots
                    className="w-full" // Apply overflow-auto for horizontal scroll
                    style={{ cursor: "grab" }} // Adds a "grab" cursor for better UX
                  >
                    {product?.further_images?.map((p, index) => (
                      <SwiperSlide
                        //key={index}
                        className="text-black"
                        virtualIndex={index}
                      >
                        <img
                          alt={product.imageAlt}
                          src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${p}`}
                          className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    alt={product.imageAlt}
                    src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${product.main_image}`}
                    className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                )}
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
                    <ShoppingCart />+ Add to Cart
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
