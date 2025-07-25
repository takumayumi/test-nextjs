"use client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer">
      <Flex>
        <Text>{new Date().getFullYear()} © takumayumi</Text>
        <Link href="https://github.com/takumayumi/test-nextjs" isExternal>
          GitHub
        </Link>
      </Flex>
    </Box>
  );
}
