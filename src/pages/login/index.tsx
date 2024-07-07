import {
  ErrorMessage,
  HeadingField,
  FormHint,
  LoginForm,
  Loader,
} from "../../components";
import { Flex, Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserInfo, userLogin } from "../../redux/thunks/userThunks";
import { clearIsRegister } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.users.error);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const user = useAppSelector((state) => state.users.user);
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated
  );
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit" });

  useEffect(() => {
    if (user) {
      dispatch(clearIsRegister());
      dispatch(getUserInfo());
      navigate("/");
    }
  }, [isAuthenticated, user]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      userLogin({
        email: data.email,
        password: data.password,
      })
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Flex justify={"center"} mt={"20px"} mb={"20px"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <HeadingField text={t("LOGIN.TITLE")} />
        </Stack>
        <FormHint
          text={t("LOGIN.TEXT_ONE.TEXT")}
          linkText={t("LOGIN.TEXT_ONE.LINK")}
          link="/signUp"
        />

        <ErrorMessage
          text={
            errorMessage && typeof errorMessage === "string"
              ? t(`GENERAL_ERRORS.${errorMessage.toUpperCase()}`)
              : ""
          }
        />

        <LoginForm
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
      </Stack>
    </Flex>
  );
}

export default Login;
