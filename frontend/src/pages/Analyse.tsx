import styled from "styled-components";
import AnalyseGraph from "../components/analyse/AnalyseGraph";
import TrendingCoins from "../components/analyse/TrendingCoins";

const Header = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
`;

const SubTitle = styled.h2`
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.colors.third};
    margin-bottom: 2rem;
`;

const PanelsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Container = styled.div`
    padding: 5rem 1rem 1rem 1rem;
    width: 100%;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.secondary};
`;

const Analyse = () => {
    return (
        <Container>
            <Header>Crypto Analysis Dashboard</Header>
            <SubTitle>Advanced cryptocurrency analysis and AI-powered insights</SubTitle>
            <PanelsContainer>
                <AnalyseGraph />
                <TrendingCoins />
            </PanelsContainer>
        </Container>
    );
};

export default Analyse;
