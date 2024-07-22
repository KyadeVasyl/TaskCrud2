// Grid component
import styled from "styled-components";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns || "unset"};
  grid-template-rows: ${({ $rows }) => $rows || "unset"};
  gap: ${({ $gap }) => $gap || "8px"};
  width: 100%;
`;

const Grid = ({ columns, rows, gap, ...rest }) => {
  return <StyledGrid $gap={gap} $columns={columns} $rows={rows} {...rest} />;
};

export default Grid;