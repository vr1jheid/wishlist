import { ReactNode } from "react";

interface CellProps {
  children?: ReactNode;
  width?: number;
}

export const Cell = ({ children, width }: CellProps) => {
  return (
    <div
      style={{
        width: width ? `${width}px` : "fit-content", // Установить фиксированную ширину
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {children}
    </div>
  );
};
