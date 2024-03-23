"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/redux/userSlice";
import { deleteUserData } from "@/lib/user-actions";

import NavBarItem from "../navBarItem/NavBarItem";
import { RootState } from "@/redux/store";

const menuItems = [
  {
    name: "Home",
    title: "Click to go to the home page",
    path: "/",
    targetBlank: false,
  },
  {
    name: "Videogames",
    title: "Click to go to the videogames page",
    path: "/videogames",
    targetBlank: false,
  },
  {
    name: "Library",
    title: "Click to go at your library",
    path: "/library",
    targetBlank: false,
  },
  {
    name: "RAWG API",
    title: "Click to go to the RAWG API page",
    path: "https://rawg.io/apidocs",
    targetBlank: true,
  },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, username, email } = useSelector((state: RootState) => state.user);

  const handleLogOut = async () => {
    deleteUserData();
    dispatch(logOut());
    onClose();
  };

  if (pathname === "/login" || pathname === "/signup") {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
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
                onClick={onOpen}
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
            <NavbarMenuItem
              key={`${name}-${index}`}
              isActive={pathname === path}
            >
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
      <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log Out</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleLogOut}>
                  Log Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
