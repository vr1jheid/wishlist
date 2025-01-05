import {
  action,
  atom,
  reatomAsync,
  reatomResource,
  withCache,
  withDataAtom,
  withStatusesAtom,
} from "@reatom/framework";
import { getColumns } from "widgets/Wishlist/utils/getColumns.tsx";
import { normalizeTableData } from "widgets/Wishlist/utils/normalizeTableData.ts";
import { api, CreateRowOptions } from "shared/api";
import { UnwrapPromise } from "shared/utils/unwrapPromise.ts";

type Sheet = UnwrapPromise<ReturnType<typeof api.getSheets>>[0];

export const tableModel = () => {
  const selectedSheetAtom = atom<Sheet>(
    { id: 0, title: "" },
    "selectedSheetAtom",
  );

  const sheetNames = reatomResource(
    async (ctx) => ctx.schedule(async () => await api.getSheets()),
    "sheetNames",
  ).pipe(withDataAtom([]), withStatusesAtom());

  sheetNames.onFulfill.onCall((ctx, payload) => {
    selectedSheetAtom(ctx, payload[0]);
  });

  const selectSheet = action((ctx, sheetName: string) => {
    const sheet = ctx
      .get(sheetNames.dataAtom)
      .find((s) => s.title === sheetName);
    if (!sheet) throw new Error("Sheet name was not found");
    console.log(sheet);
    selectedSheetAtom(ctx, sheet);
  });

  const tableData = reatomResource(async (ctx) => {
    const selectedSheet = ctx.spy(selectedSheetAtom);
    return ctx.schedule(async () => {
      console.log(selectSheet);
      if (!selectedSheet) return;
      return await api.getTable(selectedSheet.title);
    });
  }).pipe(withDataAtom(), withStatusesAtom(), withCache());

  const columns = atom((ctx) => {
    const table = ctx.spy(tableData.dataAtom);
    if (!table) return [];
    return getColumns(table[0]);
  });

  const normalizedData = atom((ctx) => {
    const table = ctx.spy(tableData.dataAtom);
    if (!table) return [];
    return normalizeTableData(table);
  });

  const createRowAction = reatomAsync(async (_, options: CreateRowOptions) => {
    return await api.createRow({ ...options, row: options.row + 2 });
  });
  createRowAction.onFulfill.onCall(tableData.cacheAtom.invalidate);

  const deleteRow = reatomAsync(async (ctx, index: number) => {
    const selectedSheet = ctx.get(selectedSheetAtom);
    if (!selectedSheet) {
      console.error("Selected sheet undefined", selectedSheet);
      return;
    }
    return await api.deleteRow(selectedSheet.id, index + 2);
  });

  deleteRow.onFulfill.onCall(tableData.cacheAtom.invalidate);

  const isLoadingAtom = atom((ctx) => {
    return (
      ctx.spy(sheetNames.statusesAtom).isPending ||
      ctx.spy(tableData.statusesAtom).isPending ||
      ctx.spy(deleteRow.pendingAtom) > 0
    );
  }, "isLoadingAtom");

  return {
    sheetNames,
    data: normalizedData,
    selectedSheetAtom,
    selectSheet,
    columns,
    isLoadingAtom,
    createRowAction,
    deleteRow,
  };
};
