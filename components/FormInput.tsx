import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema('sign-up')

interface FormInputProps {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string,
  type: string
}
const FormInput = ({
  control,
  name,
  label,
  placeholder,
  type,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Input
            {...field}
            value={field.value ?? ""}
            id={name}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid ? "true" : "false"}
            className={fieldState.invalid ? "shake" : ""}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
      />
    );
  };
  
  export default FormInput;
  