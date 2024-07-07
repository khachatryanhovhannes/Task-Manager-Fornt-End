import { Container, Heading, Text, Box, Image, Link } from "@chakra-ui/react";
import companyTeamImage from "../../assets/images/companyTeam.jpg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks";

function AboutUs() {
  const { t } = useTranslation();

  const { isAuthenticated } = useAppSelector((state) => state.users);

  return (
    <Container maxW="3xl" textAlign={"justify"} centerContent>
      <Heading as="h1" size="2xl" textAlign="center" mt={8}>
        {t("ABOUT_US.TITLE")}
      </Heading>

      <Box mt={8}>
        <Text fontSize="lg">{t("ABOUT_US.TEXT_ONE")}</Text>
        <Text fontSize="lg" mt={4}>
          {t("ABOUT_US.TEXT_TWO")}
        </Text>

        <Image src={companyTeamImage} alt="Company Team" mt={8} />

        <Text fontSize="lg" mt={8}>
          {t("ABOUT_US.TEXT_THREE")}
        </Text>
        {!isAuthenticated ? (
          <Text fontSize="lg" mt={4}>
            {t("ABOUT_US.TEXT_FOUR.PART_ONE")}
            <Link color="blue.500" href="/signUp">
              {t("ABOUT_US.TEXT_FOUR.LINK")}
            </Link>

            {t("ABOUT_US.TEXT_FOUR.PART_TWO")}
          </Text>
        ) : null}
        <Text fontSize="lg" mt={8}>
          {t("ABOUT_US.TEXT_FIVE.PART_ONE")}
          <Link color="blue.500" href="/contact">
            {t("ABOUT_US.TEXT_FIVE.LINK")}
          </Link>

          {t("ABOUT_US.TEXT_FIVE.PART_TWO")}
        </Text>
      </Box>
    </Container>
  );
}

export default AboutUs;
