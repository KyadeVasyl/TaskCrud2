import styled from "styled-components";
import WithDollarPrefix from "../../lib/util/prefix-dollar";

interface FlexProps {
  gap?: string;
  justify?: string;
  align?: string;
  margin?: string;
  direction?: string;
  [key: string]: any;
}

const StyledFlex = styled.div<{
  $gap?: string;
  $justify?: string;
  $align?: string;
  $margin?: string;
  $direction?: string;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "unset"};
  justify-content: ${({ $justify }) => $justify || "unset"};
  align-items: ${({ $align }) => $align || "unset"};
  gap: ${({ $gap }) => $gap || "unset"};
  margin: ${({ $margin }) => $margin || "unset"};
`;

const Flex: React.FC<FlexProps> = ({
  margin,
  direction,
  justify,
  align,
  gap,
  ...rest
}) => {
  return (
    <StyledFlex
      {...WithDollarPrefix({ margin, direction, justify, align, gap })}
      {...rest}
    />
  );
};

export default Flex;
