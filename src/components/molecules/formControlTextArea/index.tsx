import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { ErrorMessage } from "../../";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IFormControlTextAreaProps {
  id: string;
  text: string;
  register: UseFormRegister<any>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  validation: {};
  translationPath: string;
}

function FormControlTextArea({
  id,
  error,
  text,
  register,
  validation,
  translationPath,
}: IFormControlTextAreaProps) {
  const { t } = useTranslation();
  return (
    <FormControl id={id}>
      <FormLabel>{text}</FormLabel>
      <Textarea h={"200"} {...register(id, { ...validation })} />
      <ErrorMessage
        text={
          error?.message
            ? t(`${translationPath}.${error?.message?.toString()}`)
            : undefined
        }
      />
    </FormControl>
  );
}

export default FormControlTextArea;
