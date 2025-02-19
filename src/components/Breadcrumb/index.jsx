"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

const Breadcrumb = ({ path }) => {
  const paths = {
    "home": ["Home"],
    "bin-saeed-vol-1": ["Home", "Brands", "Bin Saeed Collection Vol-1"],
    "mehroon-collection": ["Home", "Brands", "Mehroon Collection"],
    "ladies":["Home","Ladies"],
    "gents":["Home","Gents"],
    "sejal-unstitched-collection":["Home","Brands","Sejal Unstitched Collection"],
    "bin-saeed-vol-2":["Home", "Brands", "Bin Saeed Collection Vol-2"]
  };

  const icons = [
    {
      name: "Home",
      icon: "/svg/icons/home.svg",
    },
    {
      name: "Brands",
      icon: "/svg/icons/brands.svg",
    },
    {
      name: "Ladies",
      icon: "/svg/icons/female.svg",
    },
    {
      name: "Gents",
      icon: "/svg/icons/male.svg",
    },
  ];

  const keyPathsArray = Object.keys(paths);

  const findActualPathsExist = () => {
    for (let key of keyPathsArray) {
      if (key === path) {
        return paths[key];
      }
    }
    return paths["home"];
  };

  const getIconForPath = (item) => {
    const icon = icons.find((icon) => icon.name === item);
    return icon ? icon.icon : "/svg/icons/store.svg"; // Fallback icon
  };

  return (
    <Breadcrumbs
      underline="active"
      className="w-full h-5 sm:h-12 justify-center"
    >
      {findActualPathsExist()?.map((item, index) => (
        <BreadcrumbItem key={`${item}`} className="text-black">
          <img src={getIconForPath(item)} alt={item} />
          {item}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;