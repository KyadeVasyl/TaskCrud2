import Box from "../../component/box";
import Flex from "../../component/flex";
import Button from "../../component/button";
import Title from "../../component/title";
import Description from "../../component/description";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function Alert() {

    const navigate = useNavigate();
    const location = useLocation();


    const queryParams = new URLSearchParams(location.search)
    const status = queryParams.get('status')
    const message = queryParams.get('message')


    const handleBack = () => {
        navigate(-1);
    }

    const { state } = location;


    useEffect(() => {
        if (!state || !state.status || !state.message) {


            navigate('/product-create')
        }

    }, [state, navigate])

    if (!state || !state.status || !state.message) {
        return null;
    }


    return (

        <Box style={{ padding: "20px" }}>
            <Flex $gap="50px" $justify="center" $align="center">
                <Flex $gap="16px" $direction="column" >
                    <Title>{status === 'success' ? 'Успішне виконання дії' : 'Упс, щось пішло не так ):'}</Title>
                    <Description $color="grey">{message}</Description>
                </Flex>

                <Flex style={{ gap: "none" }}>
                    <Button onClick={handleBack} $background="blue">Повернутися назад</Button>

                </Flex>

            </Flex>
        </Box>


    )

}