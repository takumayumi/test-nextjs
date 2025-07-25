import { Box, Button, Checkbox, Flex, Input, Select } from "@chakra-ui/react";
import { FilterBarProps } from "@/types";

export default function FilterBar(props: FilterBarProps) {
  const { onSearchChange, onSortChange, onFilterFavoritesChange, onReset } =
    props;

  return (
    <Box>
      <Flex flexWrap="wrap">
        <Input
          placeholder="Search by title"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <Select
          placeholder="Sort by"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onSortChange?.(e.target.value)
          }
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="date-desc">Date (Newest)</option>
        </Select>
        <Checkbox
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFilterFavoritesChange?.(e.target.checked)
          }
        >
          Favorites Only
        </Checkbox>
        <Button onClick={onReset}>Clear Filters</Button>
      </Flex>
    </Box>
  );
}
