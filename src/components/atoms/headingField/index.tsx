import { Heading } from "@chakra-ui/react"


interface IHeadingProps {
    text: string,
}


function HeadingField({ text }: IHeadingProps) {
    return (
        <Heading fontSize={'4xl'} textAlign={'center'}>{text}</Heading>
    )
}

export default HeadingField

