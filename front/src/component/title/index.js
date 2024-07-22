import React from "react";
import styled from "styled-components";
import WithDollarPrefix from "../dollarPrefix";

const StyledTitle = styled.h1`

font-size: ${({ $size }) => $size || "16px"};
color: ${({ $color }) => $color || "black"};
font-weight: ${({ $weight }) => $weight || "bold"};

`

const Title = ({ color, size, weight, ...rest }) => {
    return <StyledTitle {...WithDollarPrefix({ color, size, weight })} {...rest} />
}

export default Title;