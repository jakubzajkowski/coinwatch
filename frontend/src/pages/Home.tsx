import styled from "styled-components";
import {ButtonPrimary, InputCoinWatch, SearchInput} from "../components/styled.tsx";
import MarketOverview from "../components/MarketOverview.tsx";
import {useTranslation} from "react-i18next";


const Introduction = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background-color: ${props => props.theme.colors.secondary};
`
const StyledMarketOverview = styled.div`
    width: 100%;
    background-color: #151518;
    padding: 10rem 0 0 0;
    flex-direction: column;
    display: flex;
    align-items: center;
`
const Title = styled.h1`
    color: #ffffff;
    font-size: 4rem;
    margin: 1rem;
`;

const OverviewSubtitle = styled.h2`
    color: #ffffff;
    font-size: 2.5rem;
    text-align: center;
`;

const Description = styled.p`
    color: #b4b4b4;
    font-size: 1.5rem;
    text-align: center;
    width: 40%;
    @media (max-width: 950px) {
        width: 85%;
    }
`;
const FeaturesContainer = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: white;
    background-color: ${props => props.theme.colors.secondary};
`
const FeatureItem = styled.h1`
    width: 25%;
    @media (max-width: 950px) {
        width: 85%;
    }
`;
const FeatureTitle = styled.h1`
    color: #ffffff;
    font-size: 1.5rem;
`;
const FeatureDescription = styled.p`
    color: #b4b4b4;
    font-size: 1.1rem;
    width: 90%;
    margin: 0.5rem 0;
`;
const NewsLetterContainer = styled.div`
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    color: white;
    background-color: #151518;
`
const NewsLetterTitle = styled.h1`
    color: #ffffff;
    font-size: 3rem;
`;
const NewsLetterDescription = styled.p`
    color: #b4b4b4;
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
    margin: 0.5rem 0;
`;

const Home = () => {
    const { t } = useTranslation();

    return <main>
        <Introduction>
            <Title>{t("home.title")}</Title>
            <Description>{t("home.description")}</Description>
            <SearchInput type="text" placeholder={t("home.search_placeholder")}/>
        </Introduction>

        <StyledMarketOverview>
            <OverviewSubtitle>{t("home.overview_title")}</OverviewSubtitle>
            <Description>{t("home.overview_description")}</Description>
            <MarketOverview/>
        </StyledMarketOverview>

        <FeaturesContainer>
            <FeatureItem>
                <FeatureTitle>{t("home.features.realtime.title")}</FeatureTitle>
                <FeatureDescription>{t("home.features.realtime.desc")}</FeatureDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureTitle>{t("home.features.portfolio.title")}</FeatureTitle>
                <FeatureDescription>{t("home.features.portfolio.desc")}</FeatureDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureTitle>{t("home.features.insights.title")}</FeatureTitle>
                <FeatureDescription>{t("home.features.insights.desc")}</FeatureDescription>
            </FeatureItem>
        </FeaturesContainer>

        <NewsLetterContainer>
            <NewsLetterTitle>{t("home.newsletter.title")}</NewsLetterTitle>
            <NewsLetterDescription>{t("home.newsletter.desc")}</NewsLetterDescription>
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <InputCoinWatch width={"25%"} placeholder={t("home.newsletter.placeholder")}/>
                <ButtonPrimary>{t("home.newsletter.button")}</ButtonPrimary>
            </div>
        </NewsLetterContainer>
    </main>
}

export default Home;