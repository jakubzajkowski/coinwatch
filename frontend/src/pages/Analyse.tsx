import styled from "styled-components";
import AnalyseGraph from "../components/analyse/AnalyseGraph";

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.secondary};
`;

const Analyse = () => {
    return (
        <Container>
            <AnalyseGraph />
        </Container>
    );
};

export default Analyse;
