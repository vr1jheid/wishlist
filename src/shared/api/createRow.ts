export interface CreateRowOptions {
  data: string[];
  row: number;
  list: string;
}

export const createRow = async ({ data, row, list }: CreateRowOptions) => {
  // @ts-ignore
  console.log(data);
  return await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: "1v4qPRi1bLMm6rdSM-Zk4KqAskVUBHFRuZvL1-tp5fD8",
    range: `${list}!A${row}`,
    valueInputOption: "RAW",
    resource: {
      values: [data],
    },
  });
};
