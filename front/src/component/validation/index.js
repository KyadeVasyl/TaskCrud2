
import * as Yup from 'yup';

const getFieldValidation = (type) => {


    switch (type) {

        case 'text':
            return Yup.string()
                .required('Це поле є обовязковим')
                .min(3, 'Замало тексту')
                .max(50, 'Забагато тексту')
        case 'number':
            return Yup.number()
                .required('Це поле є обовязковим')
                .positive('Введіть коректні дані');

        default:
            return Yup.string().required('Це поле є обовязковим');
    }
}

export const createValidationSchema = (fields) => {
    const shape = {};

    fields.forEach(field => {
        shape[field.name] = getFieldValidation(field.type)
    });

    return Yup.object().shape(shape)

}