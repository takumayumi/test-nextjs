import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toaster } from "@/components";
import { RecipeFormData, schema } from "@/types";
import Image from "next/image";

export default function RecipeForm({
  existingTitles = [],
}: {
  existingTitles?: string[];
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: RecipeFormData) => {
    if (existingTitles.includes(data.title)) {
      toaster.create({
        type: "error",
        title: "Title must be unique",
        description: "Please use a different recipe title.",
        closable: true,
      });
      return;
    }

    const imageFile = data.image[0];
    const fileName = `${data.title
      .replace(/\s+/g, "-")
      .toLowerCase()}.${imageFile.name.split(".").pop()}`;

    // Simulate upload
    console.log("Saving image as:", fileName);

    toaster.create({
      type: "success",
      title: "Recipe saved!",
      description: "Your recipe has been added successfully.",
      closable: true,
    });

    router.back();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} width="full">
      <Grid templateColumns="repeat(3, 1fr)" gap={{ base: 8, lg: 12 }}>
        <GridItem colSpan={{ base: 3, lg: 1 }} justifyItems="center">
          <Box
            alignItems="top"
            borderRadius={5}
            cursor="pointer"
            display="flex"
            justifyContent="center"
            onClick={() => imageRef.current?.click()}
            maxW={{ base: "fit-content", lg: "100%" }}
          >
            <Image
              src="/unknown.png"
              alt="Upload image"
              width="456"
              height="400"
              objectFit="fill"
            />
          </Box>
          <Field.Root>
            <Input
              type="file"
              accept="image/*"
              hidden
              {...register("image")}
              ref={imageRef}
            />
            <Field.ErrorText>{errors.image?.message as String}</Field.ErrorText>
          </Field.Root>
        </GridItem>
        <GridItem colSpan={{ base: 3, lg: 2 }}>
          <Flex direction="column" gap={4}>
            <Field.Root>
              <Field.Label>YOUR NAME</Field.Label>
              <Input placeholder="Text field data" {...register("name")} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>EMAIL ADDRESS</Field.Label>
              <Input placeholder="Text field data" {...register("email")} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>TITLE</Field.Label>
              <Input placeholder="Text field data" {...register("title")} />
              <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>DESCRIPTION</Field.Label>
              <Textarea
                {...register("description")}
                placeholder="Description here"
                minH={20}
                rows={4}
              />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>INGREDIENTS</Field.Label>
              <Textarea
                {...register("ingredients")}
                placeholder="Description here"
                minH={20}
                rows={4}
              />
              <Field.ErrorText>{errors.instructions?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>INSTRUCTIONS</Field.Label>
              <Textarea
                {...register("instructions")}
                placeholder="Description here"
                minH={20}
                rows={4}
              />
              <Field.ErrorText>{errors.instructions?.message}</Field.ErrorText>
            </Field.Root>
            <Button
              bg="blue.700"
              ml="auto"
              loading={loading}
              loadingText="Saving"
              shadow="sm"
              transition="all 0.2s ease-in-out"
              type="submit"
              minW="fit-content"
              _hover={{
                bg: "blue.900",
              }}
            >
              Save
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
