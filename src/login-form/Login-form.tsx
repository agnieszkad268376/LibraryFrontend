import "./Login-form.css";
import { Button, TextField } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Formik, Field, Form, useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiProvider";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

function LoginForm() {
  const initialValues = { userName: "", password: "" };
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (values: { userName: string; password: string }, formik: any) => {
      console.log("Submitting form with values: ", values);
      apiClient.login(values).then((response) => {
        console.log("Response from login: ", response);
        if (response.success && response.data) {
          const role = response.data.role;
          switch (role) {
            case "ROLE_LIBRARIAN":
              navigate("/HomePage");
              break;
            case "ROLE_READER":
              navigate("/UserHome");
              break;
          }
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
        <LanguageSwitcher />
        <p className="top-bar-text">{t("library")}</p>
      </div>
      <div className="white-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form
              className="LoginForm"
              id="LoginForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                id="userName"
                label={t("username")}
                variant="standard"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && !!formik.errors.userName}
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <TextField
                id="password"
                label={t("password")}
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
                disabled={!formik.isValid}
              >
                {t("logIn")}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
