import { reatomComponent } from "@reatom/npm-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { WishListTableRow } from "widgets/Wishlist/model/Table.types.ts";
import { Button, Text, TextInput } from "@mantine/core";
import { IconSquareRoundedPlusFilled, IconX } from "@tabler/icons-react";
import { AtomMut } from "@reatom/framework";

type LinksFieldProps = Parameters<
  Exclude<MRT_ColumnDef<WishListTableRow>["Edit"], undefined>
>[0] & {
  linksAtom: AtomMut<{ id: number; value: string }[]>;
  onChange: (id: number, value: string) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
};

export const LinksField = reatomComponent<LinksFieldProps>(
  ({ ctx, onChange, linksAtom, onDelete, onAdd }) => {
    const inputs = ctx.spy(linksAtom);

    return (
      <>
        <Text>Ссылки</Text>
        {inputs.map(({ id, value }) => (
          <TextInput
            rightSection={
              <Button
                onClick={() => {
                  onDelete(id);
                }}
                compact
                color="gray"
                size="xs"
                variant="subtle"
              >
                <IconX />
              </Button>
            }
            key={id}
            value={value}
            onChange={(e) => {
              onChange(id, e.target.value);
            }}
          />
        ))}
        <Button
          color="gray"
          variant="outline"
          leftIcon={<IconSquareRoundedPlusFilled />}
          onClick={onAdd}
        >
          Добавить ссылку
        </Button>
      </>
    );
  },
);
