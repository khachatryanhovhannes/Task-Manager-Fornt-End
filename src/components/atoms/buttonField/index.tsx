import { Button } from "@chakra-ui/react"

interface IButtonFieldProps {
    type: "button" | "submit" | "reset" | undefined,
    fontSize: string,
    fontWeight: string,
    border: string,
    bg: string,
    cursor: string,
    onClick: () => void,
    text: string,
    hoverBackground?: string
    display?: {}
}

function ButtonField({ type, fontSize, fontWeight, border, bg, hoverBackground, cursor, onClick, text, display }: IButtonFieldProps) {
    return (
        <Button
            type={type}
            fontSize={fontSize}
            fontWeight={fontWeight}
            border={border}
            bg={bg}
            cursor={cursor}
            onClick={onClick}
            _hover={{
                bg: hoverBackground,
            }}
            display={display}
        >
            {text}
        </Button>
    )
}

export default ButtonField