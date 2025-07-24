import { Box, Stack } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/types/recipe";

type Props = {
  recipes: Recipe[];
};

export default function RecipeList({ recipes }: Props) {
  return (
    <Box
      maxH="600px"
      overflowY="auto"
      p={4}
      borderWidth={1}
      borderRadius="md"
      borderColor="gray.200"
      bg="white"
    >
      <Stack spacing={4}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Stack>
    </Box>
  );
}
