import { Button } from "@chakra-ui/react"

interface IFormButtonProps {
    text: string,
}


function FormButton({ text }: IFormButtonProps) {
    return (
        <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{
                bg: 'blue.500',
            }}>
            {text}
        </Button>
    )
}


export default FormButton