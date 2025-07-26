import { GetServerSideProps } from "next";
import Head from "next/head";
import { Layout, RecipeForm, toaster } from "@/components";
import { RecipePageProps } from "@/types";
import { deleteRecipe } from "@/lib";

export default function Recipe(props: RecipePageProps) {
  const { recipe } = props;

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleDelete = async () => {
    await deleteRecipe(recipe.id);
  };

  return (
    <>
      <Head>
        <title>takumayumi | {`${recipe?.title || "Recipe"}`}</title>
      </Head>
      <Layout>
        <RecipeForm initialValues={recipe} onDelete={handleDelete} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(`${baseUrl}/api/recipes/${id}`);
    const data = await res.json();

    if (!res.ok || !data.recipe) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        recipe: data.recipe,
      },
    };
  } catch (error) {
    console.error("SSR Error:", error);
    return {
      props: {
        recipe: null,
      },
    };
  }
};
