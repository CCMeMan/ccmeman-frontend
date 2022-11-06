import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
import {
  CalendarIcon,
  ChevronRightIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { DateTime } from "luxon";

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
      getMeetings();
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

  const getMeetings = async () => {
    try {
      const { data } = await axios.get(`/api/meeting/${group_nanoid}`, {});
      setExistingMeetings(data);
      toast({
        title: "Get Meeting List Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Get Meeting List Fail",
        description: "Please try again or contact service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // const getGroups = async () => {
  //   try {
  //     const { data } = await axios.get("/api/group", {});
  //     //   data.map((item) => {
  //     //     console.log(item);
  //     //   });
  //     setExistingGroups(data);
  //     toast({
  //       title: "Get Group List Success",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     toast({
  //       title: "Get Group List Fail",
  //       description: "Please try again or contact service.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // const GroupItem = (props) => {
  //   var isManager;
  //   props.group.users.map((item) => {
  //     if (item.user.userIdFromAuth0 === user.sub) {
  //       if (Object.values(item.role).includes("MANAGER")) {
  //         isManager = true;
  //       }
  //     }
  //   });
  //   return (
  //     <HStack mx={4}>
  //       <Flex>
  //         <Link
  //           my="0"
  //           mx="4"
  //           fontSize="xl"
  //           fontWeight="700"
  //           href={"group/" + props.group.nanoId}
  //         >
  //           {props.group.name}
  //         </Link>
  //         {/* {console.log("item")} */}
  //       </Flex>
  //       <Spacer />
  //       <Button colorScheme="red" disabled={!isManager}>
  //         Delete
  //       </Button>
  //     </HStack>
  //   );
  // };

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
  // const [newGroupName, setNewGroupName] = useState("");
  const [newMeetingName, setNewMeetingName] = useState("");

  // Existing Group Info States
  // const [existingGroups, setExistingGroups] = useState([]);
  const [existingGroup, setExistingGroup] = useState({ meetings: [] });
  const [existingMeetings, setExistingMeetings] = useState([]);
  // const [isGettingMeetings, setIsGettingMeetings] = useState([]);

  //  Referesh current Group list.
  //  FIXME: We should separate getMeeting/Group and setExistingMeeting/Group (side effects)
  useEffect(() => {
    // getGroups();
    getGroup();
    getMeetings();
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
    <>
      <div className="min-h-full0">
        {/* <div className="sm:px-4 lg:px-40 lg:pt-10 xl:px-60 2xl:px-80 2xl:pt-30"> */}

        <div className="mx-auto max-w-7xl pt-6">
          <div className="border-b m-5 border-gray-200 pb-5">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              Meetings in {existingGroup.name}
            </h3>
          </div>
          <div className="overflow-hidden bg-white shadow sm:rounded-md m-5">
            <ul role="list" className="divide-y divide-gray-200">
              {existingMeetings?.map((item) => (
                <li key={item.id}>
                  <div className="sm:flex items-center px-4 py-2 sm:px-6 hover:bg-gray-50">
                    <div className="min-w-0 sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div className="sm:flex-none sm:w-6/12">
                        <Link
                          href={"/meeting/" + group_nanoid + "/" + item.nanoId}
                          className="hover:underline decoration-solid"
                        >
                          <p className="truncate font-medium text-indigo-600">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                      <div className="flex sm:w-6/12 items-center text-sm text-gray-800">
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          <time dateTime={item.time}>
                            {DateTime.fromISO(item.time).toFormat(
                              "y LLL.dd - HH:mm ZZZZ"
                            )}
                          </time>
                        </p>
                        {/* <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        aa
                      </p> */}
                      </div>

                      {/* <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex -space-x-1 overflow-hidden">
                        {position.applicants.map((applicant) => (
                          <img
                            key={applicant.email}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src={applicant.imageUrl}
                            alt={applicant.name}
                          />
                        ))}
                      </div>
                    </div> */}
                    </div>
                    <button
                      type="button"
                      className="hidden sm:inline-flex items-center rounded-md 
                    disabled:opacity-50
                      border border-red-500
                       bg-white px-2 py-1 text-sm font-medium
                       text-red-500 shadow-sm
                       enabled:hover:text-white
                       enabled:hover:bg-red-600 enabled:active:bg-red-700"
                      // disabled
                    >
                      <TrashIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Delete
                    </button>
                    <div className="hidden sm:flex ml-5 sm:flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <div className="flex items-center px-4 py-4 sm:px-6 bg-gray-50">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <input
                      placeholder="New Meeting Name"
                      className="block w-full mr-10 px-4 h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        setNewMeetingName(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md 
                    disabled:opacity-50
                      border border-transparent
                       bg-indigo-600 px-4 py-2 text-sm font-medium
                       text-white shadow-sm
                       enabled:hover:bg-indigo-700 enabled:active:bg-indigo-800"
                    onClick={async () => {
                      createMeeting();
                    }}
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Create
                  </button>
                  <div className="ml-5 flex-shrink-0">
                    <div className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="h-5"></div>
          <div className="border-b m-5 border-gray-200 pb-5">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              User Profile in {existingGroup.name}
            </h3>
          </div>
          <div className="border-b m-5 border-gray-200 pb-5">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              Group Setting
            </h3>
          </div>
          <div className="border-b m-5 border-gray-200 pb-5">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              Debug Info.
            </h3>
          </div>
          <div className="text-gray-800 px-10">
            {JSON.stringify(existingGroup)}
            <br />
            <br />
            {JSON.stringify(existingMeetings)}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
export const getServerSideProps = withPageAuthRequired();
