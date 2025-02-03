"use client";

import Checkout from "@/components/Checkout/Checkout";
import Layout from "@/Layout/Layout";

const dummyProducts = [
  { id: 1, name: "Split Sneakers", size: 37, quantity: 2, price: 40, img: "/images/product10.webp" },
  { id: 2, name: "Velvet Boots", size: 37, quantity: 2, price: 40, img: "/images/product11.webp" },
  { id: 3, name: "Echo Elegance", size: 37, quantity: 2, price: 40, img: "/images/product14.webp" },
  { id: 4, name: "Pumps", size: 37, quantity: 2, price: 40, img: "/images/product13.webp" },
];

export default function Page() {
  const totalAmount = dummyProducts.reduce((acc, item) => acc + item.price, 0);

  return (
    <Layout>
        <Checkout/>
    </Layout>
  );
}
