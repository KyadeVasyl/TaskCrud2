import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { FIELD_DATA_ENUM } from "./constant";
export const useValidationSchema = () => {
  const { t } = useTranslation("validation");

  return Yup.object().shape({
    [FIELD_DATA_ENUM.NAME]: Yup.string().required(t("REQUIRED_FIELD")),
    [FIELD_DATA_ENUM.PRICE]: Yup.number()
      .positive(t("POSITIVE_NUMBER"))
      .required(t("REQUIRED_FIELD")),
    [FIELD_DATA_ENUM.DESCRIPTION]: Yup.string()
      .min(3, t("SMALL_TEXT"))
      .max(50, t("BIG_TEXT"))
      .required(t("REQUIRED_FIELD")),
  });
};

export default useValidationSchema;
