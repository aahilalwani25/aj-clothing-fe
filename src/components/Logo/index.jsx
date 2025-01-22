import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="w-[3rem] h-[3rem] pl-1">
        <Image
          width={100}
          height={100}
          alt="AJ Clothing"
          src={"/aj-clothing.jpg"}
        />
    </div>
  );
}

export default Logo;
