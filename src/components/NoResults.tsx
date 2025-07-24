import { Box, Text } from "@chakra-ui/react";

export default function NoResults() {
  return (
    <Box textAlign="center" py={10}>
      <Text fontSize="lg" color="gray.500">
        No Record Found
      </Text>
    </Box>
  );
}
