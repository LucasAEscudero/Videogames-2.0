"use client";
import {
  // nav
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  // modal
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  // dropdown
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  // avatar
  Avatar,
  User,
  // others
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
    auth: false,
  },
  {
    name: "Videogames",
    title: "Click to go to the videogames page",
    path: "/videogames",
    targetBlank: false,
    auth: false,
  },
  {
    name: "Library",
    title: "Click to go at your library",
    path: "/library",
    targetBlank: false,
    auth: true,
  },
  {
    name: "RAWG API",
    title: "Click to go to the RAWG API page",
    path: "https://rawg.io/apidocs",
    targetBlank: true,
    auth: false,
  },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // user profile
  const { username, email } = useSelector((state: RootState) => state.user);

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
            {/* logo */}
            <NavbarBrand>
              <h1 className="font-bold text-inherit">VIDEOGAMES</h1>
            </NavbarBrand>
            {/* session */}
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
        {/* logo */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <h1 className="font-bold text-inherit">VIDEOGAMES</h1>
          </NavbarBrand>
        </NavbarContent>

        {/* links */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems
            .filter((item) => {
              return username ? item : !item.auth;
            })
            .map((item, i) => (
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
        {/* session */}
        <NavbarContent justify="end">
          {username ? (
            // if the user is logged
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  as="button"
                  src=""
                  name={username}
                  className="transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                disabledKeys={["profile"]}
              >
                {/* info section */}
                <DropdownSection aria-label="user info" showDivider>
                  <DropdownItem
                    isReadOnly
                    key="profile"
                    className="h-14 gap-2 opacity-100"
                  >
                    <User
                      name={username}
                      description={email}
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        // src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                      }}
                    />
                  </DropdownItem>
                </DropdownSection>
                {/* settings section */}
                <DropdownSection aria-label="user settings" showDivider>
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                </DropdownSection>
                {/* logout section */}
                <DropdownSection aria-label="user logout">
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    onClick={onOpen}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
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

        {/* responsive */}
        <NavbarMenu>
          {menuItems
            .filter((item) => {
              return username ? item : !item.auth;
            })
            .map(({ name, path, targetBlank, title }, index) => (
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
      {/* modal */}
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
