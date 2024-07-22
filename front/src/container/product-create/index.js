import Title from "../../component/title";
import "./index.css";
import Box from "../../component/box";
import Grid from "../../component/grid";
import FormBasic from "../../component/form";
import { useMutation } from '@tanstack/react-query';

import { useNavigate } from "react-router-dom";


const initialValues = {
    ProductName: '',
    ProductPrice: '',
    ProductDescription: '',
};

const fields = [
    { name: "ProductName", label: "Назва товару", type: 'text' },
    { name: "ProductPrice", label: "Ціна", type: 'number' },
    { name: "ProductDescription", label: "Опис товару", type: 'text' },
];





export default function ProductCreate({ title }) {
    const navigate = useNavigate();

    const { mutate } = useMutation({

        mutationKey: ["add product"],
        mutationFn: async (newProduct) => {
            const response = await fetch('http://localhost:4000/product-create', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),

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


    const handleSubmit = (newProduct, { resetForm }) => {
        mutate(newProduct, {
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

    return (
        <Grid $gap="36px">
            <Title $weight="600" $color="blue" $size="36px">
                {title}
            </Title>
            <Box>
                <Grid $gap="26px">
                    <Title $weight="normal" $size="24px">
                        Інформація про товар
                    </Title>
                    <FormBasic
                        onSubmit={handleSubmit}
                        fields={fields}
                        initialValues={initialValues}
                        createBtn={true}
                        gridConfig={{
                            columns: 'repeat(2, 1fr)',
                            rows: 'auto auto',
                        }}
                        fullWidthIndices={[2]}
                    />
                </Grid>
            </Box>
        </Grid>
    );
}
