import { Formik, Form } from "formik";
import Button from "../button";
import InputField from "../input-field";
import { createValidationSchema } from "../validation";
import Grid from "../grid";
import Flex from "../flex";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const FormContainer = styled(Form)`
 display: flex;
 flex-direction: column;
gap: 12px;
`;

export default function FormBasic({ validationMessages, initialValues, handleCreate, handleUpdate, handleDelete, fields, updBtn, deleteBtn, createBtn, gridConfig, fullWidthIndices = [] }) {

    const { t } = useTranslation();

    const validationSchema = createValidationSchema(fields, validationMessages);
    const handleSubmit = (values, actions) => {
        if (handleCreate) {
            handleCreate(values, actions)
        } else if (handleUpdate) {
            handleUpdate(values, actions)

        }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <FormContainer>
                    <Grid {...gridConfig} $gap="16px">
                        {fields.map((field, index) => (
                            <div
                                key={field.name}
                                style={{
                                    gridColumn: fullWidthIndices.includes(index) ? '1 / -1' : 'auto',

                                }}
                            >
                                <InputField
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    readOnly={field.name === 'id'}

                                />
                            </div>
                        ))}
                    </Grid>
                    <Flex $align="center" $justify="space-between">
                        {updBtn && (
                            <Button style={{ width: 'max-content' }} type="submit" $background="blue">
                                {t("buttonUpdate")}
                            </Button>
                        )}
                        {deleteBtn && (
                            <Button onClick={() => handleDelete(initialValues, { resetForm: () => { } })} style={{ width: 'max-content' }} type="button" $background="red">
                                {t("buttonDelete")}
                            </Button>
                        )}
                    </Flex>
                    {createBtn && (
                        <Button $background="blue" type="submit">
                            {t("buttonCreate")}
                        </Button>
                    )}
                </FormContainer>
            )}
        </Formik>
    );
}
