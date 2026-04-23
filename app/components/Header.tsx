"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { siteNav } from "@/app/lib/site-config";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/TX_LOGO1-300x178_3_cropped.png"
            alt="Tooxclusive"
            width={120}
            height={70}
            priority
          />
          <span className="hidden md:inline text-sm text-slate-300">Music Platform</span>
        </Link>

        <button
          className="md:hidden rounded-lg border border-slate-700 px-3 py-2 text-sm"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <ul
          className={`${
            menuOpen ? "flex" : "hidden"
          } w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:items-center md:gap-1`}
        >
          {siteNav.map((item) => {
            const isActive =
              pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-fuchsia-500/20 text-fuchsia-200"
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block w-full md:w-56">
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}
