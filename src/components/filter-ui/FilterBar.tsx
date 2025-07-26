import { Flex } from "@chakra-ui/react";
import {
  ClearFilterButton,
  DateSortSelect,
  FavoriteRadio,
  TitleSortSelect,
} from "@/components";

export default function FilterBar() {
  return (
    <Flex direction="column" gap={4}>
      <TitleSortSelect />
      <DateSortSelect />
      <FavoriteRadio />
      <ClearFilterButton />
    </Flex>
  );
}
