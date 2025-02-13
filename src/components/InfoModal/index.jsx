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

export default function InfoModal({ isOpen, onOpenChange, onConfirm}) {
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
                Once the order is placed, you will receive an email for the information
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                className="bg-black text-white"
                onPress={onConfirm}
              >
                <ShoppingCart />Confirm
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
