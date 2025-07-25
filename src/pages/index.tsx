import { Box, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { FilterBar, NoResults, RecipeForm, RecipeList } from "@/components";
import recipeData from "@/data/recipes.json";
import { Recipe } from "@/types";

export default function Home() {
  const recipes: Recipe[] = recipeData;

  return (
    <>
      <Head>
        <title>takumayumi | Recipe with Next.js 14</title>
        <meta
          name="description"
          content="Frontend assessment project developed for Security Bank. Built with Next.js, Chakra UI, and TypeScript to demonstrate responsive design, clean code, and accessible UI components."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Box p={8}>
            <Heading mb={4}>Recipes</Heading>
            <FilterBar />
            {recipes.length === 0 ? (
              <NoResults />
            ) : (
              <RecipeList recipes={recipes} />
            )}
          </Box>
          <RecipeForm />
        </Container>
      </main>
    </>
  );
}
