import { Button } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

interface IShowPasswordIconProps {
    isShowPassword: boolean,
    setIsShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

function ShowPasswordIcon({ isShowPassword, setIsShowPassword }: IShowPasswordIconProps) {
    return (
        <Button
            variant={'ghost'}
            onClick={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <ViewOffIcon /> : <ViewIcon />}
        </Button>
    )
}

export default ShowPasswordIcon