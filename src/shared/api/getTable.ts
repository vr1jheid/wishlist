import { SHEET_ID } from "app/const/google.ts";

export const getTable = async (list: string) => {
  console.log("fetching", list);
  // @ts-ignore
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${list}!A1:F`,
  });
  console.log(response);
  return response.result.values as string[][];
};
