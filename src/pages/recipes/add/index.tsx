import Head from "next/head";
import { Layout, RecipeForm } from "@/components";

export default function Add() {
  return (
    <>
      <Head>
        <title>takumayumi | Add Recipe</title>
      </Head>
      <Layout>
        <RecipeForm />
      </Layout>
    </>
  );
}
