import {
  HeadingField,
  SignUpForm,
  FormHint,
  ErrorMessage,
  Loader,
} from "../../components";
import { Flex, Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IUserRegister } from "models";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userRegister } from "../../redux/thunks/userThunks";
import { useEffect } from "react";
// import { clearIsRegister } from "../../redux/features/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isRegister,
    user,
    isLoading,
    error: errorMessage,
  } = useAppSelector((state) => state.users);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IUserRegister> = (data) => {
    dispatch(userRegister(data));
  };

  useEffect(() => {
    if (isRegister) {
      navigate("/signIn");
    }
    if (user) {
      navigate("/");
    }
  }, [isRegister]);

  return isLoading ? (
    <Loader />
  ) : (
    <Flex mt={"20px"} justify={"center"} mb={"20px"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <HeadingField text={t("SIGN_UP.TITLE")} />
        </Stack>

        <FormHint
          text={t("SIGN_UP.TEXT_ONE.TEXT")}
          linkText={t("SIGN_UP.TEXT_ONE.LINK")}
          link="/signIn"
        />

        <ErrorMessage
          text={
            errorMessage && typeof errorMessage === "string"
              ? t(`GENERAL_ERRORS.${errorMessage.toUpperCase()}`)
              : ""
          }
        />

        <SignUpForm
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
      </Stack>
    </Flex>
  );
}

export default SignUp;
