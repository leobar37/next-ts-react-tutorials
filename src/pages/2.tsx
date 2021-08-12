import React, { ReactNode, PropsWithChildren, FC } from "react";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import Layout from "../components/Layout";

const Card = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <VStack m={2} height="150px" width="150px" bg="white" shadow="lg">
      <Text fontWeight="bold">{title}</Text>
      {children}
    </VStack>
  );
};
const Card2: FC<{ title: string }> = ({ children, title }) => {
  return (
    <VStack m={2} height="150px" width="150px" bg="white" shadow="lg">
      <Text fontWeight="bold">{title}</Text>
      {children}
    </VStack>
  );
};

function Page() {
  return (
    <Layout>
      <Card title="hello title">
        <p>hello children</p>
      </Card>
      <Card2 title="Hello title 2">
        <p>hello children</p>
      </Card2>
    </Layout>
  );
}

export default Page;
