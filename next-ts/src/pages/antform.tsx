import React from "react";
import { Formik, FormikHelpers, Form as FormFormik } from "formik";
import { Form, Input, FormItem } from "formik-antd";
import { Button, Form as FormAnt, Row } from "antd";
import { SubmitButton } from "formik-antd";

import { MixedLocale } from "../models/yup.errors";
import * as yup from "yup";
// helper
// import type { Asserts } from "yup";
import { SchemaOf, setLocale } from "yup";

setLocale({
  mixed: {
    required: "El campo ${path} es requerido",
  } as MixedLocale,
});

// first aproach
// const schema = yup.object({
//   name: yup.string().required(),
//   lastName: yup.ref("name"),
//   email: yup.string().email().required(),
// });

// interface FormPerson extends Asserts<typeof schema> {}

// second aproach
interface FormPerson {
  name: string;
  lastName: string;
  email: string;
}
const schema: SchemaOf<FormPerson> = yup
  .object({
    name: yup.string().required().defined(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  })
  .defined();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function formik() {
  const initialValues: FormPerson = {
    name: "Elmer Joselo",
    lastName: "Leon Barboza",
    email: "usatloqueando@gmail.com",
  };
  const onSubmit = async (
    values: FormPerson,
    {
      resetForm,
      setErrors,
      setFieldError,
      setFormikState,
    }: FormikHelpers<FormPerson>
  ) => {
    await sleep(2000);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ isSubmitting }) => (
        <Form
          wrapperCol={{ span: 8 }}
          style={{ marginTop: "3rem" }}
          labelCol={{ span: 8 }}
        >
          <h1 style={{ textAlign: "center" }}>Hello form</h1>
          <FormItem name="name" label="Name">
            <Input name="name" placeholder="firstName"></Input>
          </FormItem>
          <FormItem name="lastName" label="Last Name">
            <Input name="lastName" placeholder="Last Name"></Input>
          </FormItem>
          <FormItem name="email" label="Email">
            <Input name="email" placeholder="example@gmail.com"></Input>
          </FormItem>
          <Row align="middle" justify="center">
            <SubmitButton>Send</SubmitButton>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default formik;
