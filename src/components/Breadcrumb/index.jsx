"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const Breadcrumb = ({ path }) => {
  const paths = {
    home: ["Home"],
    "bin-saeed-vol-1": ["Home", "Brands", "Bin Saeed Collections"],
    "mehroon-collection": ["Home", "Brands", "Mehroon Collection"],
  };

  const keyPathsArray = Object.keys(paths);

  const findActualPathsExist = () => {
    for (let key of keyPathsArray) {
      if (key === path) {
        return paths[key];
      }
    }
    return paths["home"];
  };

  return (
    <Breadcrumbs underline="active" className="w-full h-5 sm:h-12 justify-center">
      {findActualPathsExist()?.map((item) => (
        <BreadcrumbItem key={`${item}`} className="text-black">
          {item}
        </BreadcrumbItem>
      ))}

      {/* <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
        Music
      </BreadcrumbItem>
      <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
        Album
      </BreadcrumbItem>
      <BreadcrumbItem key="song" isCurrent={currentPage === "song"}>
        Song
      </BreadcrumbItem> */}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
