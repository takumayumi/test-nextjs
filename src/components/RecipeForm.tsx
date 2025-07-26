import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField, ImageUpload, toaster } from "@/components";
import { checkDuplicateTitle, submitRecipeForm, validate } from "@/lib";
import { RecipeFormData } from "@/types";

export default function RecipeForm() {
  const router = useRouter();
  const [resetKey, setResetKey] = useState<string>("");

  const handleSubmit = async (
    values: RecipeFormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    const isDuplicate = await checkDuplicateTitle(values.title);

    if (isDuplicate) {
      toaster.create({
        type: "error",
        title: "Duplicate title",
        description: "A recipe with that title already exists.",
        closable: true,
      });
      return;
    }

    try {
      await submitRecipeForm(values, toaster);
      resetForm();
      setResetKey(Date.now().toString());
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <Formik<RecipeFormData>
      initialValues={{
        imagePath: null,
        name: "",
        email: "",
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
      }}
      validate={validate}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue, isSubmitting }) => (
        <Form>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={{ base: 8, lg: 12 }}
            w="full"
          >
            <GridItem colSpan={{ base: 3, lg: 1 }}>
              <ImageUpload
                error={errors.imagePath?.toString() ?? ""}
                onChange={(file: File | null) =>
                  setFieldValue("imagePath", file)
                }
                resetKey={resetKey}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Flex direction="column" gap={4}>
                <FormField name="name" label="YOUR NAME" />
                <FormField name="email" label="EMAIL ADDRESS" />
                <FormField name="title" label="TITLE" />
                <FormField
                  name="description"
                  label="DESCRIPTION"
                  type="textarea"
                />
                <FormField
                  name="ingredients"
                  label="INGREDIENTS"
                  type="textarea"
                />
                <FormField
                  name="instructions"
                  label="INSTRUCTIONS"
                  type="textarea"
                />
                <Button
                  bg="blue.700"
                  ml="auto"
                  loading={isSubmitting}
                  loadingText="Saving"
                  type="submit"
                  _hover={{ bg: "blue.900" }}
                >
                  Save
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
