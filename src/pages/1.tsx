import React, { FormEventHandler, ChangeEventHandler, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

function NonFormik() {
  const toast = useToast();
  const [username, setUsername] = useState("username");
  const onSubmit: FormEventHandler<any> = (e) => {
    e.preventDefault();
    toast({
      description: "Result is " + username,
    });
  };
  const handleOnChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };
  return (
    <Flex
      height="100vh"
      width="100vw"
      bg="blue.600"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        as="form"
        shadow="lg"
        bg="white"
        width="500px"
        className=""
        height="250px"
        borderRadius="md"
        p={4}
        onSubmit={onSubmit}
      >
        <Text textAlign="center" fontWeight="semibold" fontSize="2xl" my={2}>
          Loguin
        </Text>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={handleOnChangue} />
        </FormControl>
        <Box my={3} display="block" textAlign="center">
          <Button type="submit" mx={"auto"}>
            Submit
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default NonFormik;
