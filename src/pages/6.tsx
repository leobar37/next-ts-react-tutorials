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
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import React from "react";
import * as yup from "yup";
import { SchemaOf } from "yup";
interface UserRegisterForm {
  name: string;
  username: string;
  lastName: string;
}

const registerSchema: SchemaOf<UserRegisterForm> = yup.object({
  username: yup
    .string()
    .min(8, "Minimo 8 caracteres")
    .required("Este campo es requerido"),
  name: yup.string().required(),
  lastName: yup.string().required(),
});

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
        initialValues={{
          username: "",
          lastName: "",
          name: "",
        }}
        validationSchema={registerSchema}
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
