import styled from "styled-components";

interface BoxProps {
  color?: string;
  background?: string;
  [key: string]: any;
}

const StyledBox = styled.div<{ $color?: string; $background?: string }>`
  background-color: ${({ $background }) => $background || "white"};
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  color: ${({ $color }) => $color || "black"};
`;

const Box: React.FC<BoxProps> = ({ color, background, ...rest }) => {
  return <StyledBox $color={color} $background={background} {...rest} />;
};

export default Box;
