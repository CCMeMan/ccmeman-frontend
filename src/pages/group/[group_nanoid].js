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
  Grid,
  GridItem,
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

// Main React Component
const GroupPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { group_nanoid } = router.query;

  const createMeeting = async () => {
    try {
      await axios.post(`/api/meeting/${group_nanoid}`, {
        meeting_name: newMeetingName,
      });
      toast({
        title: "Create Meeting Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getGroup();
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

  const getGroup = async () => {
    try {
      const { data } = await axios.get(`/api/group/${group_nanoid}`, {});
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

  const MeetingItem = (props) => {
    var isManager;
    existingGroup.users.map((item) => {
      if (item.user.userIdFromAuth0 === user.sub) {
        if (Object.values(item.role).includes("MANAGER")) {
          isManager = true;
        }
      }
    });
    return (
      <HStack>
        <Grid w="100%" templateColumns="repeat(10, 1fr)" gap={5}>
          <GridItem my={0} colStart={1} colEnd={6}>
            <Link
              // my="0"
              // mx="4"

              href={`/meeting/${group_nanoid}/` + props.meeting.nanoId}
            >
              <Flex _hover={{ bg: "green.50" }} h="100%" w="100%">
                <Text my={1} ml="6" fontSize="xl" fontWeight="500">
                  {props.meeting.name}
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem my={1} colStart={6} colEnd={10}>
            <Text py={1} pl="1" fontSize="l" color="gray.500">
              {props.meeting.updatedAt}
            </Text>
          </GridItem>
          <GridItem align="right">
            <Button colorScheme="red" variant="outline" disabled={!isManager}>
              Delete
            </Button>
          </GridItem>
        </Grid>
      </HStack>
    );
  };

  // Auth0 User State
  const { user, error, isLoading } = useUser();

  // New Group Info States
  const [newGroupName, setNewGroupName] = useState("");
  const [newMeetingName, setNewMeetingName] = useState("");

  // Existing Group Info States
  const [existingGroups, setExistingGroups] = useState([]);
  const [existingGroup, setExistingGroup] = useState({ meetings: [] });
  // const [existingMeetings, setExistingMeetings] = useState([]);

  //  Referesh current Group list.
  //  FIXME: We should separate getMeeting/Group and setExistingMeeting/Group (side effects)
  useEffect(() => {
    getGroups();
    getGroup();
    console.log("effect");
  }, [isLoading]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <ClipLoader color="#36d7b7" />
      </Center>
    );
  }
  return (
    <Box my={{ base: 5, md: 10, lg: 10 }} mx={{ base: 5, md: 10, lg: 40 }}>
      <Text fontSize="4xl" fontWeight="700" color="gray.800">
        Group: {existingGroup.name}
      </Text>
      <Divider mt="1" mb="4" />
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
        <Grid w="100%" templateColumns="repeat(10, 1fr)" gap={5}>
          <GridItem my={1} colStart={1} colEnd={6}>
            <Text my="0" mx="4" fontSize="2xl" fontWeight="600">
              Name
            </Text>
          </GridItem>
          <GridItem my={1} colStart={6} colEnd={10}>
            <Text fontSize="2xl" fontWeight="600">
              Last Updated
            </Text>
          </GridItem>
          <GridItem align="right">
            {/* <Button colorScheme="red" disabled={!isManager}>
              Delete
            </Button> */}
          </GridItem>
        </Grid>

        {/* <Text>{JSON.stringify(existingGroup.meetings)}</Text> */}
        {existingGroup.meetings.map((item) => {
          return <MeetingItem key={item.id} meeting={item} />;
        })}

        <Flex mx={0}>
          <Input
            mr={2}
            type="text"
            id="meeting-name"
            placeholder="New Meeting Name"
            onChange={(e) => {
              setNewMeetingName(e.currentTarget.value);
            }}
          ></Input>
          <Button
            // variant="outline"
            colorScheme="green"
            onClick={async () => {
              createMeeting();
            }}
          >
            Create Meeting
          </Button>
        </Flex>
      </VStack>
      <Flex p="4" />

      <Text fontSize="3xl" fontWeight="700" color="gray.800">
        Sub-Groups
      </Text>
      <Divider mt="1" mb="4" />
      {/* <VStack
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
              // createGroup();
            }}
          >
            Create Group{" "}
          </Button>
        </Flex>
      </VStack> */}
      <Flex p="4" />
      <Text fontSize="3xl" fontWeight="700" color="gray.800">
        Group Profile
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
    </Box>
  );
};

export default GroupPage;
export const getServerSideProps = withPageAuthRequired();
