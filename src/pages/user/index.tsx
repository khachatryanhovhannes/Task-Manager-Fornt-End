import { Box, Flex, Heading, Img, Text, Button } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import userImage from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { formatDateString } from "../../helpers";
import { useTranslation } from "react-i18next";

function User() {
  const { user } = useAppSelector((state) => state.users);
  const { t } = useTranslation();

  return user ? (
    <Box
      w={"100%"}
      textAlign="center"
      p={8}
      minH={"700px"}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={4} color="teal.500">
        {user.firstName} {user.lastName}
      </Heading>
      <Flex alignItems={"center"} justify={"center"} gap={"30px"}>
        <Img
          src={userImage}
          maxW={"200px"}
          border={"3px solid black"}
          borderRadius={"full"}
          bg={"white"}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <Box textAlign={"left"}>
          <Text fontSize="lg">
            {t("USER.EMAIL")}: {user.email}
          </Text>
          <Text fontSize="lg">
            {t("USER.FIRST_NAME")}: {user.firstName}
          </Text>
          <Text fontSize="lg">
            {t("USER.LAST_NAME")}: {user.lastName}
          </Text>
          <Text fontSize="lg">
            {t("USER.ROLE")}: {user.role}
          </Text>
          <Text fontSize="lg">
            {t("USER.CREATED")}: {formatDateString(user.createdAt)}
          </Text>
          <Text fontSize="lg">
            {t("USER.UPDATED")}: {formatDateString(user.updatedAt)}
          </Text>
        </Box>
      </Flex>
      <Link to="/user/setting">
        <Button colorScheme="teal" mt={10}>
          {t("USER.SETTINGS")}
        </Button>
      </Link>
    </Box>
  ) : (
    <Box textAlign="center" fontSize="xl" mt={8} color="gray.500">
      User not found
    </Box>
  );
}

export default User;
