//import Carousel from "../components/Carousel";
"use client";
import Hero from "@/components/Hero";
import Nav from "../components/Nav";
import Image from "next/image";
import ProductList from "@/components/ProductList";
import { useDisclosure } from "@heroui/react";
import CustomDrawer from "@/components/CustomDrawer";
import { useCallback, useEffect, useState } from "react";
import { apiHelper } from "./helpers/apiHelper";
import { ModalProvider, useModalContext } from "./Providers/ModalProvider";
import PopupModal from "@/components/ProductDetailsModal";
import App from "@/components/App";
import { ProductSelectedProvider } from "./Providers/productSelectedProvider";

export default function Home() {
  return (
    <ProductSelectedProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ProductSelectedProvider>
  );
}
