import React from "react";
import styled from "styled-components";

interface GridProps {
  columns?: string;
  rows?: string;
  gap?: string;
  [key: string]: any;
}

const StyledGrid = styled.div<{
  $columns?: string;
  $rows?: string;
  $gap?: string;
}>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns || "unset"};
  grid-template-rows: ${({ $rows }) => $rows || "unset"};
  gap: ${({ $gap }) => $gap || "8px"};
  width: 100%;
`;

const Grid: React.FC<GridProps> = ({ columns, rows, gap, ...rest }) => {
  return (
    <StyledGrid
      $gap={gap}
      $columns={columns}
      $rows={rows}
      {...rest}
    ></StyledGrid>
  );
};

export default Grid;
