import { Controller, Control, FieldValues, Path } from "react-hook-form";
//CONTROLLER IS A REACT HOOK FORM WHICH IS USED IN ORDER TO GAIN CONTROL OVER INPUT DATA WHEN THE INPUT ELEMENTS ARE NOT REGULAR ie SOME SHADCN OR UI LIBRARIES ARE BEING USED
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field ,fieldState }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className={`input ${fieldState.error ? "border-red-500" : ""}`}
              type={type}
              placeholder={placeholder}
              {...field}
            />
           
          </FormControl>
            <FormMessage className="text-red-500">
            {fieldState.error?.message}
           </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormField;