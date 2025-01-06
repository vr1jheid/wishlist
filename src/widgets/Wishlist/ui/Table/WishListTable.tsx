import {
  MantineReactTable,
  MRT_Row,
  useMantineReactTable,
} from "mantine-react-table";
import {
  ActionIcon,
  Button,
  Flex,
  LoadingOverlay,
  Select,
  Text,
} from "@mantine/core";
import { CreateRowCustomModal } from "../Modals";
import { reatomComponent } from "@reatom/npm-react";
import { tableModel } from "widgets/Wishlist/model";
import { useMemo } from "react";
import {
  IconEdit,
  IconSquareRoundedPlusFilled,
  IconTrash,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { WishListTableRow } from "widgets/Wishlist/model/Table.types.ts";

// interface WishlistTableProps {
//   columns: MRT_ColumnDef<WishListTableRow>[];
//   data: WishListTableRow[];
//   isLoading: boolean;
// }

const openDeleteConfirmModal = (
  row: MRT_Row<WishListTableRow>,
  onConfirm: (index: number) => void,
) =>
  modals.openConfirmModal({
    title: "Удаление строки",
    children: <Text>Вы точно хотите удалить {row.original.name}?</Text>,
    labels: { confirm: "Удалить", cancel: "Отмена" },
    confirmProps: { color: "red" },
    onConfirm: () => onConfirm(row.index),
  });

export const WishlistTable = reatomComponent(({ ctx }) => {
  const model = useMemo(() => tableModel(), []);
  const data = ctx.spy(model.data);
  const columns = ctx.spy(model.columnsAtom);
  const sheets = ctx.spy(model.sheets.dataAtom);
  const selectedSheet = ctx.spy(model.selectedSheetAtom);
  const setSheet = ctx.bind(model.selectSheet);
  const isLoading = ctx.spy(model.isLoadingAtom);
  const createRow = ctx.bind(model.fabric.createRowAction);
  const deleteRow = ctx.bind(model.fabric.deleteRow);

  const table = useMantineReactTable({
    columns,
    data,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    mantinePaperProps: {
      style: {
        minWidth: "100%",
        minHeight: "100%",
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Flex gap="md">
        <Button
          color="gray"
          variant="outline"
          onClick={() => table.setCreatingRow(true)}
        >
          <IconSquareRoundedPlusFilled />
        </Button>
        <Select
          onChange={(value) => value && setSheet(value)}
          value={selectedSheet.title}
          data={sheets.map((s) => s.title)}
        />
      </Flex>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <ActionIcon onClick={() => table.setEditingRow(row)}>
          <IconEdit />
        </ActionIcon>

        <ActionIcon
          color="red"
          onClick={() => {
            openDeleteConfirmModal(row, deleteRow);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Flex>
    ),
    renderCreateRowModalContent: (e) => (
      <CreateRowCustomModal
        pendingAtom={model.fabric.createRowAction.pendingAtom}
        {...e}
      />
    ),
    onCreatingRowSave: async ({ values, exitCreatingMode, row, table }) => {
      console.log(values);
      console.log(model.createFieldValues.links);
      const data = {
        ...values,
        links: ctx.get(model.createFieldValues.links),
      };
      // await createRow({
      //   data: Object.values({
      //     ...values,
      //     links: ctx.get(model.createFieldValues.links),
      //   }),
      //   row: data.length,
      //   list: selectedSheet.title,
      // });
      exitCreatingMode();
    },
  });

  // console.log(data);

  return (
    <div className="w-full h-full min-h-fit min-w-fit">
      <LoadingOverlay visible={isLoading} />
      <MantineReactTable table={table} />
    </div>
  );
});
