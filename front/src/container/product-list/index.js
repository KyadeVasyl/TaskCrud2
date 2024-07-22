import Title from "../../component/title";
import "./index.css";
import Box from "../../component/box";
import Flex from "../../component/flex";
import Description from "../../component/description";
import Button from "../../component/button";
import { useProducts } from "../../component/useProduct";
import Grid from "../../component/grid";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const navigate = useNavigate();
    const { data, isError, isLoading, isSuccess } = useProducts();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading products...</div>
    }

    const handleEdit = (id) => {
        navigate(`/product-update/${id}`);
    }

    if (isSuccess && data) {
        return (
            <Flex gap={"36px"} direction={"column"}>
                <Title weight="600" color="blue" size="36px">
                    Список товарів
                </Title>
                <Grid rows={"auto auto"} columns={"1fr 1fr 1fr"} $gap="36px">
                    {data.map((product) => (
                        <Box key={product.id} style={{ padding: '16px' }}>
                            <Flex align="none" gap="16px" direction="column">
                                <Title size="24px">{product.name}</Title>
                                <Description size="16px">{product.description}</Description>
                                <span style={{ color: 'grey', fontSize: '14px' }}>ID: {product.id}</span>
                                <Flex gap={"12px"} align="center" justify="space-between">
                                    <span style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>{product.price}$</span>
                                    <Button onClick={() => handleEdit(product.id)} style={{ width: 'auto' }} size="16px" weight="500" $linkLike>Редагувати</Button>
                                </Flex>
                            </Flex>
                        </Box>
                    ))}
                </Grid>
            </Flex>
        );
    }

    return <div>Товарів нема</div>;
}
