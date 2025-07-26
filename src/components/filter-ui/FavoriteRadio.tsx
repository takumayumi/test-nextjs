import { Field, Flex, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFavoriteFilter } from "@/store/slices/filtersSlice";

export default function FavoriteRadio() {
  const dispatch = useAppDispatch();
  const currentValue = useAppSelector((state) => state.filters.isFavorite);
  const value =
    currentValue === true ? "yes" : currentValue === false ? "no" : null;

  const handleChange = (val: string) => {
    if (val === "yes") dispatch(setFavoriteFilter(true));
    else if (val === "no") dispatch(setFavoriteFilter(false));
    else dispatch(setFavoriteFilter(null));
  };

  return (
    <Flex direction="column" gap={2}>
      <Text fontWeight="bold">Filter</Text>
      <Field.Root bg="white" borderWidth={1} borderRadius={5} p="6">
        <Field.Label mb={4}>Favorites?</Field.Label>
        <RadioGroup.Root
          value={value}
          onValueChange={(e) => handleChange(e.value ?? "")}
        >
          <VStack gap="4">
            <RadioGroup.Item cursor="pointer" value="yes">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Yes</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item cursor="pointer" value="no">
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
