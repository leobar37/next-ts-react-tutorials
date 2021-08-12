import React, { ReactNode, ReactChild, PropsWithChildren, FC } from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import Layout from "../components/Layout";

type ChildProps = {
  title: ReactChild;
  body: ReactChild;
  footer: ReactChild;
};

type CardProps = {
  children: ChildProps | ReactNode;
};

const isChildObject = (obj: any): obj is ChildProps => {
  return typeof obj == "object" && typeof obj != "function" && "title" in obj;
};

export const Card = ({ children }: CardProps) => {
  let content = null;

  if (isChildObject(children)) {
    const { title, body, footer } = children;
    content = (
      <React.Fragment>
        <Text fontWeight="bold">{title}</Text>
        <Box color="red">{body}</Box>
        <HStack>
          <Box>{footer}</Box>
        </HStack>
      </React.Fragment>
    );
  } else {
    content = children;
  }

  return (
    <VStack
      color="black"
      m={2}
      height="150px"
      width="150px"
      bg="white"
      shadow="xl"
    >
      {content}
    </VStack>
  );
};

function Page() {
  return (
    <Layout>
      <Card>
        {{
          body: (
            <Box>
              <h1>hello body</h1>
            </Box>
          ),
          title: "Header",
          footer: "footer",
        }}
      </Card>
      <Card>
        <h1>hello</h1>
      </Card>
    </Layout>
  );
}

export default Page;
