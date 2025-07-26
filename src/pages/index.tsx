import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filterRecipes } from "@/lib";
import {
  AddButton,
  FilterBar,
  Layout,
  NoResults,
  RecipeList,
} from "@/components";
import { RootState } from "@/store";
import { RecipeProps } from "@/types";
import { GetServerSideProps } from "next";

export default function Home({ recipes }: { recipes: RecipeProps[] }) {
  const filters = useSelector((state: RootState) => state.filters);
  const filteredRecipes: RecipeProps[] = filterRecipes(recipes, filters);
  const [contentHeight, setContentHeight] = useState(0);

  const paddingOffset =
    useBreakpointValue({
      base: 32 * 2,
      lg: 48 * 2,
    }) ?? 64;

  useEffect(() => {
    const updateHeight = () => {
      const header = document.getElementById("header");
      const headerHeight = header?.offsetHeight || 0;
      const availableHeight = window.innerHeight - headerHeight - paddingOffset;
      setContentHeight(availableHeight);
    };

    const debouncedResize = debounce(updateHeight, 150);

    updateHeight();
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel();
    };
  }, [paddingOffset]);

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
      <Layout>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={{ base: 8, lg: 12 }}
          flex="1"
          h="full"
          w="full"
        >
          <GridItem
            colSpan={{ base: 3, lg: 1 }}
            display={{ base: "none", lg: "block" }}
          >
            <FilterBar />
          </GridItem>
          <GridItem colSpan={{ base: 3, lg: 2 }} position="relative">
            <AddButton />
            <Box
              bg="white"
              borderRadius={15}
              boxShadow="sm"
              css={{
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              h="full"
              maxH={contentHeight === 0 ? "full" : contentHeight}
              overflowY="auto"
              p={{ base: 10, lg: 12 }}
              w="full"
            >
              {filteredRecipes.length === 0 ? (
                <NoResults />
              ) : (
                <RecipeList recipes={filteredRecipes} />
              )}
            </Box>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const res = await fetch(`${protocol}://${host}/api/recipes`);

  if (!res.ok) {
    return {
      props: {
        recipes: [],
      },
    };
  }

  const data = await res.json();

  return {
    props: {
      recipes: data.recipes || [],
    },
  };
};
