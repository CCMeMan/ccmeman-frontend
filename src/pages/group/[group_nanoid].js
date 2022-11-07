import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import {
  Box,
  Flex,
  Center,
  Spacer,
  Text,
  Button,
  useToast,
  HStack,
  VStack,
  StackDivider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  CalendarIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
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
      <div className=" min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl flex justify-center items-center bg-gray-600">
                    <UserGroupIcon className="h-12 w-12 text-white" alt="" />
                  </div>
                  <span
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {existingGroup.name}
                </h1>
                <p className="text-sm font-medium text-gray-400">
                  Last updated on{" "}
                  <time dateTime={existingGroup.updatedAt}>
                    {DateTime.fromISO(existingGroup.updatedAt).toFormat(
                      "y LLL. dd - HH:mm ZZZZ"
                    )}
                  </time>
                </p>
              </div>
            </div>
            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <button
                type="button"
                className="hidden sm:inline-flex items-center rounded-md 
                    disabled:opacity-50
                      border border-red-500
                       bg-white px-4 py-2 text-sm font-medium
                       text-red-500 shadow-sm
                       enabled:hover:text-white
                       enabled:hover:bg-red-600 enabled:active:bg-red-700"
                // disabled
              >
                <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Delete Group
              </button>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Meetings
                    </h2>
                  </div>
                  <div className="overflow-hidden bg-white shadow sm:rounded-md ">
                    <ul role="list" className="divide-y divide-gray-200">
                      {existingMeetings?.map((item) => (
                        <li key={item.id}>
                          <div className="sm:flex items-center px-4 py-2 sm:px-6 hover:bg-gray-50">
                            <div className="min-w-0 sm:flex sm:flex-1 sm:items-center sm:justify-between">
                              <div className="sm:flex-none sm:w-7/12">
                                <Link
                                  href={
                                    "/meeting/" +
                                    group_nanoid +
                                    "/" +
                                    item.nanoId
                                  }
                                  className="hover:underline decoration-solid"
                                >
                                  <p className="truncate font-medium text-indigo-600">
                                    {item.name}
                                  </p>
                                </Link>
                              </div>
                              <div className="flex sm:w-5/12 items-center text-sm text-gray-800">
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
                              className="hidden sm:inline-flex items-center justify-center rounded-md mr-1
                                          disabled:opacity-50
                                            border border-indigo-500
                                            bg-white px-2 py-1 text-sm font-medium
                                            text-indigo-600 shadow-sm
                                            enabled:hover:text-white
                                            enabled:hover:bg-indigo-600 enabled:active:bg-indigo-700"
                              // disabled
                            >
                              <DocumentDuplicateIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Duplicate
                            </button>
                            <button
                              type="button"
                              className="hidden sm:inline-flex items-center justify-center rounded-md 
                                          disabled:opacity-50
                                            border border-red-500
                                            bg-white px-2 py-1 text-sm font-medium
                                            text-red-500 shadow-sm
                                            enabled:hover:text-white
                                            enabled:hover:bg-red-600 enabled:active:bg-red-700"
                              // disabled
                            >
                              <TrashIcon
                                className=" h-5 w-5"
                                aria-hidden="true"
                              />
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
                            className="inline-flex items-center rounded-md  ml-2
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
                          <div className="sm:ml-10 flex-shrink-0"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Sub-Groups
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Use sub-groups as folders of meetings.
                      </p>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <p>Not supported yet.</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    Add Link Add Link Button
                  </div>
                </div>
              </section>

              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Group Setting
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Use sub-groups as folders of meetings.
                      </p>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Group Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="name"
                              defaultValue={existingGroup.name}
                              onChange={(e) => {
                                // setName(e.currentTarget.value);
                              }}
                              className="disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
                    <button
                      // type="submit"
                      onClick={async () => {
                        // updateUser();
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent
                               bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                               hover:bg-indigo-700 active:bg-indigo-800"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </section>
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Group User Infomation
                      </h2>
                      <p className="text-gray-500 text-sm">
                        These settings will be the default value used in
                        meetings created under this group.
                      </p>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                          {/* <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Public Display Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="name"
                              disabled
                              defaultValue={user?.name}
                              onChange={(e) => {
                                // setName(e.currentTarget.value);
                              }}
                              className="disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div> */}
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Your Default Public Email
                            </label>

                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              // autoComplete="email"
                              defaultValue={user?.email} // FIXME: TODO: use public email instead.
                              disabled
                              className="disabled:opacity-50  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <p className="text-xs text-gray-500">
                              For example, you may want to display
                              user@myschool.edu in this group.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
                    <button
                      // type="submit"
                      onClick={async () => {
                        // updateUser();
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent
                               bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                               hover:bg-indigo-700 active:bg-indigo-800"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-span-1 lg:col-start-3"
            >
              <div className="divide-y divide-gray-200 bg-white shadow sm:rounded-lg ">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900 px-4 py-5 sm:px-6"
                >
                  Participants
                </h2>

                <div className="px-4 sm:px-6">
                  <div>
                    <div className="mt-6 ">
                      <ul
                        role="list"
                        className="-my-5 divide-y divide-gray-200"
                      >
                        {existingGroup?.users?.map((item) => (
                          <li key={1} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.picture}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {item.user.name}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  {item.publicEmail}
                                  {/*FIXME: Shoudl be publicEmail in group/meeting*/}
                                </p>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                  {item.role}
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="justify-stretch mt-6 flex flex-col bg-gray-100">
                  <div className="mt-4 px-4  sm:px-6">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email of new member"
                    />
                  </div>
                  <div className="flex  my-4 px-4 sm:px-6">
                    <button
                      type="button"
                      className="inline-flex flex-grow items-center justify-center rounded-md border border-transparent
                                bg-indigo-600 px-4 py-2 text-sm font-medium
                                text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800"
                    >
                      Add New Member
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <div className="min-h-full0">
        {/* <div className="sm:px-4 lg:px-40 lg:pt-10 xl:px-60 2xl:px-80 2xl:pt-30"> */}

        <div className="mx-auto max-w-7xl pt-6">
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
