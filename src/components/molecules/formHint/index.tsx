import { Text } from "@chakra-ui/react"
import { LinkField } from '../../';

interface IFormHintProps {
    text: string,
    linkText: string,
    link: string,
}

function FormHint({ text, linkText, link }: IFormHintProps) {
    return (
        <Text align={'center'}>{text}
            <LinkField text={linkText} link={link} />
        </Text>

    )
}

export default FormHint