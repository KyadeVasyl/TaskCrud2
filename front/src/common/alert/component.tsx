import Box from "../../common/box";
import Title from "../../common/title";
import Button from "../../common/button";
import Description from "../../common/description";
import Flex from "../../common/flex";
import { useTranslation } from "react-i18next";
import { ComponentInter } from "./constant";

const Component: React.FC<ComponentInter> = ({
  state,
  message,
  handleBack,
}) => {
  const { t } = useTranslation("alert");
  return (
    <Box style={{ padding: "20px" }}>
      <Flex $gap="50px" $justify="center" $align="center">
        <Flex $gap="16px" $direction="column">
          <Title>{state.message}</Title>
          <Description $color="grey">{message}</Description>
        </Flex>

        <Flex style={{ gap: "none" }}>
          <Button onClick={handleBack} $background="blue">
            {t("BUTTON")}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Component;
