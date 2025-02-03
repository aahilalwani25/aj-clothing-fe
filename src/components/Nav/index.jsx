import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@heroui/react";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "Ladies", href: "#", current: false },
  { name: "Gents", href: "#", current: false },
  { name: "Kids", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav({ onOpenCart }) {
  const cartState = useSelector((state) => state?.cart);
  const [toggleSearch, setToggleSearch] = useState(false);

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="AJ Clothing"
                src="/aj-clothing.jpg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!toggleSearch ? (
              <button
                onClick={() => setToggleSearch((search) => !search)}
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View cart</span>
                <SearchIcon className="mr-3" />
              </button>
            ) : null}
            {/* <button
              type="button"
              onClick={onOpenCart}
              className="relative rounded-full p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View cart</span>
              <ShoppingCartIcon className="mr-3" />
              
            </button>
          </div> */}
            <button className="relative w-[100%] md:flex" onClick={onOpenCart}>
              <ShoppingCartIcon className="h-7 w-7" />

              {cartState?.items?.length ? (
                <div className="absolute top-3 -right-1 flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full bg-red-600 text-sm text-white">
                  {cartState.items.length}
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
