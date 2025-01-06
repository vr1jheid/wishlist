import { SHEET_ID } from "app/const/google.ts";

export const getTable = async (list: string) => {
  // @ts-ignore
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${list}!A1:F`,
  });

  return response.result.values as string[][];
};
