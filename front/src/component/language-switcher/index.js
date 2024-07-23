import Flex from "../flex";
import Button from "../button";
import { useTranslation } from "react-i18next";


export default function Switcher() {

    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (


        <Flex margin={"0px 0px 48px 0px"} gap={"12px"} justify={"flex-start"}>

            <Button style={{ width: "min-content" }} onClick={() => changeLanguage('en')} margin={"0 10px"}

                padding={"10px"} background={"#007bff"}>{t('En')}</Button>



            <Button style={{ width: "min-content" }}

                margin={"0 10px"} padding={"10px"}
                onClick={() => changeLanguage('uk')}
                background={"#007bff"}>{t('Uk')} </Button>


        </Flex>
    )


}