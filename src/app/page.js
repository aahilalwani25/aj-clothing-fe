//import Carousel from "../components/Carousel";
import Hero from "@/components/Hero";
import Nav from "../components/Nav";
import Image from "next/image";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <div>
        <Nav />
      </div>
      {/* <div className="md:pt-8 sm:pt-20">
        <Hero />
      </div> */}
      <ProductList/>
    </div>
  );
}
