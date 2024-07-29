import Flex from "../../common/flex";
import Title from "../../common/title";
import Box from "../../common/box";
import Grid from "../../common/grid";
import Description from "../../common/description";
import Button from "../../common/button";
import { useTranslation } from "react-i18next";
import Loading from "../../common/loading";
import { ComponentInter } from "./constant";
const Component: React.FC<ComponentInter> = ({
  isSuccess,
  isLoading,
  isError,
  handleEdit,
  data,
}) => {
  const { t } = useTranslation("product-list");

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{t("ERROR")}</div>;
  }
  if (isSuccess && data) {
    return (
      <Flex gap={"36px"} direction={"column"}>
        <Title weight="600" color="blue" size="36px">
          {t("TITLE")}
        </Title>
        <Grid rows={"auto auto"} columns={"1fr 1fr 1fr"} $gap="36px">
          {data.map((product: any) => (
            <Box key={product.id} style={{ padding: "16px" }}>
              <Flex align="none" gap="16px" direction="column">
                <Title size="24px">{product.name}</Title>
                <Description size="16px">{product.description}</Description>
                <span style={{ color: "grey", fontSize: "14px" }}>
                  ID: {product.id}
                </span>
                <Flex gap={"12px"} align="center" justify="space-between">
                  <span
                    style={{
                      color: "black",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.price}$
                  </span>
                  <Button
                    onClick={() => handleEdit(product.id)}
                    style={{ width: "auto" }}
                    size="16px"
                    weight="500"
                    $linkLike
                  >
                    {t("BUTTON")}
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Flex>
    );
  }

  return <div>{t("NO_PRODUCTS")}</div>;
};
export default Component;
