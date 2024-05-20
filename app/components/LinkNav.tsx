"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const LinkNav = ({ link,children }: { link: { href: string; name: string },children?:ReactNode }) => {
  const pathName = usePathname();
  return (
    <li >
      <Link
        href={link?.href}
        className={`hover:text-accent-400  flex gap-2 items-center transition-colors ${pathName === link?.href && "text-accent-400"}`}
      >
        {children}
        {link?.name}
      </Link>
    </li>
  );
};

export default LinkNav;
