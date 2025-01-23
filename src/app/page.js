//import Carousel from "../components/Carousel";
"use client";
import Hero from "@/components/Hero";
import Nav from "../components/Nav";
import Image from "next/image";
import ProductList from "@/components/ProductList";
import { useDisclosure } from "@heroui/react";
import CustomDrawer from "@/components/CustomDrawer";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <div className="w-full h-full bg-white">
      <div>
        <Nav onOpenCart={onOpen} />
      </div>
      {/* <div className="md:pt-8 sm:pt-20">
        <Hero />
      </div> */}
      <ProductList />
    </div>
      <CustomDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
