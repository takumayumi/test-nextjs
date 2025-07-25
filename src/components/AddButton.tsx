import { Icon, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function AddButton() {
  return (
    <Link href="/recipes/add" title="Add recipe link">
      <IconButton
        aria-label="Add recipe"
        aspectRatio="square"
        bg="blue.700"
        h="60px"
        position="absolute"
        right={6}
        rounded="full"
        top={6}
        transition="all 0.2s ease-in-out"
        w="60px"
        variant="solid"
        zIndex={1}
        _hover={{
          transform: "scale(1.2)",
          bg: "blue.800",
        }}
      >
        <Icon h={10} w={10}>
          <FiPlus />
        </Icon>
      </IconButton>
    </Link>
  );
}
