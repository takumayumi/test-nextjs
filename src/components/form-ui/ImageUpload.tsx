import {
  Box,
  Image as ChakraImage,
  Input,
  Field as ChakraField,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageUploadProps } from "@/types";

export default function ImageUpload(props: ImageUploadProps) {
  const { error, initialImage, onChange, resetKey } = props;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      const file = files[0];
      setPreviewUrl(URL.createObjectURL(file));
      onChange(file);
    } else {
      setPreviewUrl(null);
      onChange(null);
    }
  };

  useEffect(() => {
    if (!!resetKey) {
      setPreviewUrl(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onChange(null);
    }
  }, [resetKey]);

  return (
    <>
      <Box
        borderRadius="md"
        cursor="pointer"
        mx="auto"
        onClick={handleClick}
        w="fit-content"
      >
        {previewUrl ? (
          <ChakraImage
            alt="Preview"
            borderRadius="md"
            objectFit="cover"
            rounded="md"
            src={previewUrl}
          />
        ) : (
          <Image
            alt={initialImage || "Upload image"}
            height={400}
            priority={true}
            src={initialImage ? `/images/${initialImage}` : "/unknown.png"}
            width={456}
          />
        )}
      </Box>
      <ChakraField.Root invalid={!!error}>
        <Input
          accept="image/*"
          hidden
          onChange={handleChange}
          ref={inputRef}
          type="file"
        />
        <ChakraField.ErrorText>{error}</ChakraField.ErrorText>
      </ChakraField.Root>
    </>
  );
}
