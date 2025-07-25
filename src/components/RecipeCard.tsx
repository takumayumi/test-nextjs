import { Box, IconButton, Image, Text, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Recipe } from "@/types";

type Props = {
  onToggleFavorite?: (id: string) => void;
  recipe: Recipe;
};

export default function RecipeCard({ recipe, onToggleFavorite }: Props) {
  return (
    <Box>
      <Box position="relative">
        <Image src={`/images/${recipe.image}`} alt={recipe.title} />
        <Stack>
          <IconButton
            icon={<StarIcon />}
            aria-label="Favorite"
            colorScheme={recipe.isFavorite ? "yellow" : "gray"}
            onClick={() => onToggleFavorite?.(recipe.id)}
          />
          <Text>{recipe.title}</Text>
          <Text>{new Date(recipe.dateCreated).toLocaleDateString()}</Text>
          <Text>
            By {recipe.name} ({recipe.email})
          </Text>
          <Text>{recipe.instructions}</Text>
        </Stack>
      </Box>
    </Box>
  );
}
