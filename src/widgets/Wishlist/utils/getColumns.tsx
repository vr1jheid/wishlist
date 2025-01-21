import { getAccessorKey } from "./getAccessorKey.ts";
import { MRT_ColumnDef } from "mantine-react-table";
import { WishListTableRow } from "../model/Table.types.ts";

type Options = Partial<
  Record<
    keyof WishListTableRow,
    Omit<MRT_ColumnDef<WishListTableRow>, "accessorKey" | "header">
  >
>;

export const getColumns = (arr: string[], options: Options) => {
  const optionsKeys = Object.keys(options);
  return arr.map<MRT_ColumnDef<WishListTableRow>>((colName, i) => {
    const accessorKey = getAccessorKey(i);
    const basic: MRT_ColumnDef<WishListTableRow> = {
      header: colName,
      accessorKey,
    };

    if (optionsKeys.includes(accessorKey)) {
      return {
        ...basic,
        ...options[accessorKey],
        // Cell: ({ cell }: { cell: MRT_Cell<WishListTableRow> }) => (
        //   <Cell width={200}>{cell.getValue<string>()}</Cell>
        // ),
        // Edit: LinksField,
      };
    }
    return basic;
  });
};
