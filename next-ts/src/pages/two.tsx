import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";

interface FormPerson {
  name: string;
  lastName: string;
  email: string;
}
// helper
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
    console.log("values");
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="name" placeholder="First Name" />
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" placeholder="Last Name" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default formik;
