import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, ButtonField } from "../../";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../hooks";

interface UserNavItem {
  label: string;
  href: string;
}

const USER_NAV_ITEMS: Array<UserNavItem> = [
  {
    label: "USER_PAGE",
    href: "/user",
  },
  {
    label: "USER_TASKS",
    href: "/user/tasks/",
  },
];

function UserNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.user);

  return (
    <Flex
      direction={{ sm: "column", base: "column", md: "row" }}
      align={"stretch"}
    >
      <Flex
        bg={useColorModeValue("gray.300", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minW={"200px"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        alignItems={"baseline"}
        p={"10px"}
        direction={"column"}
      >
        <NavBar NAV_ITEMS={USER_NAV_ITEMS} directon="row" spacing={4} />
        <ButtonField
          type="button"
          fontSize="sm"
          fontWeight="600"
          bg="transparent"
          hoverBackground="gray.300"
          border="2px solid orange"
          cursor="pointer"
          onClick={() => {
            navigate("/user/tasks/add");
          }}
          text={t("NAVIGATION.ADD_TASK")}
        />
      </Flex>

      <Outlet context={{ user }} />
    </Flex>
  );
}

export default UserNav;
