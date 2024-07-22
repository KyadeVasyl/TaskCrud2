import styled from "styled-components";


const StyledDescription = styled.p`

font-size: ${({ $size }) => $size || "12px"};
color: ${({ $color }) => $color || "black"};

`





const Description = ({ color, size, ...rest }) => {


    return <StyledDescription $color={color} $size={size}
        {...rest} />
}


export default Description;