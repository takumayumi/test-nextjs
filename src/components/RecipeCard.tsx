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
          height="250px"
          overflow="hidden"
          templateColumns="repeat(3, 1fr)"
          transition="all 0.2s ease-in-out"
          _hover={{
            bg: "gray.50",
            shadow: "sm",
          }}
        >
          <GridItem
            borderColor="gray.200"
            borderRadius={15}
            colSpan={1}
            position="relative"
          >
            <Image
              alt={recipe.title}
              h="full"
              left="50%"
              objectFit="cover"
              position="absolute"
              src={`/images/${recipe.imagePath}`}
              top="50%"
              transform="translate(-50%, -50%)"
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
              transition="all 0.2s ease-in-out"
              zIndex={1}
              _hover={{
                transform: "scale(1.2)",
              }}
            >
              {recipe.isFavorite ? <TiStarFullOutline /> : <TiStarOutline />}
            </Icon>
          </GridItem>
          <GridItem colSpan={2} fontWeight="medium" textStyle="sm">
            <VStack alignItems="start" gap={4} h="full" pb={6} pt={5} px={6}>
              <Text
                css={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
                fontWeight="semibold"
                textStyle="2xl"
              >
                {recipe.title}
              </Text>
              <Text
                css={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {recipe.description}
              </Text>
              <Text textStyle="xs">See more</Text>
              <HStack gap={4} justifyContent="space-between" mt="auto" w="full">
                <Text
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  Added by: {recipe.name}
                </Text>
                <Text
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
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
