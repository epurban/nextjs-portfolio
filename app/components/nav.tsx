"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/": {
    name: "home",
  },
  "/experience": {
    name: "experience",
  },
  "/education": {
    name: "education",
  },
  "/resume": {
    name: "resume",
  },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex h-[50px] flex-row items-center border-b border-[var(--border)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex flex-row justify-center items-center w-full px-4 sm:px-8" id="nav">
        <div className="flex flex-row space-x-0">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
                  isActive ? "text-neutral-800 dark:text-neutral-200 font-medium" : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
