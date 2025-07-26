import { Box, Container, Flex } from "@chakra-ui/react";
import { FilterButton, TitleSearch } from "@/components";
import { HeaderProps } from "@/types";

export default function Header(props: HeaderProps) {
  const { showSearch } = props;

  return (
    <Box
      bg="blue.700"
      id="header"
      px={{ base: 4, lg: 6 }}
      py={{ base: 6, lg: 8 }}
      flex="none"
    >
      <Container maxW="container.xl">
        <Flex direction="row" gap={4}>
          <Box display={{ base: "none", lg: "block" }} flex="1" />
          <Box display={{ base: "none", lg: "block" }} flex="1" />
          {showSearch ? (
            <TitleSearch />
          ) : (
            <Box display="block" flex="1" minH="40px" w="full" />
          )}
          <Box display={{ base: "block", lg: "none" }}>
            <FilterButton />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
