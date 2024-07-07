import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { ErrorMessage, ShowPasswordIcon } from "../../";
import { useTranslation } from "react-i18next";

interface IInputPassWordFieldProps {
  register: UseFormRegister<any>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  validation: {};
  translationPath: string;
  id: string;
  text?: string;
}

function PasswordField({
  register,
  error,
  validation,
  translationPath,
  id,
  text,
}: IInputPassWordFieldProps) {
  const { t } = useTranslation();
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <FormControl id={id}>
      <FormLabel>{text}</FormLabel>
      <InputGroup>
        <Input
          borderWidth={"3px"}
          type={isShowPassword ? "text" : "password"}
          {...register(id, { ...validation })}
        />
        <InputRightElement>
          <ShowPasswordIcon
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
          />
        </InputRightElement>
      </InputGroup>

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

export default PasswordField;
