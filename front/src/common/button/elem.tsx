import styled, { css } from "styled-components";
import WithDollarPrefix from "../../lib/util/prefix-dollar";

interface ButtonProps {
  color?: string;
  background?: string;
  weight?: string;
  fontColor?: string;
  padding?: string;
  size?: string;
  margin?: string;
  linkLike?: string;
  [key: string]: any;
}

const StyledButton = styled.button<{
  $background?: string;
  $weight?: string;
  $fontColor?: string;
  $size?: string;
  $padding?: string;
  $margin?: string;
  $linkLike?: string;
  $color?: string;
}>`
  width: 100%;
  background-color: ${({ $background }) => $background || "blue"};
  border: none;
  border-radius: 10px;
  font-weight: ${({ $weight }) => $weight || "400"};
  color: ${({ $fontColor }) => $fontColor || "white"};
  cursor: pointer;
  font-size: ${({ $size }) => $size || "12px"};
  padding: ${({ $padding }) => $padding || "12px 24px"};
  transition: opacity 0.3s ease;
  margin: ${({ $margin }) => $margin || "unset"};

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.3;
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }

  ${({ $linkLike, $color }) =>
    $linkLike &&
    css`
      color: ${$color || "blue"};
      background: none;
      border: none;
      padding: 0;

      &:hover {
        opacity: 0.7;
      }

      &:active {
        opacity: 0.3;
      }
    `}
`;

const Button: React.FC<ButtonProps> = ({
  margin,
  padding,
  weight,
  color,
  linkLike,
  size,
  fontColor,
  background,
  ...rest
}) => {
  return (
    <StyledButton
      {...WithDollarPrefix({
        margin,
        padding,
        weight,
        color,
        linkLike,
        size,
        fontColor,
        background,
      })}
      {...rest}
    />
  );
};

export default Button;
