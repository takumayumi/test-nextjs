import { Field, Portal, Select } from "@chakra-ui/react";
import { useState } from "react";
import { dateOptions } from "@/constants/selectOptions";

export default function DateSortSelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Field.Root>
      <Field.Label fontWeight="bold">Sort by Date</Field.Label>
      <Select.Root
        collection={dateOptions}
        value={value}
        onValueChange={(e) => setValue(e.value)}
      >
        <Select.HiddenSelect />
        <Select.Control bg="white" rounded="md">
          <Select.Trigger>
            <Select.ValueText placeholder="Select date sort" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
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
        </Portal>
      </Select.Root>
    </Field.Root>
  );
}
