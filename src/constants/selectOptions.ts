import { createListCollection } from "@chakra-ui/react";

export const titleOptions = createListCollection({
  items: [
    { label: "ASC", value: "title-asc" },
    { label: "DESC", value: "title-desc" },
  ],
});

export const dateOptions = createListCollection({
  items: [
    { label: "ASC", value: "date-asc" },
    { label: "DESC", value: "date-desc" },
  ],
});
