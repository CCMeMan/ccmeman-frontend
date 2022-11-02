import React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Center,
  Spacer,
  Text,
  Divider,
  Avatar,
  Input,
  Button,
  useToast,
  HStack,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
// import Select, { StylesConfig, GroupBase } from "react-select";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  useUser,
  withPageAuthRequired,
  UserProfile,
} from "@auth0/nextjs-auth0";

export default function UserProfilePage() {
  const toast = useToast();

  const createUser = async () => {
    try {
      console.log("create");
      const { data } = await axios.post("/api/user", {});
      return data;
    } catch (e) {
      console.log(e);
      toast({
        title: "Register User Fail.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // if ((e as AxiosError)?.response?.status === 401) {
      //   router.push("/api/auth/login");
      // }
    }
  };

  const getUser = async () => {
    try {
      // Currently, using create (POST) to get user info.
      console.log("getUser");
      const { data } = await axios.get("/api/user", {});
      return data;
    } catch (e) {
      console.log(e);
      toast({
        title: "Get User Info. Fail.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateUser = async () => {
    try {
      await axios.put("/api/user", {
        name: name,
        email: email,
      });
      toast({
        title: "Update Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Update Fail",
        description: "Please try again or contact service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Auth0 User State
  const { user, error, isLoading } = useUser();

  // User Info States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Create User to get current User Info in DB.
  // useEffect(() => {
  //   createUser();
  // }, [isLoading]);

  useEffect(() => {
    const getUserInfo = async () => {
      const initialUserInfo = await getUser();
      console.log(initialUserInfo);
      setName(initialUserInfo.name ?? user?.name ?? "");
      setEmail(initialUserInfo.email ?? user?.email ?? "");
    };
    getUserInfo();
    console.log("getUserInfo");
  }, [isLoading]);

  if (isLoading) {
    return <Text>Is Loading...</Text>;
  }
  return (
    <Box m={{ base: 5, md: 10, lg: 40 }}>
      <Text fontSize="2xl" fontWeight="700" color="gray.800">
        Debug Info
      </Text>
      <Divider mt="1" mb="4" />
      <Flex w="100%" p="2" flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Flex mr={{ md: "20" }} w="100%" flexDirection="column">
          <Text my="4" mx="4" fontSize="xl" fontWeight="700">
            Auth0_user_id
          </Text>
          <Input
            bg="white"
            fontSize="lg"
            fontWeight="500"
            defaultValue={user?.sub ?? ""}
            disabled
          />
        </Flex>
        <Flex w="100%" flexDirection="column">
          <Text my="4" mx="4" fontSize="xl" fontWeight="700">
            Auth0_email
          </Text>
          <Input
            bg="white"
            fontSize="lg"
            fontWeight="500"
            defaultValue={user?.email ?? ""}
            disabled
          />
        </Flex>
      </Flex>
      <Flex w="100%" p="2" flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Flex mr={{ md: "20" }} w="100%" flexDirection="column">
          <Text my="4" mx="4" fontSize="xl" fontWeight="700">
            Auth0_name
          </Text>
          <Input
            bg="white"
            fontSize="lg"
            fontWeight="500"
            defaultValue={user?.name ?? ""}
            disabled
          />
        </Flex>
        <Flex p="10" w="100%" flexDirection="column">
          <Button
            colorScheme="teal"
            size="md"
            my="4"
            onClick={async () => {
              createUser();
            }}
          >
            Create User
          </Button>
          <Button
            colorScheme="teal"
            size="md"
            my="4"
            onClick={async () => {
              updateUser();
            }}
          >
            Update User
          </Button>
        </Flex>
      </Flex>
      <Box p="10" />
      <Text fontSize="2xl" fontWeight="700" color="gray.800">
        User Profile
      </Text>
      <Divider mt="1" mb="4" />
      <Flex w="100%" p="2" flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Flex mr={{ md: "20" }} w="100%" flexDirection="column">
          <Text my="4" mx="4" fontSize="xl" fontWeight="700">
            Name
          </Text>
          <Input
            bg="white"
            fontSize="lg"
            fontWeight="500"
            defaultValue={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </Flex>
        <Flex w="100%" flexDirection="column">
          <Text my="4" mx="4" fontSize="xl" fontWeight="700">
            Account Email
          </Text>
          <Input
            bg="white"
            fontSize="lg"
            fontWeight="500"
            defaultValue={email}
            disabled
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withPageAuthRequired();
