import { ColumnsKeys, WishListTableRow } from "../model/Table.types.ts";
import { MRT_ColumnDef } from "mantine-react-table";

export const normalizeTableData = (
  arr: string[][],
  columns: MRT_ColumnDef<WishListTableRow>[],
) => {
  const [_, ...table] = arr;
  return table.map((row) =>
    row.reduce(
      (acc, cell, index) => {
        const key = columns[index].accessorKey;
        if (!key) {
          throw new Error(`Missing accessor key in ${columns[index]}`);
        }
        if (index === 3) return { ...acc, [key]: cell.split("\n") };
        return { ...acc, [key]: cell };
      },
      {} as Record<ColumnsKeys, string>,
    ),
  );
};
