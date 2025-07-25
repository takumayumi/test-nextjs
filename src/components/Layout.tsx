import { Box, Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Header } from "@/components";
import { LayoutProps } from "@/types";

export default function Layout(props: LayoutProps) {
  const { children } = props;
  const router = useRouter();

  return (
    <Flex direction="column" minH="100vh">
      <Header showSearch={router.pathname === "/"} />
      <Flex
        as="main"
        bg="gray.100"
        direction="column"
        h="100%"
        px={{ base: 4, lg: 6 }}
        py={{ base: 8, lg: 12 }}
        flex="1"
        width="100%"
      >
        <Container
          display="flex"
          flex="1"
          flexDirection="column"
          h="100%"
          maxWidth="container.xl"
          width="100%"
        >
          {children}
        </Container>
      </Flex>
    </Flex>
  );
}
