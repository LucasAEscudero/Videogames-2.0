"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/redux/userSlice";
import { deleteCookie } from "@/lib/actions";

import NavBarItem from "../navBarItem/NavBarItem";
import { RootState } from "@/redux/store";

const menuItems = [
  {
    name: "Home",
    title: "",
    path: "/",
    targetBlank: false,
  },
  {
    name: "Library",
    title: "",
    path: "/library",
    targetBlank: false,
  },
  {
    name: "RAWG API",
    title: "",
    path: "https://rawg.io/apidocs",
    targetBlank: true,
  },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { id, username, email } = useSelector((state: RootState) => state.user);

  const handleLogOut = async () => {
    deleteCookie("videogames_session_token");

    dispatch(logOut());
  };

  if (pathname === "/login" || pathname === "/signup")
    return (
      <Navbar>
        <NavbarContent>
          <NavbarBrand>
            <h1 className="font-bold text-inherit">VIDEOGAMES</h1>
          </NavbarBrand>
          <NavbarContent justify="end">
            {/* login */}
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            {/* signup */}
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    );

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="font-bold text-inherit">VIDEOGAMES</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, i) => (
          <NavBarItem
            key={`${item.title}-${i}`}
            link={item.path}
            title={item.title}
            targetBlank={item.targetBlank}
          >
            {item.name}
          </NavBarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {username ? (
          <NavbarItem>
            {/* if the user is logged */}
            <Button
              as={Link}
              color="danger"
              href=""
              onClick={handleLogOut}
              variant="flat"
            >
              Log Out
            </Button>
          </NavbarItem>
        ) : (
          // if the user is not logged
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ name, path, targetBlank, title }, index) => (
          <NavbarMenuItem key={`${name}-${index}`} isActive={pathname === path}>
            <Link
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              title={title}
              href={path}
              target={targetBlank ? "_blank" : "_self"}
              // size="lg"
            >
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
