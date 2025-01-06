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
import { LinksField } from "widgets/Wishlist/ui/LinksField";

type Sheet = UnwrapPromise<ReturnType<typeof api.getSheets>>[0];

const linksModel = () => {
  const linksAtom = atom<string[]>([], "linksAtom");
  const setLink = action((ctx, index: number, value: string) => {
    linksAtom(
      ctx,
      (prev) => {
        const copy = [...prev];
        copy[index] = value;
        console.log(copy);
        return copy;
      },
      // prev.map((link, i) => (index !== i ? link : value)),
    );
  }, "setLink");
  const linksResultAtom = atom((ctx) => {
    const res = ctx.spy(linksAtom).join(" ").trim();
    console.log(res);
    return res;
  }, "linksResultAtom");
  return { links: linksResultAtom, setLink };
};

export const tableModel = () => {
  const { links, setLink } = linksModel();

  const selectedSheetAtom = atom<Sheet>(
    { id: 0, title: "" },
    "selectedSheetAtom",
  );

  const sheets = reatomResource(
    async (ctx) => ctx.schedule(async () => await api.getSheets()),
    "sheetNames",
  ).pipe(withDataAtom([]), withStatusesAtom());

  sheets.onFulfill.onCall((ctx, payload) => {
    selectedSheetAtom(ctx, payload[0]);
  });

  const selectSheet = action((ctx, sheetName: string) => {
    const sheet = ctx.get(sheets.dataAtom).find((s) => s.title === sheetName);
    if (!sheet) throw new Error("Sheet name was not found");
    console.log(sheet);
    selectedSheetAtom(ctx, sheet);
  });

  const tableData = reatomResource(async (ctx) => {
    const selectedSheet = ctx.spy(selectedSheetAtom);
    return ctx.schedule(async () => {
      if (!selectedSheet) return;
      return await api.getTable(selectedSheet.title);
    });
  }, "tableData").pipe(withDataAtom(), withStatusesAtom(), withCache());

  const columnsAtom = atom((ctx) => {
    const table = ctx.spy(tableData.dataAtom);

    if (!table) return [];
    return getColumns(table[0], {
      links: {
        Edit: (props) => (
          <LinksField
            onChange={(...params) => setLink(ctx, ...params)}
            {...props}
          />
        ),
      },
    });
  }, "columnsAtom");

  const normalizedData = atom((ctx) => {
    const table = ctx.spy(tableData.dataAtom);
    const columns = ctx.spy(columnsAtom);

    if (!table || !columns) return [];
    const result = normalizeTableData(table, columns);
    return result;
  }, "normalizedDataAtom");

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
      ctx.spy(sheets.statusesAtom).isPending ||
      ctx.spy(tableData.statusesAtom).isPending ||
      ctx.spy(deleteRow.pendingAtom) > 0
    );
  }, "isLoadingAtom");

  return {
    sheets,
    data: normalizedData,
    selectedSheetAtom,
    selectSheet,
    columnsAtom,
    isLoadingAtom,
    fabric: {
      createRowAction,
      deleteRow,
    },
    createFieldValues: {
      links,
    },
  };
};
