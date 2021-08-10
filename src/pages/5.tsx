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
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  FormikProps,
  Field,
  FormikHelpers,
  FieldProps,
  FormikErrors,
  ErrorMessage,
} from "formik";

interface UserRegisterForm {
  name: string;
  username: string;
  lastName: string;
}

function validate(values: UserRegisterForm): FormikErrors<UserRegisterForm> {
  let errors: FormikErrors<UserRegisterForm> = {};
  if (!isNaN(Number(values.lastName))) {
    errors = {
      ...errors,
      lastName: "Lastname not should have numbers",
    };
  }
  return errors;
}

function validateUsername(username: string) {
  return new Promise((res, rejected) => {
    setTimeout(() => {
      if (username !== "user") {
        res("This user has already been occupied");
      }
      res(null);
    }, 3000);
  });
}

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
        validate={validate}
        initialValues={{
          username: "",
          lastName: "",
          name: "",
        }}
        onSubmit={async (
          values,
          { setSubmitting }: FormikHelpers<UserRegisterForm>
        ) => {}}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }: FormikProps<any>) => (
          <Box
            as="form"
            shadow="lg"
            bg="white"
            width="500px"
            borderRadius="md"
            onSubmit={handleSubmit as any}
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

            <Field validate={validateUsername} name="username">
              {({
                form,
                field,
                meta,
              }: FieldProps<string, UserRegisterForm>) => {
                return (
                  <FormControl
                    isInvalid={
                      !!(form.errors.username && form.touched.username)
                    }
                  >
                    <FormLabel>Username:</FormLabel>
                    <Input {...field}></Input>{" "}
                    <FormErrorMessage></FormErrorMessage>
                    <ErrorMessage
                      component={FormErrorMessage}
                      name="username"
                    ></ErrorMessage>
                  </FormControl>
                );
              }}
            </Field>

            <Field name="name">
              {({
                form,
                field,
                meta,
              }: FieldProps<string, UserRegisterForm>) => {
                return (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel>Name:</FormLabel>
                    <Input {...field}></Input>{" "}
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>
            <Field name="lastName">
              {({
                form,
                field,
                meta,
              }: FieldProps<string, UserRegisterForm>) => {
                return (
                  <FormControl
                    isInvalid={
                      !!(form.errors.lastName && form.touched.lastName)
                    }
                  >
                    <FormLabel>LastName:</FormLabel>
                    <Input {...field}></Input>{" "}
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>
            <Box my={3} display="block" textAlign="center">
              <Button disabled={isSubmitting} type="submit" mx={"auto"}>
                Submit
              </Button>
            </Box>
            <pre>{JSON.stringify(errors, null, 3)}</pre>
          </Box>
        )}
      </Formik>
    </Flex>
  );
}

export default NonFormik;
