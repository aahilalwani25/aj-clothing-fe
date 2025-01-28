"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

const items = [
  {
    title: "3 pc suite",
    image: "hero-section-img.jpg",
    quantity: 1,
    price: 4000,
  },
];

export default function CustomDrawer({ isOpen, onOpen, onOpenChange, title }) {
  //const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Drawer size={"lg"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex gap-1 text-black justify-between">
              <div>Cart Summary</div>
              <div className="font-thin pr-3 text-[15px]">
                My Items: {items?.length}
              </div>
            </DrawerHeader>
            <DrawerBody>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="border h-36 text-black items-center"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={item?.image}
                      className="w-[6.25rem] self-center"
                    />
                    <div className="gap-4 flex flex-col">
                      <div>{item?.title}</div>
                      <div>Rs. {item?.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </DrawerBody>
            <DrawerFooter className="items-center justify-between text-black">
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button> */}
              <p className="font-bold">Total: </p>
              <p>Rs. 350</p>
              <Button className="bg-black text-white" onPress={onClose}>
                Checkout
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
