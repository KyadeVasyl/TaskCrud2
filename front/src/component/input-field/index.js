import styled from "styled-components";
import { Field, useFormikContext } from 'formik';
import Grid from "../grid";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 0;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  height: ${({ fullHeight }) => fullHeight || 'auto'};

  &:focus {
    border-color: blue;
    box-shadow: 0 0 5px rgba(255, 126, 95, 0.5);
    outline: none;
  }

  &:hover {
    border-color: blue;
  }

  &:disabled {
    background-color: #f0f0f0;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

const InputField = ({ label, name, type = 'text', className, fullHeight }) => {
    const { touched, errors } = useFormikContext();

    return (
        <div>
            <Grid gap="8px">
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ field }) => (
                        <>
                            <StyledInput
                                className={className}
                                id={name}
                                type={type}
                                {...field}
                                fullHeight={fullHeight}
                            />
                            {field.name === 'ProductDescription' && (
                                <span style={{ color: 'grey', fontSize: "12px" }}>
                                    Відображується у картці товару
                                </span>
                            )}
                        </>
                    )}
                </Field>
                {touched[name] && errors[name] ? (
                    <div style={{ color: "red" }}>{errors[name]}</div>
                ) : null}
            </Grid>
        </div>
    );
}

export default InputField;
