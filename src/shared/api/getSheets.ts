import { SHEET_ID } from "app/const/google.ts";

export async function getSheets() {
  // @ts-ignore
  const response = await gapi.client.sheets.spreadsheets.get({
    spreadsheetId: SHEET_ID,
    fields: "sheets.properties",
  });
  const sheetNames = response.result.sheets.map(
    // @ts-ignore
    (sheet) => ({
      title: sheet.properties.title,
      id: sheet.properties.sheetId,
    }),
  );
  console.log(response.result.sheets);
  return sheetNames as { title: string; id: number }[];
}
