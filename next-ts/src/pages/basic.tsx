import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";

interface FormPerson {
  name: string;
  lastName: string;
  email: string;
}

function formik() {
  const initialValues: FormPerson = {
    name: "Elmer Joselo",
    lastName: "Leon Barboza",
    email: "usatloqueando@gmail.com",
  };
  const onSubmit = (
    values: FormPerson,
    {
      resetForm,
      setErrors,
      setFieldError,
      setFormikState,
    }: FormikHelpers<FormPerson>
  ) => {
    console.log("values");
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="name" placeholder="First Name" />
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" placeholder="Last Name" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default formik;
