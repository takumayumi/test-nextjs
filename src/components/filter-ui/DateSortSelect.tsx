import { Field, Select } from "@chakra-ui/react";
import { dateOptions } from "@/constants/selectOptions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortByDate } from "@/store/slices/filtersSlice";
import { DateSortOrder } from "@/types";

export default function DateSortSelect() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.filters.sortByDate);

  return (
    <Field.Root>
      <Field.Label fontWeight="bold">Sort by Date</Field.Label>
      <Select.Root
        collection={dateOptions}
        value={[value || ""]}
        onValueChange={(e) => {
          const val = e.value[0] as DateSortOrder;
          dispatch(setSortByDate(val));
        }}
      >
        <Select.HiddenSelect />
        <Select.Control bg="white" cursor="pointer" rounded="md">
          <Select.Trigger>
            <Select.ValueText placeholder="Select date sort" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {dateOptions.items.map((item) => (
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
