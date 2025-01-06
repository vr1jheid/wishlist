import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "mantine-react-table";
import { LoadingOverlay } from "@mantine/core";
import { reatomComponent } from "@reatom/npm-react";
import { WishListTableRow } from "../../model/Table.types.ts";
import React from "react";
import { Atom } from "@reatom/framework";

interface CreateRowCustomModalProps {
  internalEditComponents: React.ReactNode[];
  row: MRT_Row<WishListTableRow>;
  table: MRT_TableInstance<WishListTableRow>;
  pendingAtom: Atom<number>;
}

export const CreateRowCustomModal = reatomComponent<CreateRowCustomModalProps>(
  ({ ctx, internalEditComponents, table, row, pendingAtom }) => {
    const isLoading = ctx.spy(pendingAtom) > 0;

    return (
      <div className="flex flex-col gap-3">
        <LoadingOverlay visible={isLoading} />
        <div>This is customized</div>
        {internalEditComponents}
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </div>
    );
  },
);
