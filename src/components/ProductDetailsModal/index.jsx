import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ShoppingCart } from "lucide-react";

export default function ProductDetailsModal({ isOpen, onOpenChange, product }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="text-black">
            <ModalHeader className="flex flex-col gap-1">
              {product?.title}
            </ModalHeader>
            <ModalBody>
              <div>
                <img
                  alt={product.imageAlt}
                  src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${product.main_image}`}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </div>

              <div>Category: {product?.category}</div>
              <div className="flex justify-between">
                <div className="font-bold">Rs. {product?.price}</div>
                <div className="border bg-slate-50 px-5 rounded">Availability: In Stock</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-black text-white" onPress={onClose}>
                <ShoppingCart />+ Add to Cart
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
