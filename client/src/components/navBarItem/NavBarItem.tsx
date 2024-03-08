"use client";
import { NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavBarItemsProps {
  children: React.ReactNode;
  link: string;
  title: string;
  targetBlank: boolean;
}

export default function NavBarItem({
  children,
  link,
  title,
  targetBlank,
}: NavBarItemsProps) {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={link === pathname} className="cursor-pointer">
      <Link href={link} title={title} target={targetBlank ? "_blank" : "_self"}>
        {children}
      </Link>
    </NavbarItem>
  );
}
