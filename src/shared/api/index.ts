import { createRow, CreateRowOptions } from "./createRow";
import { getTable } from "./getTable.ts";
import { initGis } from "./iniGis.ts";
import { initGapi } from "./initGapi.ts";
import { loginWithGoogle } from "./loginWithGoogle.ts";
import { getSheets } from "./getSheets.ts";
import { deleteRow } from "./deleteRow.ts";

export const api = {
  createRow,
  getTable,
  initGis,
  initGapi,
  loginWithGoogle,
  getSheets,
  deleteRow,
};

export type { CreateRowOptions };
