import { Container, Heading, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <Container maxW="3xl" textAlign={"justify"} centerContent>
      <Heading as="h1" size="2xl" textAlign="center" mt={8}>
        {t("PRIVACY_POLICY.TITLE")}
      </Heading>

      <Box mt={8}>
        <Text fontSize="lg">{t("PRIVACY_POLICY.TEXT_ONE")}</Text>

        <Text fontSize="lg" mt={4}>
          {t("PRIVACY_POLICY.TEXT_TWO")}
        </Text>

        <Text fontSize="lg" mt={4}>
          {t("PRIVACY_POLICY.TEXT_THREE")}
        </Text>

        <Text fontSize="lg" mt={4}>
          {t("PRIVACY_POLICY.TEXT_FOUR")}
        </Text>

        <Text fontSize="lg" mt={4}>
          {t("PRIVACY_POLICY.TEXT_FIVE")}
        </Text>

        <Text fontSize="lg" mt={4}>
          {t("PRIVACY_POLICY.TEXT_SIX")}
        </Text>
      </Box>
    </Container>
  );
}

export default PrivacyPolicy;
