import DropdownSelect from "@/components/Input/DropdownSelect";
import FileInput from "@/components/Input/FileInput";
import InputField from "@/components/Input/InputField";
import TextArea from "@/components/Input/TextArea";
import Label from "@/components/Label";
import { apiHelper } from "@/helpers/apiHelper";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Loader } from "lucide-react";
import React, { useCallback, useState } from "react";

function AddProductFormModal({ isOpen, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: null,
    main_image: null,
    price: 0,
    description: "This is a description",
    availability: true,
    gender: null,
    category: null,
  });

  const genderOptions = [
    { value: "gents", label: "Gents" },
    { value: "ladies", label: "Ladies" },
    { value: "kids", label: "Kids" },
  ];

  const categoryOptions = [
    { value: "stitched", label: "Stitched" },
    { value: "unstitched", label: "Unstitched" },
  ];

  console.log(form);

  const handleAddProduct = async (e) => {
    setIsLoading(true);
    const res = await apiHelper({
      endpoint: "create-product",
      method: "POST",
      body: form,
    });

    if (res?.status === 200) {
      alert("added the product successfully");
      setIsLoading(false);
    }
  }; //,[form])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="text-black">
            <ModalHeader className="flex flex-col gap-1">
              Add Product
            </ModalHeader>
            <ModalBody>
              <Label>Title of your Product</Label>
              <InputField
                type={"text"}
                placeholder={"Title"}
                onChange={(e) =>
                  setForm((m) => ({ ...m, title: e.target.value }))
                }
              />

              <Label>Image</Label>
              <FileInput setImage={setForm} />

              {/* <Label>Description (optional)</Label>
              <TextArea
                onChange={(e) =>
                  setForm((m) => ({ ...m, description: e.target.value }))
                }
                placeholder="Enter description"
                disabled={false}
              /> */}

              <Label>Select Gender</Label>
              <DropdownSelect
                options={genderOptions}
                setSelectedValue={(e) =>
                  setForm((m) => ({ ...m, gender: e.target.value }))
                }
              />

              <Label>Select Category</Label>
              <DropdownSelect
                options={categoryOptions}
                setSelectedValue={(e) =>
                  setForm((m) => ({ ...m, category: e.target.value }))
                }
              />

              <Label>Price (in Rupees)</Label>
              <InputField
                type={"number"}
                placeholder={"Price"}
                onChange={(e) =>
                  setForm((m) => ({ ...m, price: parseInt(e.target.value) }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-black text-white"
                onPress={handleAddProduct}
              >
                {isLoading ? <Loader /> : "Add"}
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddProductFormModal;
