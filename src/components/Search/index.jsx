import { Input } from "@heroui/react";
import React from "react";

function Search() {
  return (
    <Input
      placeholder="Search..."
      className="flex-grow p-1 w-full max-w-[250px] text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden"
    />
  );
}

export default Search;
