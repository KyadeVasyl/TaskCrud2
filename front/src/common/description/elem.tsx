import styled from "styled-components";

interface DescriptionProps {
  color?: string;

  size?: string;

  [key: string]: any;
}

const StyledDescription = styled.p<{
  $color?: string;
  $size?: string;
}>`
  font-size: ${({ $size }) => $size || "12px"};
  color: ${({ $color }) => $color || "black"};
`;

const Description: React.FC<DescriptionProps> = ({ color, size, ...rest }) => {
  return <StyledDescription $color={color} $size={size} {...rest} />;
};

export default Description;
