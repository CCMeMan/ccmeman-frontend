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
import {
  CalendarIcon,
  ChevronRightIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import ClipLoader from "react-spinners/ClipLoader";
// import Select, { StylesConfig, GroupBase } from "react-select";
import { DateTime } from "luxon";
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
    <>
      {/* <Box my={{ base: 5, md: 10, lg: 10 }} mx={{ base: 5, md: 10, lg: 40 }}>
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
      </Box> */}

      {/* <div className="sm:px-4 lg:px-40 lg:pt-10 xl:px-60 2xl:px-80 2xl:pt-30"> */}
      <div className="mx-auto max-w-7xl">
        <div className="border-b m-5 border-gray-200 pb-5">
          <h3 className="text-2xl font-medium leading-6 text-gray-900">
            Groups
          </h3>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md m-5">
          <ul role="list" className="divide-y divide-gray-200">
            {existingGroups?.map((item) => (
              <li key={item.id}>
                <div className="flex items-center px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="min-w-0 sm:flex-1 sm:items-center sm:justify-between">
                    <a
                      href={"group/" + item.nanoId}
                      className="hover:underline decoration-solid"
                    >
                      <div className="text-sm">
                        <p className="truncate font-medium text-indigo-600">
                          {item.name}
                        </p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                          {/* in [parentGroup] */}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Last updated on{" "}
                            <time dateTime={item.updatedAt}>
                              {DateTime.fromISO(item.updatedAt).toFormat(
                                "y LLL. d HH:mm:ss ZZZZ"
                              )}
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        {/* <div className="flex -space-x-1 overflow-hidden">
                        {position.applicants.map((applicant) => (
                          <img
                            key={applicant.email}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src={applicant.imageUrl}
                            alt={applicant.name}
                          />
                        ))}
                      </div> */}
                      </div>
                    </a>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md 
                    disabled:opacity-50
                      border border-transparent
                       bg-red-600 px-4 py-2 text-sm font-medium
                       text-white shadow-sm
                       enabled:hover:bg-red-700 enabled:active:bg-red-800"
                    // disabled
                  >
                    <TrashIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                  <div className="ml-5 flex-shrink-0">
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
                    placeholder="New Group Name"
                    className="block w-full mr-10 px-4 h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setNewGroupName(e.currentTarget.value);
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md 
                    disabled:opacity-50
                      border border-transparent
                       bg-indigo-500 px-4 py-2 text-sm font-medium
                       text-white shadow-sm
                       enabled:hover:bg-indigo-700 enabled:active:bg-indigo-800"
                  onClick={async () => {
                    createGroup();
                  }}
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Create
                </button>
                <div className="ml-5 flex-shrink-0">
                  <div className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="h-5"></div>
        <div className="border-b m-5 border-gray-200 pb-5">
          <h3 className="text-2xl font-medium leading-6 text-gray-900">
            Debug Info.
          </h3>
        </div>
        <div className="text-gray-300 px-10">
          {JSON.stringify(existingGroups)}
        </div> */}
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
