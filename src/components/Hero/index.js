import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-1">
        <div className="lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/hero-section-img.jpg" alt="mockup" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
