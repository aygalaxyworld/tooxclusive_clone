"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isFeaturesHovered, setIsFeaturesHovered] = useState(false);

  const navigationList = [
    { href: "/", name: "Home" },
    { href: "/artist", name: "Artists" },
    { href: "/songs", name: "Songs" },
    { href: "/news", name: "News" },
    { href: "/reviews", name: "Review" },
    {
      href: "/features",
      name: "Features",
      subItems: [
        { href: "/author", name: "registers" },
        { href: "/register", name: "Register" },
        { href: "/register", name: "register" },
      ],
    },
    { href: "/advertise", name: "Advertise" },
  ];

  const pathname = usePathname();
  return (
    <div className="container md:mt-4 mx-auto border-b border-offwhite min-w-full sticky top-0 z-50 lg:static ">
      <nav className="bg-white text-black sm:mx-6">
        <div className="bg-black py-2 lg:bg-transparent flex justify-center space-x-32 lg:justify-start items-center">
          <Image
            className="dark:invert lg:w-[150px] lg:h-[89px]"
            src="/TX_LOGO1-300x178_3_cropped.png"
            alt="exclusive logo"
            width={72} // Default width for smaller screens
            height={40} // Default height for smaller screens
            sizes="(min-width: 1024px) 150px, 67.4px"
          />
          <div className="md:hidden text-lg font-black text-white">
            <SearchBar />
          </div>
          <div className="hidden lg:block text-sm font-semibold text-zinc-700">
            Music Platform UI System
          </div>
        </div>
        <div className="flex items-center justify-between overflow-scroll lg:overflow-visible py-4 lg:mt-4">
          <ul className="flex space-x-2 menu-items">
            {navigationList.map((navItem) => {
              const isActive =
                pathname === navItem.href ||
                (pathname.startsWith(navItem.href) && navItem.href !== "/");

              return (
                <li
                  key={navItem.name}
                  onMouseEnter={() =>
                    navItem.name === "Features" && setIsFeaturesHovered(true)
                  }
                  onMouseLeave={() =>
                    navItem.name === "Features" && setIsFeaturesHovered(false)
                  }
                  className="relative"
                >
                  <Link
                    href={navItem.href}
                    className={
                      isActive
                        ? "hover:text-gray-300 bg-gray-100 py-5 px-3 border-b-2 border-red-500"
                        : "hover:text-gray-300 hover:bg-gray-100 py-5 px-3"
                    }
                  >
                    {navItem.name}
                  </Link>
                  {navItem.subItems && isFeaturesHovered && (
                    <ul className="absolute left-0 mt-2 bg-white shadow-lg z-50">
                      {navItem.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-black hover:bg-gray-100"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:block lg:ml-20 text-white">
            <SearchBar />
          </div>
        </div>
      </nav>
    </div>
  );
}
