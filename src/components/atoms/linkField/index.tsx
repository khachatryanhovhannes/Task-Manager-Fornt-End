import { Link } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

interface ILinkFieldProps {
    text: string,
    link: string
}

function LinkField({ text, link }: ILinkFieldProps) {
    const navigate = useNavigate()

    return (
        <Link color={'blue.400'} onClick={() => navigate(`${link}`)}> {text}</Link>
    )
}

export default LinkField