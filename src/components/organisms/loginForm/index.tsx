import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Checkbox, FormControl, Stack } from "@chakra-ui/react";
import { PasswordField, FormControlField, FormButton } from "../../";
import { FormEventHandler } from "react";
import { emailValidation, passwordValidation } from "../../../helpers";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
  handleSubmit: FormEventHandler<HTMLDivElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

function LoginForm({ handleSubmit, register, errors }: LoginFormProps) {
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
        <FormControlField
          id="email"
          type="email"
          text={t("LOGIN.EMAIL")}
          register={register}
          error={errors.email}
          validation={emailValidation}
          translationPath="LOGIN.ERRORS.EMAIL"
        />

        <PasswordField
          text={t("LOGIN.PASSWORD")}
          id="password"
          register={register}
          error={errors.password}
          validation={passwordValidation}
          translationPath="LOGIN.ERRORS.PASSWORD"
        />

        <Stack spacing={10}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox {...register("remember")}>{t("LOGIN.REMEMBER")}</Checkbox>
          </Stack>

          <FormButton text={t("LOGIN.SIGN_IN")} />
        </Stack>
      </Stack>
    </FormControl>
  );
}

export default LoginForm;
