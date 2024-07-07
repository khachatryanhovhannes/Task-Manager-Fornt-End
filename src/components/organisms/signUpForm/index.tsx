import { HStack, FormControl, Stack } from "@chakra-ui/react";
import { FormButton, FormControlField, PasswordField } from "../../";
import { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../../../helpers";
import { useTranslation } from "react-i18next";

type SignUpFormProps = {
  handleSubmit: FormEventHandler<HTMLDivElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

function SignUpForm({ handleSubmit, register, errors }: SignUpFormProps) {
  const { t } = useTranslation();

  return (
    <FormControl
      as="form"
      rounded="lg"
      boxShadow="2xl"
      w={{ base: "100%", sm: "500px" }}
      p={8}
      onSubmit={handleSubmit}
    >
      <Stack spacing={4}>
        <HStack>
          <FormControlField
            id="firstName"
            type="text"
            text={t("SIGN_UP.FIRST_NAME")}
            register={register}
            error={errors.firstName}
            validation={nameValidation}
            translationPath="SIGN_UP.ERRORS.NAME"
          />
          <FormControlField
            id="lastName"
            type="text"
            text={t("SIGN_UP.LAST_NAME")}
            register={register}
            error={errors.lastName}
            validation={nameValidation}
            translationPath="SIGN_UP.ERRORS.NAME"
          />
        </HStack>
        <FormControlField
          id="email"
          type="email"
          text={t("SIGN_UP.EMAIL")}
          register={register}
          error={errors.email}
          validation={emailValidation}
          translationPath="SIGN_UP.ERRORS.EMAIL"
        />
        <PasswordField
          text={t("LOGIN.PASSWORD")}
          id="password"
          register={register}
          error={errors.password}
          validation={passwordValidation}
          translationPath="SIGN_UP.ERRORS.PASSWORD"
        />
        <FormButton text={t("SIGN_UP.SIGN_UP")} />
      </Stack>
    </FormControl>
  );
}

export default SignUpForm;
