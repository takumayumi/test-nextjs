import { Box, Stack } from "@chakra-ui/react";
import { RecipeCard } from "@/components";
import { RecipeProps } from "@/types";

export default function RecipeList({ recipes }: { recipes: RecipeProps[] }) {
  return (
    <Box>
      <Stack>
        {recipes.map((recipe, index) => (
          <RecipeCard
            isFirst={index === 0}
            isLast={index === recipes.length - 1}
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </Stack>
    </Box>
  );
}
