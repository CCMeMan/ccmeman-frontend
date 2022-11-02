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
  Link,
  Input,
  Button,
  useToast,
  HStack,
  VStack,
  StackDivider,
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
import ClipLoader from "react-spinners/ClipLoader";
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

export default function UserGroupsPage() {
  const toast = useToast();

  // React State Hooks
  const { user, error, isLoading } = useUser(); // Auth0 User State
  const [newGroupName, setNewGroupName] = useState(""); // New Group Info States
  const [existingGroups, setExistingGroups] = useState([]); // Existing Group Info States

  // Referesh current Group list.
  useEffect(() => {
    getGroups();
    console.log("effect");
  }, [isLoading]);

  const createGroup = async () => {
    try {
      const { data } = await axios.get("/api/user", {});
      const public_email = data.email;

      await axios.post("/api/group", {
        group_name: newGroupName,
        public_email: public_email,
      });
      toast({
        title: "Group Creation Success",
        description: `Group ${newGroupName} has been created`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getGroups();
    } catch (e) {
      console.log(e);
      toast({
        title: "Update Fail",
        description: "Please try again or contact service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // TODO: Error Handling
      // if ((e as AxiosError)?.response?.status === 401) {
      //     router.push("/api/auth/login");
      // }
    }
  };

  const getGroups = async () => {
    try {
      const { data } = await axios.get("/api/group", {});
      //   data.map((item) => {
      //     console.log(item);
      //   });
      setExistingGroups(data);
      toast({
        title: "Get Group List Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Get Group List Fail",
        description: "Please try again or contact service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const GroupItem = (props) => {
    var isManager;
    props.group.users.map((item) => {
      if (item.user.userIdFromAuth0 === user.sub) {
        if (Object.values(item.role).includes("MANAGER")) {
          isManager = true;
        }
      }
    });
    return (
      <HStack mx={4}>
        <Flex>
          <Link
            my="0"
            mx="4"
            fontSize="xl"
            fontWeight="700"
            href={"group/" + props.group.nanoId}
          >
            {props.group.name}
          </Link>
          {/* {console.log("item")} */}
        </Flex>
        <Spacer />
        <Button colorScheme="red" disabled={!isManager}>
          Delete
        </Button>
      </HStack>
    );
  };

  // Return Page
  // FIXME: change isLoading from Auth0 to a real "loading" indicator
  if (isLoading) {
    return (
      <Center h="100vh">
        <ClipLoader color="#36d7b7" />
      </Center>
    );
  }
  return (
    <Box my={{ base: 5, md: 10, lg: 10 }} mx={{ base: 5, md: 10, lg: 40 }}>
      <Text fontSize="3xl" fontWeight="700" color="gray.800">
        Groups
      </Text>
      <Divider mt="1" mb="4" />
      <VStack
        mx={{ base: 5, md: 10 }}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        <Text mx={4} fontSize="2xl" fontWeight="700" color="gray.800">
          Name
        </Text>

        {existingGroups.map((item) => {
          return <GroupItem key={item.id} group={item} />;
        })}

        <Flex mx={4}>
          <Input
            mr={2}
            type="text"
            id="group-name"
            placeholder="Name"
            onChange={(e) => {
              setNewGroupName(e.currentTarget.value);
            }}
          ></Input>
          <Button
            colorScheme="green"
            onClick={async () => {
              createGroup();
            }}
          >
            Create Group{" "}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

export const getServerSideProps = withPageAuthRequired();
