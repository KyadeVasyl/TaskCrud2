import Flex from "../../common/flex";
import Title from "../../common/title";
import Box from "../../common/box";
import Grid from "../../common/grid";
import { Form } from "../../common/form";

import Button from "../../common/button";
import { useTranslation } from "react-i18next";
import Loading from "../../common/loading";
import {
  PRODUCT_DATA_INTER,
  PRODUCT_DATA_ENUM,
  ComponentInter,
} from "./constant";
import { Field } from "../../common/field";

const Component: React.FC<ComponentInter> = ({
  formik,
  isFieldError,
  getFieldError,
  getFieldValue,
  isSubmitDisabled,
  isSuccess,
  isLoading,
  isError,
  error,
  deleteProduct,
  updateProduct,
  data,
}) => {
  const { t } = useTranslation("product-update");

  return (
    <Form>
      <Flex $direction="column" $gap="36px">
        <Title $weight="600" $color="blue" $size={"36px"}>
          {t("TITLE")}
        </Title>
        <Box>
          <Flex $direction="column" $gap="26px">
            <Title $weight="normal" $size="24px">
              {t("INFO")}
            </Title>
            {isLoading && <Loading />}
            {isError && (
              <div>
                {t("ERROR_LOADING")} {error.message}
              </div>
            )}

            {isSuccess && data && (
              <Grid>
                <Grid rows="auto auto" columns="1fr 1fr 1fr" $gap="16px">
                  <Field
                    name={PRODUCT_DATA_ENUM.NAME}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title={PRODUCT_DATA_ENUM.NAME}
                    value={getFieldValue(PRODUCT_DATA_ENUM.NAME)}
                    error={isFieldError(PRODUCT_DATA_ENUM.NAME)}
                    errorMessage={getFieldError(PRODUCT_DATA_ENUM.NAME)}
                    type="text"
                  />
                  <Field
                    name={PRODUCT_DATA_ENUM.PRICE}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title={PRODUCT_DATA_ENUM.PRICE}
                    value={getFieldValue(PRODUCT_DATA_ENUM.PRICE)}
                    error={isFieldError(PRODUCT_DATA_ENUM.PRICE)}
                    errorMessage={getFieldError(PRODUCT_DATA_ENUM.PRICE)}
                    type="number"
                  />

                  <Field
                    name={PRODUCT_DATA_ENUM.ID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title={PRODUCT_DATA_ENUM.ID.toString()}
                    value={getFieldValue(PRODUCT_DATA_ENUM.ID)}
                    error={isFieldError(PRODUCT_DATA_ENUM.ID)}
                    errorMessage={getFieldError(PRODUCT_DATA_ENUM.ID)}
                    readOnly
                    type="number"
                  />
                </Grid>
                <Field
                  name={PRODUCT_DATA_ENUM.DESCRIPTION}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  title={PRODUCT_DATA_ENUM.DESCRIPTION}
                  value={getFieldValue(PRODUCT_DATA_ENUM.DESCRIPTION)}
                  error={isFieldError(PRODUCT_DATA_ENUM.DESCRIPTION)}
                  errorMessage={getFieldError(PRODUCT_DATA_ENUM.DESCRIPTION)}
                  type="text"
                  style={{ height: "80px" }}
                />

                <Flex
                  justify="space-between"
                  align="center"
                  direction="row"
                  gap="12px"
                >
                  <Button
                    onClick={() =>
                      updateProduct(formik.values as PRODUCT_DATA_INTER)
                    }
                    disabled={isSubmitDisabled()}
                    type="button"
                  >
                    {t("BUTTON.UPDATE")}
                  </Button>
                  <Button
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteProduct()}
                    type="button"
                  >
                    {t("BUTTON.DELETE")}
                  </Button>
                </Flex>
              </Grid>
            )}
          </Flex>
        </Box>
      </Flex>
    </Form>
  );
};
export default Component;
