import styled from "styled-components";
import {SearchInput} from "../components/styled.ts";
import MarketOverview from "../components/MarketOverview.tsx";


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
    gap: 1rem;
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

const Home = () =>{

    return <main>
        <Introduction>
            <Title >
                Track Crypto in Real-Time
            </Title>
            <Description>
                Monitor cryptocurrency prices, market caps, and trends with precision and simplicity.
            </Description>
            <SearchInput type="text" placeholder="Search for a cryptocurrency..." />
        </Introduction>
        <StyledMarketOverview>
            <OverviewSubtitle>Market Overview</OverviewSubtitle>
            <Description>Real-time data for the top cryptocurrencies by market capitalization.</Description>
            <MarketOverview />
        </StyledMarketOverview>
        <FeaturesContainer>
            <FeatureItem>
                <FeatureTitle>Real-Time Data</FeatureTitle>
                <FeatureDescription>Access up-to-the-minute cryptocurrency prices and market data from multiple exchanges.</FeatureDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureTitle>Portfolio Tracking</FeatureTitle>
                <FeatureDescription>Monitor your investments with our intuitive portfolio management tools.</FeatureDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureTitle>Market Insights</FeatureTitle>
                <FeatureDescription>Get detailed analytics and insights to make informed investment decisions.</FeatureDescription>
            </FeatureItem>
        </FeaturesContainer>
    </main>
}

export default Home;