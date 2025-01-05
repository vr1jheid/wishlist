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
  Tooltip,
} from "@mantine/core";
import { CreateRowCustomModal } from "../Modals/CreateRowCustomModal.tsx";
import { reatomComponent } from "@reatom/npm-react";
import { tableModel } from "widgets/Wishlist/model";
import { useMemo } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
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
  const columns = ctx.spy(model.columns);
  const sheets = ctx.spy(model.sheetNames.dataAtom);
  const selectedSheet = ctx.spy(model.selectedSheetAtom);
  const setSheet = ctx.bind(model.selectSheet);
  const isLoading = ctx.spy(model.isLoadingAtom);
  const createRow = ctx.bind(model.createRowAction);
  const deleteRow = ctx.bind(model.deleteRow);

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
      <>
        <Select
          onChange={(value) => value && setSheet(value)}
          value={selectedSheet.title}
          data={sheets.map((s) => s.title)}
        />

        <Button onClick={() => table.setCreatingRow(true)}>Добавить</Button>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Изменить">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Удалить">
          <ActionIcon
            color="red"
            onClick={() => {
              openDeleteConfirmModal(row, deleteRow);
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderCreateRowModalContent: (e) => (
      <CreateRowCustomModal
        pendingAtom={model.createRowAction.pendingAtom}
        {...e}
      />
    ),
    onCreatingRowSave: async ({ values, exitCreatingMode }) => {
      await createRow({
        data: Object.values(values),
        row: data.length,
        list: selectedSheet.title,
      });
      exitCreatingMode();
    },
  });

  return (
    <div className="w-full h-full min-h-fit min-w-fit">
      <LoadingOverlay visible={isLoading} />
      <MantineReactTable table={table} />
    </div>
  );
});
