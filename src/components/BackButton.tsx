import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <Box mb={{ base: 8, lg: 12 }} w="full">
      <Button
        onClick={() => router.back()}
        p={0}
        textStyle="xl"
        variant="plain"
      >
        <Icon as={FiArrowLeft} size="lg" />
        <Text>Back</Text>
      </Button>
    </Box>
  );
}
