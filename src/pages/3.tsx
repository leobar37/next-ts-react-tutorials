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
import { Formik, Form, FormikProps, Field, FormikHelpers } from "formik";
function NonFormik() {
  const toast = useToast();

  return (
    <Flex
      height="100vh"
      width="100vw"
      bg="blue.600"
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={{
          username: "",
          lastName: "",
          name: "",
        }}
        onSubmit={(values, { setSubmitting }: FormikHelpers<any>) => {
          setSubmitting(true);

          setTimeout(() => {
            toast({
              description: JSON.stringify(values, null, 4),
            });
            setSubmitting(false);
          }, 300);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isSubmitting,
        }: FormikProps<any>) => (
          <Box
            as="form"
            shadow="lg"
            bg="white"
            onSubmit={handleSubmit as any}
            width="500px"
            borderRadius="md"
            p={4}
          >
            <Text
              textAlign="center"
              fontWeight="semibold"
              fontSize="2xl"
              my={2}
            >
              Register
            </Text>
            <FormControl>
              <FormLabel>Username:</FormLabel>
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Name: </FormLabel>
              <Input name="name" value={values.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>LastName:</FormLabel>
              <Input
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <Box my={3} display="block" textAlign="center">
              <Button disabled={isSubmitting} type="submit" mx={"auto"}>
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Flex>
  );
}

export default NonFormik;
