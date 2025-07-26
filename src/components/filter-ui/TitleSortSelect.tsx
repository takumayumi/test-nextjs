import { Field, Select } from "@chakra-ui/react";
import { titleOptions } from "@/constants/selectOptions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortByTitle } from "@/store/slices/filtersSlice";
import { TitleSortOrder } from "@/types";

export default function TitleSortSelect() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.filters.sortByTitle);

  return (
    <Field.Root>
      <Field.Label fontWeight="bold">Sort by Title</Field.Label>
      <Select.Root
        collection={titleOptions}
        value={[value || ""]}
        onValueChange={(e) => {
          const val = e.value[0] as TitleSortOrder;
          dispatch(setSortByTitle(val));
        }}
      >
        <Select.HiddenSelect />
        <Select.Control bg="white" rounded="md">
          <Select.Trigger>
            <Select.ValueText placeholder="Select title sort" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {titleOptions.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Field.Root>
  );
}
