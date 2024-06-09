import "./Login-form.css";
import { Button, TextField } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Formik, Field, Form, useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiProvider";

function LoginForm() {
  const initialValues = { userName: "", password: "" };
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { userName: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate("/HomePage");
        } else {
          formik.setFieldError("password", "Invalid Username or password");
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        userName: yup.string().required("Username is required"),
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
                id="userName"
                label="Username"
                variant="standard"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && !!formik.errors.userName}
                helperText={formik.touched.userName && formik.errors.userName}
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
