import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
import { DateTimePicker } from "src/components/DateTimePicker.js";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  CalendarDaysIcon,
  CalendarIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  // TrashIcon,
} from "@heroicons/react/24/outline";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";

import {
  useUser,
  withPageAuthRequired,
  UserProfile,
} from "@auth0/nextjs-auth0";

// import "react-datepicker/dist/react-datepicker.css";
// import "src/styles/date-picker.module.css";

import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";

const Meeting = () => {
  const toast = useToast();
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const { group_nanoid, meeting_nanoid } = router.query;
  const [startDate, setStartDate] = useState(new Date());
  const [existingMeeting, setExistingMeeting] = useState("");

  const getMeeting = async () => {
    try {
      const { data } = await axios.get(
        `/api/meeting?meeting-nano-id=${meeting_nanoid}`,
        {}
      );
      setExistingMeeting(data);
      toast({
        title: "Get Meeting Info. Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log("Fail");
      toast({
        title: "Get Meeting Info. Fail",
        description: "Please try again or contact service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const AddToCalendar = (props) => {
    const meetingStartDateTime = DateTime.fromISO(
      existingMeeting?.time ?? DateTime.now()
    );
    const meetingEndDateTime = existingMeeting?.endTime
      ? DateTime.fromISO(existingMeeting?.endTime)
      : meetingStartDateTime.plus({ hours: 1 });

    return atcb_action({
      name: existingMeeting?.name ?? " ",
      startDate: meetingStartDateTime.toFormat("y-MM-dd"),
      endDate: meetingEndDateTime.toFormat("y-MM-dd"),
      startTime: meetingStartDateTime.toFormat("HH:mm"),
      endTime: meetingEndDateTime.toFormat("HH:mm"),
      location: existingMeeting?.location ?? "TBD",
      description:
        "Online Meeting Link: " +
        (existingMeeting.roomURL ?? "TBD") +
        "<br/><br/>" +
        (existingMeeting?.info ?? "No detail information."),
      options: [
        "Apple",
        "Google",
        "iCal",
        "Microsoft365",
        "Outlook.com",
        // "Yahoo",
      ],
      timeZone: DateTime.fromISO(
        existingMeeting?.time ?? DateTime.now()
      ).toFormat("z"),
      iCalFileName: existingMeeting?.name ?? "MeetingEvent",
    });
  };

  // FIXME: There should be better way to handle "isLoading"
  useEffect(() => {
    if (router.isReady) {
      getMeeting();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-4/6 flex items-center justify-center">
          <ClipLoader color="#36d7b7" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className=" min-h-full">
        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="border-t border-gray-200 py-3">
              <nav className="flex" aria-label="Breadcrumb">
                <div className="flex sm:hidden">
                  <a
                    href="#"
                    className="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLongLeftIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600"
                      aria-hidden="true"
                    />
                    <span>Back to Applicants</span>
                  </a>
                </div>
                <div className="hidden sm:block">
                  <ol role="list" className="flex items-center space-x-4">
                    <li>
                      <div>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <HomeIcon
                            className="h-5 w-5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Home</span>
                        </a>
                      </div>
                    </li>
                    {breadcrumbs.map((item) => (
                      <li key={item.name}>
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                          <a
                            href={item.href}
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
            </div>
          </div>
        </header> */}
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full flex justify-center items-center bg-indigo-600">
                    <CalendarDaysIcon className="h-12 w-12 text-white" alt="" />
                  </div>
                  <span
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {existingMeeting.name}
                </h1>
                <p className="text-sm font-medium text-gray-400">
                  Last updated on{" "}
                  <time dateTime={existingMeeting.updatedAt}>
                    {DateTime.fromISO(existingMeeting.updatedAt).toFormat(
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
                       bg-white px-2 py-1 text-sm font-medium
                       text-red-500 shadow-sm
                       enabled:hover:text-white
                       enabled:hover:bg-red-600 enabled:active:bg-red-700"
                // disabled
              >
                <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Delete Meeting
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center 
                           rounded-md border border-transparent
                         bg-indigo-600 px-4 py-2 text-sm font-medium
                         text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800"
              >
                <CalendarDaysIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Vote for Meeting Time!
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
                      Meeting Details
                    </h2>
                    <button
                      type="button"
                      onClick={AddToCalendar}
                      className="inline-flex items-center justify-center 
                           rounded-md border border-indigo-600
                         bg-white px-4 py-2 text-sm font-medium
                           text-indigo-600
                         hover:text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800"
                    >
                      <CalendarIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Add to Calendar
                    </button>
                    {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Personal details and application.
                    </p> */}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-lg font-medium text-gray-500">
                          Meeting Start Time
                        </dt>
                        <dd className="mt-1 text-lg text-indigo-600">
                          <time dateTime={existingMeeting.time}>
                            {DateTime.fromISO(existingMeeting.time).toFormat(
                              "y LLL. dd (EEE.) - HH:mm ZZZZ"
                            )}
                          </time>
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-lg font-medium text-gray-500">
                          End Time
                        </dt>
                        <dd className="mt-1 text-lg text-gray-900">
                          Not supported yet
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-lg font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 text-lg text-gray-900">
                          {existingMeeting?.location ?? "TBD"}
                        </dd>
                      </div>

                      <div className="sm:col-span-2">
                        <dt className="text-lg font-medium text-gray-500">
                          Online Meeting Room Link
                        </dt>
                        <dd className="mt-1 text-lg text-gray-900">
                          {existingMeeting?.roomURL ?? "TBD"}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-lg font-medium text-gray-500">
                          About
                        </dt>
                        <dd className="mt-1 text-base text-gray-900">
                          {existingMeeting?.info ?? "No info."}
                        </dd>
                      </div>
                      {/* <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Attachments
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul
                            role="list"
                            className="divide-y divide-gray-200 rounded-md border border-gray-200"
                          >
                            {attachments.map((attachment) => (
                              <li
                                key={attachment.name}
                                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                              >
                                <div className="flex w-0 flex-1 items-center">
                                  <PaperClipIcon
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    {attachment.name}
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href={attachment.href}
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div> */}
                    </dl>
                  </div>
                  {/* <div>
                    <a
                      href="#"
                      className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      Read full application
                    </a>
                  </div> */}
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Links
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Add links to minutes and slides from Google Drive,
                        Dropbox, HackMD, ...
                      </p>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <li>link</li>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    Add Link Add Link Button
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

                {/* Activity Feed */}
                <div className="px-4 sm:px-6">
                  <div>
                    <div className="mt-6 ">
                      <ul
                        role="list"
                        className="-my-5 divide-y divide-gray-200"
                      >
                        {existingMeeting?.users?.map((item) => (
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
                                  {item.user.email}
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
      {/* <p>
        Group: {group_nanoid}, Meeting {meeting_nanoid}
      </p>

      <DateTimePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      {JSON.stringify(existingMeeting)} */}
    </>
  );
};

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
  {
    id: 6,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default Meeting;
