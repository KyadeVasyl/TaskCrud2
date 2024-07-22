import styled, { css } from "styled-components";
import WithDollarPrefix from "../dollarPrefix";

const StyledButton = styled.button`
width: 100%;
 background-color: ${({ $background }) => $background || "black"};
    border: none;
    border-radius: 10px;
    font-weight: ${({ $weight }) => $weight || "400"};
    
    color: ${({ $fontColor }) => $fontColor || "white"};
    cursor: pointer;
    font-size:  ${({ $size }) => $size || "12px"};
    padding: 12px 24px;
    transition: opacity 0.3s ease;
    
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

    ${({ $linkLike }) => $linkLike && css`
       color: ${({ $color }) => $color || 'blue'};
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
`


const Button = ({ weight, color, LinkLike, size, fontColor, background, ...rest }) => {
    return <StyledButton {...WithDollarPrefix({ weight, color, LinkLike, size, fontColor, background })} {...rest} />
}

export default Button;