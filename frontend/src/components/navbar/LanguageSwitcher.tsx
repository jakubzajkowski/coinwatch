import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {FC, useState} from "react";

const LanguagePanel = styled.div`
    position: relative;
`;

const FlagButtonContainer = styled.div`
    position: absolute;
    top: 150%;
    right: -20%;
    width:60px;
    padding: 0.5rem;
    border: 1px solid rgb(255,255,255,0.3);
    border-radius: 0.5rem;
    background-color: ${({theme})=>theme.colors.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FlagButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    border-radius: 0.5rem;
`;

const Flag = styled.span`
    border-radius: 0.6rem;
`

const availableLanguages = ['en', 'pl', 'de'];

interface FlagComponentProps {
    flag: string
}

const FlagComponent: FC<FlagComponentProps> = ({flag}) => {
    if(flag=="en") return <Flag className="fi fi-gb"></Flag>

    else if(flag=="pl") return <Flag className="fi fi-pl"></Flag>

    else if(flag=="de") return <Flag className="fi fi-de"></Flag>

    else return <Flag className="fi fi-gb"></Flag>
}

const LanguageSwitcher: FC = () => {
    const {i18n} = useTranslation();
    const [isLanguageChange,setIsLanguageChange] = useState<boolean>(false)

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    console.log(i18n.languages)

    return (
        <LanguagePanel onClick={()=>setIsLanguageChange(state=>!state)}>
            <FlagButton>
                <FlagComponent flag={i18n.language}/>
            </FlagButton>
            {isLanguageChange &&
                <FlagButtonContainer>
                    {availableLanguages.map((lang)=>
                        <FlagButton onClick={() => changeLanguage(lang)}>
                            <FlagComponent flag={lang} />
                        </FlagButton>
                    )}
                </FlagButtonContainer>
            }
        </LanguagePanel>
    );
};

export default LanguageSwitcher;
