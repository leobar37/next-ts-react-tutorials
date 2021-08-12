import { Center } from "@chakra-ui/layout";
import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <Center bg="blue.600" width="100vw" minHeight="100vh">
      {children}
    </Center>
  );
}

export default Layout;
