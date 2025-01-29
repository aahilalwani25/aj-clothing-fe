//import Carousel from "../components/Carousel";
"use client";
import Hero from "@/components/Hero";
import Nav from "../components/Nav";
import Image from "next/image";
import ProductList from "@/components/ProductList";
import { useDisclosure } from "@heroui/react";
import CustomDrawer from "@/components/CustomDrawer";
import { useCallback, useEffect, useState } from "react";
import { apiHelper } from "../helpers/apiHelper";
import { ModalProvider, useModalContext } from "../Providers/ModalProvider";
import PopupModal from "@/components/ProductDetailsModal";
import App from "@/components/App";
import { ProductSelectedProvider } from "../Providers/productSelectedProvider";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function Home() {
  return (
    <Provider store={store()?.store}>
      <ProductSelectedProvider>
        <ModalProvider>
          <PersistGate loading={null} persistor={store()?.persistor}>
            <App />
          </PersistGate>
        </ModalProvider>
      </ProductSelectedProvider>
    </Provider>
  );
}
