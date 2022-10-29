import {
    Flex,
    Text,
    Image,
    HStack,
    Button,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaHeartbeat, FaSignInAlt } from "react-icons/fa";
  import Link from "next/link";
  
  export default function ErrorPage() {
    const handleOpenPage = (page) => {
      window.open(page, "_blank");
    };
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        w="100%"
        minH="95vh"
        overflow="visible"
        px={{ base: "2vw", md: "10vw", lg: "15vw" }}
        py="64px"
        bg={useColorModeValue("white", "black")}
      >
        <Text fontSize="4xl" color="gray.500" m="2vh">
          Oops! Something Wrong 😢
        </Text>
        <Flex direction={"column"} alignItems={"center"}>
          <HStack spacing={2} wrap="wrap">
            <Text fontSize="xl" color="gray.500" fontWeight={500}>
              Please try to
            </Text>
            <Link href={"/api/auth/login"}>
              <Button size="xs" colorScheme="cyan" leftIcon={<FaSignInAlt />}>
                Login
              </Button>
            </Link>
            <Text fontSize="xl" color="gray.500" fontWeight={500}>
              again.
            </Text>
          </HStack>
          <Text fontSize="xl" color="gray.500">
            If the problem cannot be solved, please contact us.
          </Text>
        </Flex>
      </Flex>
    );
  }