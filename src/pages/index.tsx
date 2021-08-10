import React, { FormEventHandler, ChangeEventHandler, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  InputProps,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  FormikProps,
  Field,
  FormikHelpers,
  FieldProps,
  ErrorMessage,
  FormikErrors,
  useField,
} from "formik";

import * as yup from "yup";
import { SchemaOf, Asserts, TypeOf } from "yup";
import { InputControl, SubmitButton } from "formik-chakra-ui";
const userSchema = yup.object({
  name: yup
    .string()
    .min(8, "El nombre no puede tener menos de 8 caracteres")
    .required(),
  lastName: yup.string().defined().required(),
  username: yup.string().required("The username is required"),
});

interface UserRegisterForm extends Asserts<typeof userSchema> {}

const sleeep = (num: number) =>
  new Promise((res) => setTimeout(() => res(null), num));

type MyCustomFieldProps = {
  name: string;
  label: string;
} & InputProps;

const MyCustomField = <Val extends undefined>({
  name,
  label,
  ...args
}: MyCustomFieldProps) => {
  const [field, meta, helpers] = useField<Val>({
    name: name,
  });

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...args}></Input>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

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
        validationSchema={userSchema}
        initialValues={
          {
            username: "",
            lastName: "",
            name: "",
          } as UserRegisterForm
        }
        onSubmit={async (
          values,
          {
            setSubmitting,
            resetForm,
            setFieldError,
            setErrors,
          }: FormikHelpers<UserRegisterForm>
        ) => {
          await sleeep(3000);
          toast({
            description: "Successfull registration, welcome " + values.name,
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          handleReset,
          handleBlur,
          isSubmitting,
          errors,
        }: FormikProps<UserRegisterForm>) => (
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

            <MyCustomField name="username" color="red" label="Usuario" />
            <MyCustomField name="name" label="Name" />
            <MyCustomField name="lastName" label="Last Name" />

            {/* <InputControl name="username" label="Username" />
            <InputControl name="name" label="Name" />
            <InputControl name="lastName" label="Last Name" /> */}
            <Box my={3} display="block" textAlign="center">
              <SubmitButton disabled={isSubmitting} type="submit" mx={"auto"}>
                Submit
              </SubmitButton>
            </Box>
          </Box>
        )}
      </Formik>
    </Flex>
  );
}

export default NonFormik;
