import { Flex, Text } from "@chakra-ui/react";

export default function NoResults() {
  return (
    <Flex
      alignItems="center"
      direction="columnn"
      justifyContent="center"
      h="full"
      w="full"
    >
      <Text fontWeight="bold" textStyle="3xl">
        No Record Found!
      </Text>
    </Flex>
  );
}
