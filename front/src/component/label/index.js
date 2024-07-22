
import styled from "styled-components";


const StyledLabel = styled.label`

 display: block;
    font-size: 16px;
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
`

const Label = (props) => {


    return <StyledLabel {...props} />
}


export default Label;