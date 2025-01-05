import { getColumns } from "./getColumns.tsx";
import { ColumnsKeys } from "../model/Table.types.ts";

export const normalizeTableData = (arr: string[][]) => {
  const [columnsArr, ...table] = arr;
  const columns = getColumns(columnsArr);
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
