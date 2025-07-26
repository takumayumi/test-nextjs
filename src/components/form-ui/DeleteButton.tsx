import { Button, CloseButton, Dialog, Portal, chakra } from "@chakra-ui/react";
import { DeleteButtonProps } from "@/types";

export default function DeleteButton(props: DeleteButtonProps) {
  const { title, onConfirm } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          bg="orange.700"
          variant="solid"
          w={{ base: "full", lg: "fit-content" }}
        >
          Delete
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete {title} recipe?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <chakra.p fontSize="sm">
                This action will delete this recipe and cannot be undone.
              </chakra.p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button bg="orange.700" onClick={onConfirm}>
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top={2} right={2} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
