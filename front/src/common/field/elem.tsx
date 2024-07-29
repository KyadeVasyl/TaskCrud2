import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import Grid from "../grid";
interface FieldElemProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  title: string;
  value: string | number;
  error: boolean;
  errorMessage: string;
  type: string;
  className?: string;
  fullHeight?: string;
  style?: object;
  readOnly?: boolean;
}

const Field: React.FC<FieldElemProps> = ({
  name,
  title,
  value,
  error,
  style,
  errorMessage,
  onChange,
  onBlur,
  type,
  className,
  fullHeight,
  readOnly = false,
}) => {
  const { t } = useTranslation("field");

  return (
    <Grid>
      <label htmlFor={name}>{t(`FIELDS.${title.toUpperCase()}`)}</label>
      <StyledField
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        $fullHeight={fullHeight}
        $hasError={error}
        readOnly={readOnly}
        className={className}
        style={style}
      />

      {name === "description" && (
        <span style={{ color: "grey", fontSize: "12px" }}>{t("SUBTITLE")}</span>
      )}

      {error && <span style={{ color: "red" }}>{errorMessage}</span>}
    </Grid>
  );
};

const StyledField = styled.input<{
  $fullHeight?: string;
  $hasError?: boolean;
}>`
  width: 100%;
  padding: 10px 15px;
  margin: 0;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  height: ${({ $fullHeight }) => $fullHeight || "auto"};
  border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "gray")};

  &:focus {
    border-color: blue;
    border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "gray")};

    box-shadow: 0 0 5px rgba(255, 126, 95, 0.5);
    outline: none;
  }

  &:hover {
    border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "gray")};

    border-color: blue;
  }

  &:disabled,
  &[readonly] {
    background-color: #f0f0f0;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

export default Field;
