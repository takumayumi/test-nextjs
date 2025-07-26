import { Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BackButton, Header, Toast } from "@/components";
import { LayoutProps } from "@/types";

export default function Layout(props: LayoutProps) {
  const { children } = props;
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <Flex direction="column" minH="100vh">
      <Header showSearch={isHome} />
      <Flex
        as="main"
        bg="gray.100"
        direction="column"
        h="full"
        px={{ base: 4, lg: 6 }}
        py={{ base: 8, lg: 12 }}
        flex="1"
        w="full"
      >
        <Container
          display="flex"
          flex="1"
          flexDirection="column"
          h="full"
          maxW="container.xl"
          w="full"
        >
          {!isHome && <BackButton />}
          {children}
        </Container>
      </Flex>
      <Toast />
    </Flex>
  );
}
