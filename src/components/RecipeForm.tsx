import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

export default function RecipeForm() {
  return (
    <Box as="form">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type="text" />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Instructions</FormLabel>
        <Textarea />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input type="file" />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
      <Button type="submit">Submit</Button>
    </Box>
  );
}
