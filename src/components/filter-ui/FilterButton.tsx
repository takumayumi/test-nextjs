"use client";

import {
  CloseButton,
  Dialog,
  Flex,
  IconButton,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { TbFilterFilled } from "react-icons/tb";
import { useEffect } from "react";
import { debounce } from "lodash";
import { FilterBar } from "@/components";

export default function Filter() {
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleResize = debounce(() => {
      if (open) onClose();
    }, 200);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [open, onClose]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
      placement="center"
    >
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Open filter"
          bg="gray.200"
          color="blue.700"
          onClick={onOpen}
        >
          <TbFilterFilled />
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body pb={8} pt={12} px={8}>
              <FilterBar />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top={2} right={2} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
