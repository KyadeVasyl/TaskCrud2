import styled from "styled-components";
import WithDollarPrefix from "../dollarPrefix";


const StyledFlex = styled.div`
display: flex;
flex-direction: ${({ $direction }) => $direction || "unset"};
justify-content: ${({ $justify }) => $justify || "unset"};
align-items: ${({ $align }) => $align || "unset"};
gap: ${({ $gap }) => $gap || "unset"};


`


const Flex = ({ direction, justify, align, gap, ...rest }) => {

    return <StyledFlex {...WithDollarPrefix({ direction, justify, align, gap })} {...rest} />
}


export default Flex;