import { useTranslation } from "react-i18next"
import armenianFlag from "../../../assets/images/armenianFlag.png"
import englishFlag from "../../../assets/images/englishFlag.png"
import { Image } from "@chakra-ui/react"

function LanguagChangeButton() {
    const { i18n } = useTranslation()

    const handleLanguageChange = () => {
        if(i18n.language === 'en'){
            i18n.changeLanguage('hy')
        }
        else{
            i18n.changeLanguage('en')
        }
    }

    return (
        <Image w={'35px'} 
            cursor={'pointer'}
            ml={'10px'}
            onClick={handleLanguageChange}
            src={i18n.language === 'en' ? armenianFlag : englishFlag} />
    )
}

export default LanguagChangeButton