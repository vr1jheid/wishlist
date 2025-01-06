import { reatomComponent, useAtom } from "@reatom/npm-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { WishListTableRow } from "widgets/Wishlist/model/Table.types.ts";
import { Button, Text, TextInput } from "@mantine/core";

type LinksFieldProps = Parameters<
  Exclude<MRT_ColumnDef<WishListTableRow>["Edit"], undefined>
>[0] & {
  onChange: (index: number, value: string) => void;
};

export const LinksField = reatomComponent<LinksFieldProps>(({ onChange }) => {
  const [inputsCount, setInputsCount] = useAtom(0);
  console.log("rerender", inputsCount);

  return (
    <>
      <Text>Ссылки</Text>
      {Array(inputsCount)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            onChange={(e) => {
              //setInputValue(index, e.target.value);
              onChange(index, e.target.value);
            }}
          />
        ))}
      <Button onClick={() => setInputsCount((prev) => prev + 1)}>Add</Button>
    </>
  );
});
