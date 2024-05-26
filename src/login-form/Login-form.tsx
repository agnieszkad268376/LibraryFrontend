import "./Login-form.css";
import { Button, TextField } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Formik, Field, Form, useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      console.log(values);
      navigate("/HomePage");
    },
    [],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
      }),
    [],
  );

  return (
    <div className="page">
      <div className="top-bar">
        <p className="top-bar-text">Library</p>
      </div>
      <div className="white-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validation={validationSchema}
        >
          {(formik: any) => (
            <form
              className="LoginForm"
              id="LoginForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                id="username"
                label="Username"
                variant="standard"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                variant="contained"
                type="submit"
                form="LoginForm"
                disabled={
                  !formik.isValid //||
                  // !formik.touched.password ||
                  // formik.touched.username
                }
              >
                Log in
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
