import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import createProduct from "./action";
import { AxiosResponse } from "axios";
import { FORM_VALUE_INTER, FORM_VALUE_TYPE, INITIAL_VALUES } from "./constant";
import { useFormik } from "formik";
import Component from "./component";
import { useTranslation } from "react-i18next";
import { useValidationSchema } from "../../lib/validation";

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const { t: alert } = useTranslation("alert");
  const validationSchema = useValidationSchema();

  const onSuccess = () => {
    formik.resetForm();
    navigate("/alert", {
      state: {
        status: "success",
        message: alert("SUCCESS"),
      },
    });
  };

  const onError = (error: any) => {
    navigate("/alert", {
      state: {
        status: "error",
        message: error.message,
      },
    });
  };

  const action: UseMutationOptions<
    AxiosResponse<any>,
    Error,
    FORM_VALUE_INTER
  > = {
    mutationFn: createProduct,
    onSuccess,
    onError,
  };

  const {
    mutate,
  }: UseMutationResult<
    AxiosResponse<any>,
    Error,
    FORM_VALUE_INTER
  > = useMutation(action);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
    onSubmit: (values: FORM_VALUE_INTER) => {
      mutate(values);
    },
  });

  const isFieldError = (name: FORM_VALUE_TYPE): boolean => {
    return formik.errors[name] && formik.touched[name] ? true : false;
  };

  const getFieldError = (name: FORM_VALUE_TYPE): string | undefined => {
    return isFieldError(name) ? formik.errors[name] : undefined;
  };

  const isSubmitDisabled = () => {
    if (!formik.isValid || !formik.dirty) {
      return true;
    }

    return false;
  };

  const getFieldValue = (name: FORM_VALUE_TYPE): string | number | undefined =>
    formik.values[name];

  return (
    <Component
      formik={formik}
      getFieldValue={getFieldValue}
      isFieldError={isFieldError}
      getFieldError={getFieldError}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};

export default ProductCreate;
