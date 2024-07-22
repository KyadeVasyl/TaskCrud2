import { Formik, Form } from "formik";
import Button from "../button";
import InputField from "../input-field";
import { createValidationSchema } from "../validation";
import Grid from "../grid";
import Flex from "../flex";
import styled from "styled-components";

const FormContainer = styled(Form)`
 display: flex;
 flex-direction: column;
gap: 12px;
`;

export default function FormBasic({ handleUpdate, handleDelete, initialValues, onSubmit, fields, updBtn, deleteBtn, createBtn, gridConfig, fullWidthIndices = [] }) {
    const validationSchema = createValidationSchema(fields);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                onSubmit(values, actions)
            }}
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

                                />
                            </div>
                        ))}
                    </Grid>
                    <Flex $align="center" $justify="space-between">
                        {updBtn && (
                            <Button onClick={handleUpdate} style={{ width: 'max-content' }} type="submit" $background="blue">
                                Зберегти зміни
                            </Button>
                        )}
                        {deleteBtn && (
                            <Button onClick={handleDelete} style={{ width: 'max-content' }} type="submit" $background="red">
                                Видалити товар
                            </Button>
                        )}
                    </Flex>
                    {createBtn && (
                        <Button $background="blue" type="submit">
                            Створити товар
                        </Button>
                    )}
                </FormContainer>
            )}
        </Formik>
    );
}
