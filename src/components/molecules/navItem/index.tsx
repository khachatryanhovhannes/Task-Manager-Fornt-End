import { Box, Stack, useColorModeValue } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";

interface INavItemProps {
    navItem: {
        label: string,
        href: string
    }
}


function NavItem({ navItem }: INavItemProps) {
    const { t } = useTranslation();
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('orange.600', 'orange.300')
    const navigate = useNavigate()


    const isActive = (path: string | undefined) => {
        return location.pathname === path ? true : false;
    };

    return (
            <Stack>
                <Box
                    as="a"
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={isActive(navItem.href) ? '#F28C28' : linkColor}
                    cursor={'pointer'}
                    _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                    }}
                    onClick={() => navigate(navItem.href ?? '#')}>
                    {t(`NAVIGATION.${navItem.label}`)}
                </Box>
            </Stack>
    )
}

export default NavItem