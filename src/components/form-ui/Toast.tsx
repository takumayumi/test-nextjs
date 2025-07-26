import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  pauseOnPageIdle: true,
  placement: "top",
});

export default function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ base: "4", md: "8" }}>
        {(toast) => (
          <Toast.Root width={{ base: "full", md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.500" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxW="full">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
}
