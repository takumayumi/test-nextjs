import { Field as ChakraField, Input, Textarea } from "@chakra-ui/react";
import { Field as FormikField, FieldProps } from "formik";
import { FormFieldProps } from "@/types";

export default function FormField(props: FormFieldProps) {
  const { name, label, type = "input", ...rest } = props;

  return (
    <FormikField name={name}>
      {({ field, meta }: FieldProps) => (
        <ChakraField.Root invalid={meta.touched && !!meta.error}>
          <ChakraField.Label>{label}</ChakraField.Label>
          {type === "textarea" ? (
            <Textarea
              {...field}
              {...rest}
              minH={20}
              rows={4}
              placeholder="Description here"
            />
          ) : (
            <Input {...field} {...rest} placeholder="Text field data" />
          )}
          <ChakraField.ErrorText>
            {meta.touched && meta.error}
          </ChakraField.ErrorText>
        </ChakraField.Root>
      )}
    </FormikField>
  );
}
