import { Box, Stack, Image, Flex, Text } from "@chakra-ui/react";
import homPageImage from "../../assets/images/multiTasking.png";
import { ButtonField } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { clearIsRegister } from "../../redux/features/userSlice";

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearIsRegister());
  }, []);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems={"center"}
      justifyContent="space-around"
      px={"auto"}
      p={{ base: "5px", md: "10px" }}
    >
      <Stack
        maxW={
          i18n.language === "en"
            ? { base: "100%", md: "40%" }
            : { base: "100%", md: "70%" }
        }
        textAlign={"center"}
        mb={{ base: 8, md: 0 }}
      >
        <Text
          fontSize={
            i18n.language === "en"
              ? { base: "40px", md: "60px" }
              : { base: "30px", md: "50px" }
          }
        >
          {t("MAIN.MAIN_TEXT")}
          <Box as="span" color={"orange"}>
            {t("MAIN.MAIN_TEXT_ORANGE")}
          </Box>
        </Text>
        <Text fontSize={{ base: "16px", md: "20px" }} mt={4}>
          {t("MAIN.SUB_TEXT")}
        </Text>
        {!user ? (
          <Flex gap={"20px"} mt={"20px"} justify={"center"}>
            <ButtonField
              type="button"
              fontSize="sm"
              fontWeight="600"
              border="2px solid white"
              bg="orange"
              hoverBackground="gray.300"
              cursor="pointer"
              onClick={() => navigate("/signIn")}
              text={t("MAIN.SIGN_IN")}
            />
            <ButtonField
              type="button"
              fontSize="sm"
              fontWeight="600"
              bg="transparent"
              hoverBackground="gray.300"
              border="2px solid orange"
              cursor="pointer"
              onClick={() => navigate("/signUp")}
              text={t("MAIN.SIGN_UP")}
            />
          </Flex>
        ) : null}
      </Stack>
      <Box maxW={{ base: "100%", md: "30%" }}>
        <Image src={homPageImage} />
      </Box>
    </Flex>
  );
}

export default Home;
