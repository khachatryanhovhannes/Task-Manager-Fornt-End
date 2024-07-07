import { Box, FormControl, Heading, Stack } from "@chakra-ui/react";
import { FormButton, PasswordField } from "../../";
import { passwordValidation } from "../../../helpers";
import { IUserChangePassword } from "../../../models";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks";
import { changePassword } from "../../../redux/thunks/userThunks";

function ChangePasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserChangePassword>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<IUserChangePassword> = (data) => {
    dispatch(changePassword(data.newPassword));
  };

  return (
    <Box mt={8} minW={"100%"}>
      <Heading fontSize="xl" mb={4} textAlign={"center"}>
        Update Password
      </Heading>
      <FormControl
        as="form"
        rounded="lg"
        boxShadow="2xl"
        onSubmit={handleSubmit(onSubmit)}
        w={{ base: "100%", sm: "500px" }}
        p={8}
      >
        <Stack spacing={4}>
          <PasswordField
            text={t("LOGIN.NEW_PASSWORD")}
            id="newPassword"
            register={register}
            error={errors.password}
            validation={passwordValidation}
            translationPath="LOGIN.ERRORS.NEW_PASSWORD"
          />

          <FormButton text={t("LOGIN.CHANGE_PASSWORD")} />
        </Stack>
      </FormControl>
    </Box>
  );
}

export default ChangePasswordForm;
