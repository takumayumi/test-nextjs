import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { toggleFavorite } from "@/lib";
import { RecipeCardProps } from "@/types";

export default function RecipeCard(props: RecipeCardProps) {
  const { isFirst, isLast, recipe } = props;

  return (
    <Box
      borderColor="gray.300"
      borderStyle="solid"
      borderBottomWidth={isLast ? 0 : 1}
      pt={isFirst ? 0 : 4}
      pb={isLast ? 0 : 6}
    >
      <Link href={`/recipes/${recipe.id}`} title={recipe.title}>
        <Grid
          borderColor="gray.300"
          borderStyle="solid"
          borderWidth={1}
          borderRadius={15}
          overflow="hidden"
          templateColumns="repeat(3, 1fr)"
        >
          <GridItem
            borderColor="gray.200"
            borderRadius={15}
            colSpan={1}
            position="relative"
          >
            <Image
              src={`/images/${recipe.imagePath}`}
              alt={recipe.title}
              h="full"
              w="full"
            />
            <Icon
              aria-label="Favorite"
              color="yellow"
              cursor="pointer"
              right={2}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(recipe.id, !recipe.isFavorite);
              }}
              position="absolute"
              size="2xl"
              top={2}
              zIndex={1}
            >
              {recipe.isFavorite ? <TiStarFullOutline /> : <TiStarOutline />}
            </Icon>
          </GridItem>
          <GridItem colSpan={2} textStyle="sm">
            <VStack alignItems="start" gap={4} px={6} py={4}>
              <Text textStyle="2xl" fontWeight="medium">
                {recipe.title}
              </Text>
              <Text>{recipe.instructions}</Text>
              <HStack gap={4} justifyContent="space-between" w="full">
                <Text>Added by: {recipe.name}</Text>
                <Text>
                  Date:{" "}
                  {new Date(recipe.dateCreated).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>
      </Link>
    </Box>
  );
}
