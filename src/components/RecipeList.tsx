import { Box, Stack } from "@chakra-ui/react";
import { RecipeCard } from "@/components";
import { Recipe } from "@/types";

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <Box>
      <Stack>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            isFirst={index === 0}
            isLast={index === recipes.length - 1}
            recipe={recipe}
          />
        ))}
      </Stack>
    </Box>
  );
}
