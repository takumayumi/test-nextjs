import { useToast } from "@chakra-ui/react";
import { toastOptions } from "@/types";

export type ToastStatus = "error" | "success";

export default function Toast() {
  const toast = useToast();

  const showToast = ({
    description,
    status = "success",
    title,
  }: toastOptions) => {
    toast({
      description,
      duration: 3000,
      isClosable: true,
      position: "top-right",
      status,
      title,
    });
  };

  return showToast;
}
