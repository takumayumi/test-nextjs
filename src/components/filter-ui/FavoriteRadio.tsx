import { Field, Flex, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function FavoriteRadio() {
  const [value, setValue] = useState<string>("no");

  return (
    <Flex direction="column" gap={2}>
      <Text fontWeight="bold">Filter</Text>
      <Field.Root bg="white" borderWidth={1} borderRadius={5} p="6">
        <Field.Label mb={4}>Favorites?</Field.Label>
        <RadioGroup.Root value={value}>
          <VStack gap="4">
            <RadioGroup.Item value="yes">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Yes</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="no">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>No</RadioGroup.ItemText>
            </RadioGroup.Item>
          </VStack>
        </RadioGroup.Root>
      </Field.Root>
    </Flex>
  );
}
