import { Field, Portal, Select } from "@chakra-ui/react";
import { useState } from "react";
import { titleOptions } from "@/constants/selectOptions";
import { useAppDispatch } from "@/store/hooks";
import { setSortByTitle } from "@/store/slices/filtersSlice";
import { TitleSortOrder } from "@/types";

export default function TitleSortSelect() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<TitleSortOrder>("title-desc");

  return (
    <Field.Root>
      <Field.Label fontWeight="bold">Sort by Title</Field.Label>
      <Select.Root
        collection={titleOptions}
        value={[value]}
        onValueChange={(e) => {
          const val = e.value[0] as TitleSortOrder;
          setValue(val);
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
        <Portal>
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
        </Portal>
      </Select.Root>
    </Field.Root>
  );
}
