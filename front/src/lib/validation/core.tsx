import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Field, validationMessages } from "./constant";

const GetFieldValidation = (
  type: string,
  messages: validationMessages = {}
) => {
  const { t } = useTranslation("validation");
  const defaultMessages = {
    required: t("REQUIRED_FIELD"),
    minText: t("SMALL_TEXT"),
    maxText: t("BIG_TEXT"),
    positiveNumber: t("POSITIVE_NUMBER"),
  };

  const validationMessages = {
    ...defaultMessages,
    ...messages,
  };

  switch (type) {
    case "text":
      return Yup.string()
        .required(validationMessages.required)
        .min(3, validationMessages.minText)
        .max(50, validationMessages.maxText);
    case "number":
      return Yup.number()
        .required(validationMessages.required)
        .positive(validationMessages.positiveNumber);
    default:
      return Yup.string().required(validationMessages.required);
  }
};

const createValidationSchema = (
  fields: Field[],
  messages: validationMessages = {}
) => {
  const shape: { [key: string]: any } = {};

  fields.forEach((field) => {
    shape[field.name] = GetFieldValidation(field.type, messages);
  });

  return Yup.object().shape(shape);
};

export default createValidationSchema;
