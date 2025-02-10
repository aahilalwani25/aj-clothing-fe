//import Carousel from "../components/Carousel";
// "use client";
import App from "@/components/App";
import Carousel from "@/components/Carousel/Carousel";
import Footer from "@/components/Footer";
import Layout from "@/Layout/Layout";

export const metadata = {
  title: "AJ Clothing",
  description: "A clothing site",
};

export default function Home() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-screen">
        <Carousel />
        <App />
        <Footer/>
      </div>
    </Layout>
  );
}
