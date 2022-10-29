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
import { HashLoader } from "react-spinners";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  useUser,
  withPageAuthRequired,
  UserProfile,
} from "@auth0/nextjs-auth0";

export default function UserProfilePage() {
  const { user, error, isLoading } = useUser();
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
            defaultValue={user?.name ?? ""}
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
            defaultValue={user?.email ?? ""}
            disabled
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withPageAuthRequired();
