import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function CopyRights() {
  const { t } = useTranslation();

  return (
    <Box textAlign="center" m={"10px"}>
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()}
        {t("FOOTER.TEXT")}
      </Text>
    </Box>
  );
}

export default CopyRights;
