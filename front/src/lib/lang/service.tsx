import Flex from "../../common/flex";
import Button from "../../common/button";
import { useTranslation } from "react-i18next";
import i18n from "./core";
const Switcher: React.FC = () => {
  const { i18n, t } = useTranslation("common");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Flex margin={"0px 0px 48px 0px"} gap={"12px"} justify={"flex-start"}>
      <Button
        style={{ width: "min-content" }}
        onClick={() => changeLanguage("en")}
        margin={"0 10px"}
        padding={"10px"}
        background={"#007bff"}
      >
        {t("LANGS.EN")}
      </Button>

      <Button
        style={{ width: "min-content" }}
        margin={"0 10px"}
        padding={"10px"}
        onClick={() => changeLanguage("uk")}
        background={"#007bff"}
      >
        {t("LANGS.UK")}{" "}
      </Button>
    </Flex>
  );
};

export default Switcher;
