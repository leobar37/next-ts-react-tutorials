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
  Textarea,
  HStack,
  Fade,
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
  FieldArrayRenderProps,
  FieldArray,
  useFormikContext,
  getIn,
} from "formik";
import { AnimatePresence } from "framer-motion";
import * as yup from "yup";
import { SchemaOf, Asserts, TypeOf } from "yup";

import { SubmitButton } from "formik-chakra-ui";

// import chakra from "chakra";

/*
 TODO: separe array field in a component
*/

const userSchema = yup.object({
  name: yup
    .string()
    .min(8, "El nombre no puede tener menos de 8 caracteres")
    .required(),
  lastName: yup.string().defined().required(),
  username: yup.string().required("The username is required"),
  // yup support nested validations
  skills: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required("La descripción es requerida"),
      })
    )
    .min(1, "You need have skills 🙄")
    .required(),
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

type SkillsFormProps = { name: string };
const SkillsForm = ({ name }: SkillsFormProps) => {
  const { values } = useFormikContext<UserRegisterForm>();

  return (
    <FieldArray
      name={name}
      render={({ remove, push, form }: FieldArrayRenderProps) => {
        return (
          <React.Fragment>
            <HStack spacing={10}>
              <Text fontWeight="bold">Typed your skills</Text>
              <Button
                variant="solid"
                onClick={() => push({ name: "", description: "" })}
              >
                add
              </Button>
            </HStack>
            <Box
              overflowY={"scroll"}
              my={2}
              p={2}
              maxHeight="350px"
              borderRadius="10px"
            >
              <AnimatePresence>
                {getIn(values, name) &&
                  (getIn(values, name) as any[]).map((item, idx) => (
                    <Box key={idx} shadow="xl" p={2} bg="white">
                      <Text fontWeight="semibold">Skill {idx + 1}:</Text>
                      <HStack>
                        <Box minWidth="350px">
                          <MyCustomField
                            value={item.name}
                            name={`${name}.${idx}.name`}
                            label="Nombre"
                          />
                          <Field name={`${name}.${idx}.description`}>
                            {({
                              form,
                              meta,
                              field,
                            }: FieldProps<string, UserRegisterForm>) => (
                              <FormControl
                                isInvalid={!!(meta.touched && meta.error)}
                              >
                                <FormLabel>Description</FormLabel>
                                <Textarea {...field} />
                                <FormErrorMessage>
                                  {meta.error}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                        <Box>
                          <Button colorScheme="red" onClick={() => remove(idx)}>
                            x
                          </Button>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
              </AnimatePresence>
            </Box>
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
        validationSchema={userSchema}
        initialValues={
          {
            username: "",
            lastName: "",
            name: "",
            skills: [
              {
                name: "test",
                description: "Hello",
              },
            ],
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
          // await sleeep(3000);

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
              Hello developer, fill this form 🙂
            </Text>
            <MyCustomField name="username" label="Usuario" />
            <MyCustomField name="name" label="Name" />
            <MyCustomField name="lastName" label="Last Name" />
            <SkillsForm name="skills" />
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
