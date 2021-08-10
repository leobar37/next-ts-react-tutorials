import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  InputProps,
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  FormikHelpers,
  FormikProps,
  useField,
} from "formik";
import React from "react";
import * as yup from "yup";
import { SchemaOf, Asserts } from "yup";
import { InputControl, SubmitButton } from "formik-chakra-ui";
const registerSchema = yup.object({
  username: yup
    .string()
    .min(8, "Minimo 8 caracteres")
    .required("Este campo es requerido"),
  name: yup.string().required(),
  lastName: yup.string().required(),
});

interface UserRegisterForm extends Asserts<typeof registerSchema> {}

const sleep = (num: number) =>
  new Promise((res) => setTimeout(() => res(null), num));

function validateUsername(username: string) {
  return new Promise((res, rejected) => {
    setTimeout(() => {
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
        initialValues={{
          username: "",
          lastName: "",
          name: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (
          values,
          { setSubmitting }: FormikHelpers<UserRegisterForm>
        ) => {
          await sleep(3000);
          toast({
            description: "Successfull registration , welcome " + values.name,
          });
        }}
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

            <InputControl name="username" label="Username" />
            <InputControl name="name" label="Name" />
            <InputControl name="lastName" label="Last Name" />

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
