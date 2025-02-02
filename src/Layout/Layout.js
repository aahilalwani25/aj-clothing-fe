"use client";
import CustomDrawer from "@/components/CustomDrawer";
import Nav from "@/components/Nav";
import { useDisclosure } from "@heroui/react";
import React from "react";

function Layout({ children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="w-full h-auto bg-white scrollbar-default">
        <div>
          <Nav onOpenCart={onOpen} />
        </div>
      </div>
      {children}
      <CustomDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export default Layout;
