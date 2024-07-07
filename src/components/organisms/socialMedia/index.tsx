import { Flex, Text } from "@chakra-ui/react";
import { SocialMediaLink } from "../../";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
function SocialMedia() {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      align="center"
      mb={6}
      flex="1 1 300px"
      maxWidth="300px"
    >
      <Text fontWeight="bold" fontSize="lg">
        {t("FOOTER.BOX_THREE.TITLE")}
      </Text>
      <Flex mt={2}>
        <SocialMediaLink
          href="https://www.linkedin.com/in/hovhannes-khachatryan-bb6705249"
          icon={<FaLinkedin />}
          areaLabel="Linkedin"
        />
        <SocialMediaLink
          href="https://github.com/khachatryanhovhannes"
          icon={<FaGithub />}
          areaLabel="GitHub"
        />

        <SocialMediaLink
          href="https://www.facebook.com/profile.php?id=100011098380942"
          icon={<FaFacebook />}
          areaLabel="Facebook"
        />
      </Flex>
      <Text mt={4} fontSize="sm" textAlign={"center"}>
        {t("FOOTER.BOX_THREE.TEXT")}
      </Text>
    </Flex>
  );
}

export default SocialMedia;
