import { Flex, Text } from "@chakra-ui/react";

export default function NoResults() {
  return (
    <Flex
      alignItems="center"
      direction="columnn"
      justifyContent="center"
      h="100%"
      w="100%"
    >
      <Text fontWeight="bold" textStyle="3xl">
        No Record Found!
      </Text>
    </Flex>
  );
}
