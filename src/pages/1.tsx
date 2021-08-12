import React, { ReactNode } from "react";
import { Box, Center } from "@chakra-ui/react";
import Layout from "../components/Layout";

type CardProps = {
  children: ReactNode;
};
const Card = ({ children }: CardProps) => {
  return (
    <Center m={2} height="150px" width="150px" bg="white" shadow="lg">
      {children}
    </Center>
  );
};

function Page() {
  return (
    <Layout>
      <Card>as</Card>
    </Layout>
  );
}

export default Page;
