import Title from "../../component/title";
import "./index.css";
import Box from "../../component/box";
import Flex from "../../component/flex";
import FormBasic from "../../component/form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { error } from "console";




const fields = [
    { name: "ProductName", label: "Назва товару", type: 'text' },
    { name: "ProductPrice", label: "Ціна", type: 'number' },
    { name: "ProductId", label: "ID", type: 'number' },
    { name: "ProductDescription", label: "Опис товару", type: 'text' },
];


export default function ProductUpdate({ title }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        ProductName: '',
        ProductPrice: '',
        ProductDescription: '',
        ProductId: '',
    });
    const [product, setProduct] = useState(null);


    const { data, isSuccess } = useQuery({

        queryKey: ['product', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:4000/product-update/${id}`);



            if (!response.ok) { throw new Error("Network response was not ok") }

            return response.json();
        },
        onSuccess: (data) => {
            setInitialValues({
                ProductName: data.name,
                ProductPrice: data.price,
                ProductDescription: data.description,
                ProductId: data.id,
            })
        }

    })





    useEffect(() => {
        if (isSuccess) {
            setInitialValues({
                ProductName: data.name,
                ProductPrice: data.price,
                ProductDescription: data.description,
                ProductId: data.id,
            });
            setProduct(data);

        }
    }, [isSuccess, data]);


    const updProductMutation = useMutation({

        mutationKey: ["upd-product"],
        mutationFn: async (product) => {
            const response = await fetch(`http://localhost:4000/product-update/${product.ProductId}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),

            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                console.log('Network response was OK');
                console.log(response)
            }
            return response.json()
        }
    })

    const deleteProductMutation = useMutation({
        mutationKey: ['delete-product'],
        mutationFn: async (productId) => {
            const response = await fetch(`http://localhost:4000/product-update/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },

            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                console.log('Network response was OK');
                console.log(response)
            }
            return response.json()

        }
    })


    const handleUpdate = (updProduct, { resetForm }) => {
        updProductMutation(updProduct, {
            onSuccess: () => {
                resetForm();
                navigate('/alert', {
                    state: {
                        status: "success",
                        message: 'Товар успішно створено'
                    }
                })
            },
            onError: (error) => {
                navigate('/alert', {
                    state: {
                        status: "error",
                        message: error.message
                    }
                })

            }
        });
    };


    const handleDelete = () => {
        deleteProductMutation.mutate(id, {
            onSuccess: () => {

                navigate('/alert', {
                    state: {
                        status: "success",
                        message: 'Товар успішно видалено'
                    }
                })
            },
            onError: () => {
                navigate('/alert', {
                    state: {
                        status: "error",
                        message: error.message
                    }
                })
            }
        })
    }



    if (!product) return <div>Loading...</div>;

    return (
        <Flex $direction="column" $gap="36px">
            <Title $weight="600" $color="blue" $size={"36px"}>
                {title}
            </Title>
            <Box>
                <Flex $direction="column" $gap="26px">
                    <Title $weight="normal" $size="24px">
                        Інформація про товар
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

                    />
                </Flex>
            </Box>
        </Flex>
    );
}
