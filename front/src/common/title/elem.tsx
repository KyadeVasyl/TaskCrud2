import React from "react";
import styled from "styled-components";
import WithDollarPrefix from "../../lib/util/prefix-dollar";

interface TitleProps {
  size?: string;
  color?: string;
  weight?: string;
  [key: string]: any;
}

const StyledTitle = styled.h1<{
  $size?: string;
  $color?: string;
  $weight?: string;
}>`
  font-size: ${({ $size }) => $size || "16px"};
  color: ${({ $color }) => $color || "black"};
  font-weight: ${({ $weight }) => $weight || "bold"};
`;

const Title: React.FC<TitleProps> = ({ color, size, weight, ...rest }) => {
  return (
    <StyledTitle {...WithDollarPrefix({ color, size, weight })} {...rest} />
  );
};

export default Title;
