import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { DeleteButton, FormField, ImageUpload, toaster } from "@/components";
import { checkDuplicateTitle, submitRecipeForm, validate } from "@/lib";
import { RecipeFormData, RecipeFormProps } from "@/types";

export default function RecipeForm(props: RecipeFormProps) {
  const { initialValues, onDelete } = props;
  const router = useRouter();

  const defaultValues = {
    id: null,
    imagePath: null,
    name: "",
    email: "",
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    ...initialValues,
  };

  const handleSubmit = async (values: RecipeFormData) => {
    const isDuplicate = await checkDuplicateTitle(
      values.title,
      values?.id ?? undefined
    );
    if (isDuplicate) {
      return;
    } else {
      try {
        await submitRecipeForm(values, toaster);
        if (!defaultValues.id) router.back();
      } catch (err) {
        console.error("Submission error:", err);
      }
    }
  };

  return (
    <Formik<RecipeFormData>
      enableReinitialize
      initialValues={defaultValues}
      onSubmit={(values) => handleSubmit(values)}
      validate={validate}
      validateOnChange={false}
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
                initialImage={
                  typeof defaultValues.imagePath === "string"
                    ? `${defaultValues.imagePath}?v=${
                        initialValues?.lastUpdated ?? Date.now()
                      }`
                    : undefined
                }
                onChange={(file: File | null) =>
                  setFieldValue("imagePath", file)
                }
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Flex direction="column" gap={4}>
                <FormField name="name" label="YOUR NAME" />
                <FormField name="email" label="EMAIL ADDRESS" />
                <FormField
                  name="title"
                  label="TITLE"
                  readOnly={!!initialValues?.id}
                />
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
                <Flex
                  alignItems="center"
                  direction={{ base: "column-reverse", lg: "row" }}
                  gap={4}
                  justifyContent="flex-end"
                >
                  {onDelete && (
                    <DeleteButton
                      onConfirm={onDelete}
                      title={defaultValues.title}
                    />
                  )}
                  <Button
                    bg="blue.700"
                    loading={isSubmitting}
                    loadingText="Saving"
                    type="submit"
                    w={{ base: "full", lg: "fit-content" }}
                    _hover={{ bg: "blue.900" }}
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
