import { Box, Stack } from "@chakra-ui/react";
import { RecipeCard } from "@/components";
import { Recipe } from "@/types";

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <Box>
      <Stack spacing={4}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Stack>
    </Box>
  );
}
