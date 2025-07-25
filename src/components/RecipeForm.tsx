import { Box, Button, Field, Input, Textarea } from "@chakra-ui/react";

export default function RecipeForm() {
  return (
    <Box as="form">
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input type="text" />
        <Field.ErrorText>Error</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input type="email" />
        <Field.ErrorText>Error</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Field.Label>Title</Field.Label>
        <Input type="text" />
        <Field.ErrorText>Error</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Field.Label>Instructions</Field.Label>
        <Textarea />
        <Field.ErrorText>Error</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Field.Label>Image</Field.Label>
        <Input type="file" />
        <Field.ErrorText>Error</Field.ErrorText>
      </Field.Root>
      <Button type="submit">Submit</Button>
    </Box>
  );
}
