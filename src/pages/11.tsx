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
  HStack,
  Center,
  Textarea,
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  FormikHelpers,
  FormikProps,
  useField,
  FieldArray,
  useFormikContext,
  getIn,
} from "formik";
import React from "react";
import * as yup from "yup";
import { SchemaOf, Asserts } from "yup";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
const registerSchema = yup.object({
  username: yup
    .string()
    .min(8, "Minimo 8 caracteres")
    .required("Este campo es requerido"),
  name: yup.string().required(),
  lastName: yup.string().required(),
  skills2: yup.array().of(
    yup.object({
      name: yup.string().required("Required"),
      description: yup.string().required(),
    })
  ),
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

type SkillsFormProps = {
  name: string;
};
const SkillsForm = ({ name }: SkillsFormProps) => {
  const { values } = useFormikContext<UserRegisterForm>();
  return (
    <FieldArray
      name={name}
      render={({ push, remove }) => {
        return (
          <React.Fragment>
            <HStack spacing={10} my={2}>
              <Text fontWeight="semibold">Skills</Text>
              <Button onClick={() => push({ name: "", description: "" })}>
                add
              </Button>
            </HStack>
            {getIn(values, name) &&
              (getIn(values, name) as any[]).map((item, idx) => (
                <Flex key={idx}>
                  <Box mx={2} minWidth="350px">
                    <InputControl name={`${name}[${idx}].name`} label="Name" />
                    <TextareaControl
                      name={`${name}[${idx}].description`}
                      label="Description"
                    />
                  </Box>
                  <Center>
                    <Button onClick={() => remove(idx)} colorScheme="red">
                      x
                    </Button>
                  </Center>
                </Flex>
              ))}
          </React.Fragment>
        );
      }}
    />
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
        initialValues={{
          username: "",
          lastName: "",
          name: "",
          skills2: [
            {
              name: "Docker",
              description: "asasa",
            },
          ],
        }}
        validationSchema={registerSchema}
        onSubmit={async (
          values,
          { setSubmitting }: FormikHelpers<UserRegisterForm>
        ) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }: FormikProps<UserRegisterForm>) => (
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
              Hello developer , Fill this form 😀
            </Text>

            <InputControl name="username" label="Username" />
            <InputControl name="name" label="Name" />
            <InputControl name="lastName" label="Last Name" />
            <SkillsForm name="skills2" />
            {/* skills */}

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
