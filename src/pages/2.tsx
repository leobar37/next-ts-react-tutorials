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
  const [values, setValues] = useState({
    username: "",
    name: "",
    lastName: "",
  });
  const onSubmit: FormEventHandler<any> = (e) => {
    e.preventDefault();
    toast({
      description: JSON.stringify(values, null, 2),
    });
  };
  const handleOnChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as string;
    setValues((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
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
        borderRadius="md"
        p={4}
        onSubmit={onSubmit}
      >
        <Text textAlign="center" fontWeight="semibold" fontSize="2xl" my={2}>
          Register
        </Text>
        <FormControl>
          <FormLabel>Username:</FormLabel>
          <Input
            name="username"
            value={values.username}
            onChange={handleOnChangue}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name: </FormLabel>
          <Input name="name" value={values.name} onChange={handleOnChangue} />
        </FormControl>
        <FormControl>
          <FormLabel>LastName:</FormLabel>
          <Input
            name="lastName"
            value={values.lastName}
            onChange={handleOnChangue}
          />
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
