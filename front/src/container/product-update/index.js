import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Title from "../../component/title";
import Box from "../../component/box";
import Flex from "../../component/flex";
import FormBasic from "../../component/form";
import { useTranslation } from "react-i18next";


export default function ProductUpdate() {
    const { t } = useTranslation();

    const queryClient = useQueryClient();
    const { id } = useParams();

    const navigate = useNavigate();
    const validationMessages = {
        required: t("RequiredField"),
        minText: t("NotEnoughText"),
        maxText: t("TooMuchText"),
        positiveNumber: t("PositiveNumber"),
    };

    const fields = [
        { name: "name", label: t("ProductName"), type: 'text' },
        { name: "price", label: t("ProductPrice"), type: 'number' },
        { name: "id", label: "ID", type: 'number' },
        { name: "description", label: t("ProductDescription"), type: 'text' },
    ];

    const [initialValues, setInitialValues] = useState({
        name: '',
        price: '',
        description: '',
        id: '',
    });

    const [product, setProduct] = useState(null);

    const { data, isLoading, isError, error } = useQuery({

        queryKey: ['product', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:4000/product-update/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                const errorData = await response.json()
                throw new Error(errorData || 'Упс щось запит провалився');
            }
            return response.json();
        },
        onSuccess: (data) => {
            if (data) {
                setInitialValues({
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    id: data.id,
                });
                setProduct(data);
            } else {

                navigate('/product-list');
            }
        }
    });



    useEffect(() => {
        if (data) {
            setInitialValues({
                name: data.name,
                price: data.price,
                description: data.description,
                id: data.id,
            });
            setProduct(data);
        }
    }, [data]);

    const updProductMutation = useMutation({
        mutationFn: async (product) => {
            const response = await fetch(`http://localhost:4000/product-update/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData || 'Упс щось запит провалився');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            queryClient.invalidateQueries(['product', id]);
            navigate('/product-list');
        },
        onError: (error) => {
            navigate('/alert', {
                state: {
                    status: "error",
                    message: error.message
                }
            });
        }
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (productId) => {
            const response = await fetch(`http://localhost:4000/product-update/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData || 'Упс щось запит провалився');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            navigate('/product-list');
        },
        onError: (error) => {
            navigate('/alert', {
                state: {
                    status: "error",
                    message: error.message
                }
            });
        }
    });



    const handleUpdate = (product, { resetForm }) => {
        console.log('Оновлення продукту з айді:', product.id);

        updProductMutation.mutate(product, {

            onSuccess: () => {
                console.log('Продукт успішно оновлено');

                resetForm();
            },
        });
    };

    const handleDelete = (product, { resetForm }) => {
        console.log('Видалення продукту з айді:', product.id);
        deleteProductMutation.mutate(id, {
            onSuccess: () => {
                console.log('Продукт успішно видалено');

                queryClient.removeQueries(['product', id]);
                queryClient.invalidateQueries(['products']);

                resetForm();

            },
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    if (!product) return <div>No product found</div>;

    return (
        <Flex $direction="column" $gap="36px">
            <Title $weight="600" $color="blue" $size={"36px"}>
                {t('ProductUpdateTitle')}
            </Title>
            <Box>
                <Flex $direction="column" $gap="26px">
                    <Title $weight="normal" $size="24px">
                        {t('ProductInfoTitle')}
                    </Title>
                    <FormBasic
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        fields={fields}
                        initialValues={initialValues}
                        deleteBtn={true}
                        updBtn={true}
                        gridConfig={{
                            columns: "repeat(3, 1fr)",
                            rows: "auto auto",
                        }}
                        fullWidthIndices={[3]}
                        validationMessages={validationMessages}
                    />
                </Flex>
            </Box>
        </Flex>
    );
}
