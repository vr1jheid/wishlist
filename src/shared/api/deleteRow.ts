import { SHEET_ID } from "app/const/google.ts";

export async function deleteRow(sheetId: number, rowIndex: number) {
  try {
    const request = {
      spreadsheetId: SHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId, // ID листа
                dimension: "ROWS",
                startIndex: rowIndex - 1, // Номер строки (начинается с 0)
                endIndex: rowIndex, // Конечный индекс строки
              },
            },
          },
        ],
      },
    };

    // @ts-ignore
    const response = await gapi.client.sheets.spreadsheets.batchUpdate(request);
    console.log("Удаление строки выполнено:", response);
  } catch (error) {
    console.error("Ошибка при удалении строки:", error);
  }
}
