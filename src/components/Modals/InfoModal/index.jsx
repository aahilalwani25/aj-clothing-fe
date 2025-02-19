import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import Loader from "../../Loader";

export default function InfoModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="text-black">
            <ModalHeader className="flex flex-col gap-1">
              Are you sure you want to confirm the order?
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Once the order is placed, out team will contact you for the
                confirmation
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-black text-white" onPress={onConfirm}>
                <ShoppingCart />
                {
                  isLoading?<Loader/>:"Confirm"
                }
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
