import Title from "../../component/title";
import "./index.css";
import Box from "../../component/box";
import Grid from "../../component/grid";
import FormBasic from "../../component/form";
import { useMutation } from '@tanstack/react-query';

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const initialValues = {
    name: '',
    price: '',
    description: '',
};



export default function ProductCreate() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const validationMessages = {
        required: t("RequiredField"),
        minText: t("NotEnoughText"),
        maxText: t("TooMuchText"),
        positiveNumber: t("PositiveNumber"),
    };

    const fields = [
        { name: "name", label: t("ProductName"), type: 'text' },
        { name: "price", label: t("ProductPrice"), type: 'number' },
        { name: "description", label: t("ProductDescription"), type: 'text' },
    ];

    const { mutate } = useMutation({

        mutationKey: ["add-product"],
        mutationFn: async (newProduct) => {
            console.log("Відправка даних нового товару:", newProduct);

            const response = await fetch('http://localhost:4000/product-create', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),

            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData || 'Упс щось запит провалився');
            }

            return response.json()
        }
    })


    const handleCreate = (newProduct, { resetForm }) => {
        mutate(newProduct, {
            onSuccess: () => {
                resetForm();
                navigate('/alert', {
                    state: {
                        status: "success",
                        message: t("CreatedSuccess")
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
                {t("ProductCreateTitle")}
            </Title>
            <Box>
                <Grid $gap="26px">
                    <Title $weight="normal" $size="24px">
                        {t("ProductInfoTitle")}
                    </Title>
                    <FormBasic
                        handleCreate={handleCreate}
                        fields={fields}
                        initialValues={initialValues}
                        createBtn={true}
                        gridConfig={{
                            columns: 'repeat(2, 1fr)',
                            rows: 'auto auto',
                        }}
                        fullWidthIndices={[2]}
                        validationMessages={validationMessages}
                    />
                </Grid>
            </Box>
        </Grid>
    );
}
