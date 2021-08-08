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
  chakra,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  FormikProps,
  Field,
  FormikHelpers,
  FieldProps,
} from "formik";

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
        onSubmit={async (values, { setSubmitting }: FormikHelpers<any>) => {
          setTimeout(() => {
            toast({
              description: JSON.stringify(values, null, 4),
            });
          }, 300);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          handleReset,
          handleBlur,
          isSubmitting,
        }: FormikProps<any>) => (
          <Box
            as="form"
            shadow="lg"
            bg="white"
            width="500px"
            borderRadius="md"
            onSubmit={handleSubmit as any}
            onReset={handleReset}
            onBlur={handleBlur}
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
              <Field name="username">
                {({ form, field, meta }: FieldProps) => {
                  console.log(meta.error);

                  return <Input {...field}></Input>;
                }}
              </Field>
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
