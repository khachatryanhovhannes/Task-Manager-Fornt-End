import {
  Box,
  Flex,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ButtonField,
  ColorModeButton,
  LanguageChangeButton,
  Logo,
  NavBar,
  NavItem,
} from "../../";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../redux/features/userSlice";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "ABOUT",
    href: "/aboutUs",
  },
  {
    label: "CONTACT",
    href: "/contact",
  },
  {
    label: "PRIVARY",
    href: "/privacyPolicy",
  },
];

function Navigation() {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated
  );

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/signIn");
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("gray.300", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <IconButton
          ml={{ base: -2 }}
          display={{ base: "flex", lg: "none" }}
          onClick={onToggle}
          icon={
            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
          }
          variant={"ghost"}
          aria-label={"Toggle Navigation"}
        />

        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          <Logo />

          <NavBar
            NAV_ITEMS={NAV_ITEMS}
            directon="row"
            spacing={4}
            display={{ base: "none", lg: "flex" }}
          />
        </Flex>
        {!isAuthenticated ? (
          location.pathname !== "/signIn" &&
          location.pathname !== "/signUp" &&
          location.pathname !== "/" &&
          !user ? (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
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
                display={{ base: "none", md: "inline-flex" }}
              />
            </Stack>
          ) : null
        ) : (
          <ButtonField
            type="button"
            fontSize="sm"
            fontWeight="600"
            bg="transparent"
            hoverBackground="gray.300"
            border="2px solid orange"
            cursor="pointer"
            onClick={handleLogOut}
            text={t("NAVIGATION.LOG_OUT")}
          />
        )}

        <LanguageChangeButton />
        <ColorModeButton />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <NavBar
          NAV_ITEMS={NAV_ITEMS}
          directon="column"
          p={4}
          display={{ lg: "none" }}
        />
      </Collapse>
      <Outlet />
    </Box>
  );
}

export default Navigation;
