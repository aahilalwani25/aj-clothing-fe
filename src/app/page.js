//import Carousel from "../components/Carousel";
// "use client";
import App from "@/components/App";
import Breadcrumb from "@/components/Breadcrumb";
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
      <div className="mx-auto px-4 py-7 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 h-screen">
        <Breadcrumb path={"home"}/>
        <Carousel />
        <App />
        <Footer/>
      </div>
    </Layout>
  );
}
