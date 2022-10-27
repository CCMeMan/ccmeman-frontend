import '../styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider, Flex } from "@chakra-ui/react";


import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <NavBar/>
        <Flex pt="60px" />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp
