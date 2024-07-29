import React from "react";
import styled from "styled-components";
import WithDollarPrefix from "../../lib/util/prefix-dollar";

interface LabelProps {
  size?: string;
  [key: string]: any;
}

const StyledLabel = styled.label<{
  $size?: string;
}>`
  display: block;
  font-size: ${({ $size }) => $size || "16px"};
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  cursor: pointer;

  transition: color 0.3s ease;

  &:hover {
    color: #ff7e5f;
  }

  &:focus-within {
    color: #feb47b;
  }
`;

const Label: React.FC<LabelProps> = ({ size, ...rest }) => {
  return <StyledLabel {...WithDollarPrefix({ size })} {...rest} />;
};

export default Label;
