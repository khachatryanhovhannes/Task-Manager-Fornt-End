import { Stack, useColorModeValue } from "@chakra-ui/react";
import { NavItem } from "../../";

interface iNavBarProps {
    NAV_ITEMS: {
        label: string
        href: string
    }[],
    directon: "column" | "row",
    spacing?: number,
    p?: number,
    display?: {}
}

function NavBar({ NAV_ITEMS, directon, spacing, p, display }: iNavBarProps) {
    return (
        <Stack
            direction={directon}
            spacing={spacing}
            p={p}
            display={display}
            bg={useColorModeValue('gray.300', 'gray.800')}>

            {NAV_ITEMS.map((navItem) => (
                <NavItem navItem={navItem} key={navItem.label} />

            ))}
        </Stack>
    )
}

export default NavBar