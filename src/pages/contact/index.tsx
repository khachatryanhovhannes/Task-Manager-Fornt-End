import { Container, Heading, Text, Link, Box } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const { isAuthenticated } = useAppSelector((state) => state.users);

  return (
    <Container maxW="3xl" textAlign={"justify"} centerContent>
      <Heading as="h1" size="2xl" textAlign="center" mt={8}>
        {t("CONTACT_US.TITLE")}
      </Heading>

      <Box mt={8}>
        <Text fontSize="lg">{t("CONTACT_US.TEXT_ONE")}</Text>

        <Text fontSize="lg" mt={4}>
          {t("CONTACT_US.TEXT_TWO")}
          <Link color="blue.500" href="mailto:khachatryanhovhannes02@gmail.com">
            khachatryanhovhannes02@gmail.com
          </Link>
          .
        </Text>

        <Text fontSize="lg" mt={4}>
          {t("CONTACT_US.TEXT_THREE")}
          <Link color="blue.500" href="mailto:hovk321@gmail.com">
            hovk321@gmail.com
          </Link>
          .
        </Text>

        <Text fontSize="lg" mt={8}>
          {t("CONTACT_US.TEXT_FOUR.PART_ONE")}
          <Link
            color="blue.500"
            href="https://www.linkedin.com/in/hovhannes-khachatryan-bb6705249"
            target="_blank"
          >
            Linkedin
          </Link>
          {t("CONTACT_US.TEXT_FOUR.PART_TWO")}
          <Link
            color="blue.500"
            href="https://www.facebook.com/profile.php?id=100011098380942"
            target="_blank"
          >
            Facebook
          </Link>
          {t("CONTACT_US.TEXT_FOUR.PART_THREE")}
          <Link
            color="blue.500"
            href="https://www.instagram.com/hovhannes_khachatrian"
            target="_blank"
          >
            Instagram
          </Link>
          {t("CONTACT_US.TEXT_FOUR.PART_FOUR")}
        </Text>
        {!isAuthenticated ? (
          <Text fontSize="lg" mt={4}>
            {t("CONTACT_US.TEXT_FIVE.PART_ONE")}
            <Link color="blue.500" href="/signup">
              {t("CONTACT_US.TEXT_FIVE.LINK")}
            </Link>
          </Text>
        ) : null}
        <Text fontSize="lg" mt={8}>
          {t("CONTACT_US.TEXT_SIX")}
        </Text>
      </Box>
    </Container>
  );
}

export default Contact;
