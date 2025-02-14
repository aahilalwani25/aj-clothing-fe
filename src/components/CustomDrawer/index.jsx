"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity } from "@/redux/slices/cartSlice"; // Adjust the import based on your project structure

export default function CustomDrawer({ isOpen, onOpen, onOpenChange, title }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalAmount = cart?.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const router = useRouter();
  const shouldCheckout= cart?.items?.length > 0;

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  return (
    <Drawer size={"lg"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex gap-1 text-black justify-between">
              <div>Cart Summary</div>
              <div className="font-thin pr-3 text-[15px]">
                My Items: {cart?.items?.length}
              </div>
            </DrawerHeader>
            <DrawerBody>
              {cart?.items.map((item, index) => (
                <div
                  key={index}
                  className="border h-36 rounded text-black items-center flex justify-between p-4"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${item?.main_image}`}
                      className="w-[6.25rem] h-[100px] self-center"
                      alt={item.title}
                    />
                    <div className="gap-4 flex flex-col">
                      <div>{item?.title}</div>
                      <div>Rs. {item?.price}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <div>Quantity: {item?.quantity}</div>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </DrawerBody>
            <DrawerFooter className="items-center justify-between text-black">
              <p className="font-bold">Total: </p>
              <p>Rs. {totalAmount}</p>
              <Button
                disabled={cart?.items?.length > 0}
                className={`bg-black text-white ${shouldCheckout?"cursor-pointer":"cursor-not-allowed"}`}
                onPress={
                  shouldCheckout
                    ? () => router?.push("/checkout")
                    : null
                }
              >
                Checkout
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
