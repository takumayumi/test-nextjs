import { Field, Portal, Select } from "@chakra-ui/react";
import { titleOptions } from "@/constants/selectOptions";
import { useState } from "react";

export default function TitleSortSelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Field.Root>
      <Field.Label fontWeight="bold">Sort by Title</Field.Label>
      <Select.Root
        collection={titleOptions}
        value={value}
        onValueChange={(e) => setValue(e.value)}
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
