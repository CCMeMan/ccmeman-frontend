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

const GroupProfile = () => {
  const toast = useToast();
  const router = useRouter();
  const { group_nanoid } = router.query;

  const getGroup = async () => {
    try {
      const { data } = await axios.post(`/api/group/get/${group_nanoid}`, {});
      //   data.map((item) => {
      //     console.log(item);
      //   });
      setExistingGroup(data);
      toast({
        title: "Get Group Info. Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Get Group Info. Fail",
        description: "Please try again or contact service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getGroups = async () => {
    try {
      const { data } = await axios.post("/api/group/get", {});
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

  // Auth0 User State
  const { user, error, isLoading } = useUser();

  // New Group Info States
  const [newGroupName, setNewGroupName] = useState("");

  // Existing Group Info States
  const [existingGroups, setExistingGroups] = useState([]);
  const [existingGroup, setExistingGroup] = useState([]);

  //   Referesh current Group list.
  useEffect(() => {
    getGroups();
    getGroup();
    console.log("effect");
  }, [isLoading]);

  return (
    <Box my={{ base: 5, md: 10, lg: 10 }} mx={{ base: 5, md: 10, lg: 40 }}>
      <Text fontSize="3xl" fontWeight="700" color="gray.800">
        Group Profile: {existingGroup.name}
      </Text>
      <Divider mt="1" mb="4" />
      <Flex
        mx={{ base: 5, md: 10 }}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {JSON.stringify(existingGroup)}
      </Flex>
      <Flex p="4" />

      <Text fontSize="3xl" fontWeight="700" color="gray.800">
        Meetings
      </Text>
      <Divider mt="1" mb="4" />
      <VStack
        mx={{ base: 5, md: 10 }}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {/* <Text mx={4} fontSize="2xl" fontWeight="700" color="gray.800">
          Name
        </Text> */}

        {existingGroups.map((item) => {
          return <GroupItem key={item.id} group={item} />;
        })}

        <Flex mx={4}>
          <Input
            mr={2}
            type="text"
            id="meeting-name"
            placeholder="New Meeting Name"
            onChange={(e) => {
              // setNewGroupName(e.currentTarget.value);
            }}
          ></Input>
          <Button
            colorScheme="green"
            onClick={async () => {
              // createGroup();
            }}
          >
            Create Meeting
          </Button>
        </Flex>
      </VStack>
      <Flex p="4" />

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
};

export default GroupProfile;
export const getServerSideProps = withPageAuthRequired();
