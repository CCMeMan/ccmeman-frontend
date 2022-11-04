import React from "react";
import {
  Flex,
  Heading,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Text,
  HStack,
  AvatarBadge,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import {
  FaCheck,
  FaExclamation,
  FaRegCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useRouter } from "next/router";

import { useUser } from "@auth0/nextjs-auth0";
import BeatLoader from "react-spinners/BeatLoader";

function SignInButton() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const textColor = useColorModeValue("gray.600", "gray.300");
  const loginBtnBg = useColorModeValue("yellow.300", "yellow.600");

  // Loading
  if (isLoading) {
    return (
      <Button
        colorScheme="blue"
        variant="ghost"
        size="md"
        ml="10px"
        mr="10px"
        spinner={<BeatLoader size={8} color="white" />}
        isLoading
      />
    );
  }

  // Logged in
  if (user) {
    return (
      <Menu>
        <MenuButton
          as={Avatar}
          name={user?.name ?? "User"}
          src={user?.picture ?? null}
          _hover={{ cursor: "pointer" }}
          ml={{ base: 0, md: 6 }}
          boxSize="10"
        >
          {user.email_verified ? (
            <AvatarBadge boxSize="1em" bg="green.500" borderWidth="0.15em">
              <FaCheck size="8" />
            </AvatarBadge>
          ) : (
            <AvatarBadge boxSize="1em" bg="orange.500" borderWidth="0.15em">
              <FaExclamation size="8" />
            </AvatarBadge>
          )}
        </MenuButton>
        <MenuList>
          <MenuGroup title="Account">
            <Link href="/user/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            {/* <Link href="/user/my">
                <MenuItem>最愛</MenuItem>
              </Link> */}
          </MenuGroup>
          <MenuDivider display={{ base: "block", md: "none" }} />
          <MenuGroup
            title="More"
            display={{ base: "inline-block", md: "none" }}
          >
            <Link href="/about">
              <MenuItem display={{ base: "inline-block", md: "none" }}>
                About
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <Flex justifyContent="end" alignItems="center">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              m="2"
              ml="4"
            >
              <Badge
                colorScheme={user.email_verified ? "green" : "yellow"}
                mb="1"
              >
                {user.email_verified ? "Verified" : "Unverified"}
              </Badge>
              <Text fontSize="sm" color={textColor} fontWeight="700">
                {user.name}
              </Text>
              <Text fontSize="xs" color={textColor} fontWeight="500">
                {user.email}
              </Text>
            </Flex>
            <Button
              colorScheme="red"
              variant="outline"
              size="md"
              m="2"
              mr="4"
              onClick={() => {
                //   reportEvent("header", "click", "logout");
                router.push("/api/auth/logout");
              }}
            >
              Logout
            </Button>
          </Flex>
        </MenuList>
      </Menu>
    );
  }

  // Not logged in
  return (
    <>
      <Menu>
        <MenuButton
          as={Avatar}
          _hover={{ cursor: "pointer" }}
          display={{ base: "inline", md: "none" }}
        />
        <MenuList>
          <MenuGroup title="More">
            <Link href="/about">
              <MenuItem>About</MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <Flex justifyContent="end" alignItems="center">
            <Button
              colorScheme="yellow"
              rightIcon={<ChevronRightIcon />}
              variant="solid"
              size="md"
              m="2"
              mr="4"
              onClick={() => {
                // reportEvent("header", "click", "login");
                router.push("/api/auth/login");
              }}
            >
              Login / Sign Up
            </Button>
          </Flex>
        </MenuList>
      </Menu>
      <Button
        bg={loginBtnBg}
        color={"gray.800"}
        rightIcon={<ChevronRightIcon />}
        size="md"
        ml="10px"
        mr="10px"
        onClick={() => {
          // reportEvent("header", "click_external", "status");
          router.push("/api/auth/login");
        }}
        display={{ base: "none", md: "inline-block" }}
      >
        Login / Sign Up
      </Button>
    </>
  );
}

function NavBar() {
  return (
    <Flex
      position="fixed"
      w="100%"
      h="64px"
      // bg={useColorModeValue("headerBar.light", "headerBar.dark")}
      bg="whiteAlpha.900"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      zIndex="1000"
      px={{ base: 6, md: 10 }}
    >
      <Flex justifyContent="center" alignItems="center">
        <Link href="/" passHref>
          <Flex alignItems="center" flexDirection="row" cursor="pointer">
            <Image
              src={`/logo.png`}
              alt="ncnLogo"
              width="30"
              height="30"
              layout="fixed"
            />
            <Heading
              ml="2"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="700"
              color={useColorModeValue("heading.light", "heading.dark")}
              display={{ base: "none", md: "inline-block" }}
            >
              CCMeMan
            </Heading>
          </Flex>
        </Link>
        <Link href="/group">
          <Button
            variant="ghost"
            size="md"
            ml={{ base: 4, md: 6 }}
            leftIcon={<FaRegCalendarAlt />}
            color={useColorModeValue("link.light", "link.dark")}
          >
            Groups / Meetings
          </Button>
        </Link>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Link href="/about">
          <Button
            variant="ghost"
            size="md"
            ml="30px"
            display={{ base: "none", md: "inline-block" }}
            color={useColorModeValue("link.light", "link.dark")}
          >
            <HStack>
              <FaInfoCircle />
              <Text>About</Text>
            </HStack>
          </Button>
        </Link>
        {/* <ThemeToggleButton /> */}
        <SignInButton />
      </Flex>
    </Flex>
  );
}

export default NavBar;
