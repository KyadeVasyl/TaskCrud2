
import * as Yup from 'yup';

const getFieldValidation = (type, messages) => {
    const defaultMessages = {
        required: 'Required field',
        minText: 'Type more text',
        maxText: 'Too much text',
        positiveNumber: 'Type correct number'
    };

    const validationMessages = {
        ...defaultMessages,
        ...messages
    };

    switch (type) {
        case 'text':
            return Yup.string()
                .required(validationMessages.required)
                .min(3, validationMessages.minText)
                .max(50, validationMessages.maxText);
        case 'number':
            return Yup.number()
                .required(validationMessages.required)
                .positive(validationMessages.positiveNumber);
        default:
            return Yup.string().required(validationMessages.required);
    }
}

export const createValidationSchema = (fields, messages) => {
    const shape = {};

    fields.forEach(field => {
        shape[field.name] = getFieldValidation(field.type, messages)
    });

    return Yup.object().shape(shape)

}