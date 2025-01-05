export const getAccessorKey = (index: number) => {
  switch (index) {
    case 0:
      return "name";
    case 1:
      return "price";
    case 2:
      return "desire";
    case 3:
      return "links";
    case 4:
      return "description";
    default:
      throw new Error("Unknown accessor");
  }
};
