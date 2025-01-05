import { getAccessorKey } from "widgets/Wishlist/utils/getAccessorKey.ts";

export type ColumnsKeys = ReturnType<typeof getAccessorKey>;

export type WishListTableRow = Record<ColumnsKeys, string>;
