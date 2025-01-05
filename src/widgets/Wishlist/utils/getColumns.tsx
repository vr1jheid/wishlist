import { getAccessorKey } from "./getAccessorKey.ts";
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { WishListTableRow } from "../model/Table.types.ts";
import { Cell } from "widgets/Wishlist/ui/Cell/Cell.tsx";
import { TextInput } from "@mantine/core";

export const getColumns = (arr: string[]) => {
  return arr.map<MRT_ColumnDef<WishListTableRow>>((colName, i) => {
    const accessorKey = getAccessorKey(i);
    const basic: MRT_ColumnDef<WishListTableRow> = {
      header: colName,
      accessorKey,
    };

    if (accessorKey === "links") {
      return {
        ...basic,
        Cell: ({ cell }: { cell: MRT_Cell<WishListTableRow> }) => (
          <Cell width={200}>{cell.getValue<string>()}</Cell>
        ),
        Edit: ({ row, table }) => {
          return (
            <TextInput
              placeholder="Ссылки"
              onChange={(e) => {
                table.setCreatingRow({
                  ...row,
                  _valuesCache: { ...row.original, links: e.target.value },
                });
                console.log(row);
              }}
            />
          );
        },
      };
    }
    return basic;
  });
};
