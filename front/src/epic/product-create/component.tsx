import React from "react";
import { FORM_VALUE_ENUM } from "./constant";
import Button from "../../common/button";
import Grid from "../../common/grid";
import Title from "../../common/title";
import Box from "../../common/box";
import { FormikValues } from "formik";
import { Form } from "../../common/form";
import { useTranslation } from "react-i18next";
import { Field } from "../../common/field";

const Component: React.FC<{
  formik: FormikValues;
  isFieldError: Function;
  getFieldError: Function;
  isSubmitDisabled: () => boolean;
  getFieldValue: Function;
}> = ({
  formik,
  isFieldError,
  getFieldError,
  getFieldValue,
  isSubmitDisabled,
}) => {
  const { t } = useTranslation("product-create");
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid $gap="36px">
        <Title $weight="600" $color="blue" $size="36px">
          {t("PRODUCT_CREATE.TITLE")}
        </Title>
        <Box>
          <Grid>
            <Grid rows="auto auto" columns="1fr 1fr" $gap="16px">
              <Field
                name={FORM_VALUE_ENUM.NAME}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                title={FORM_VALUE_ENUM.NAME}
                value={getFieldValue(FORM_VALUE_ENUM.NAME)}
                error={isFieldError(FORM_VALUE_ENUM.NAME)}
                errorMessage={getFieldError(FORM_VALUE_ENUM.NAME)}
                type="text"
              />
              <Field
                name={FORM_VALUE_ENUM.PRICE}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                title={FORM_VALUE_ENUM.PRICE}
                value={getFieldValue(FORM_VALUE_ENUM.PRICE)}
                error={isFieldError(FORM_VALUE_ENUM.PRICE)}
                errorMessage={getFieldError(FORM_VALUE_ENUM.PRICE)}
                type="number"
              />
            </Grid>
            <Field
              name={FORM_VALUE_ENUM.DESCRIPTION}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              title={FORM_VALUE_ENUM.DESCRIPTION}
              value={getFieldValue(FORM_VALUE_ENUM.DESCRIPTION)}
              error={isFieldError(FORM_VALUE_ENUM.DESCRIPTION)}
              errorMessage={getFieldError(FORM_VALUE_ENUM.DESCRIPTION)}
              type="text"
              style={{ height: "80px" }}
            />

            <Button disabled={isSubmitDisabled()} type="submit">
              {t("PRODUCT_CREATE.BUTTON")}
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Form>
  );
};

export default Component;
