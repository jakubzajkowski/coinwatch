import { useSelector } from "react-redux";
import styled from "styled-components";
import {ButtonSecondary} from "../components/styled.tsx";
import {RootState} from "../redux/store.ts";
import LiveAlerts from "../components/alert/LiveAlerts.tsx";
import HistoryAlerts from "../components/alert/HistoryAlerts.tsx";

const Container = styled.div`
    padding: 5rem 0.5rem 0 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`
const HeaderTitle = styled.h1`
    font-size: 2rem;
`

const HeaderDescription = styled.p`
    color: #b4b4b4;
    font-size: 1rem;
`
const Dashboard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;
    padding: 1rem;
    .item {
        border: 1px solid #fff;
        padding: 1rem;
    }
`
const MainPanel = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    .item {
        width: 100%;
        border: 1px solid #fff;
        padding: 1rem;
        height: 30vh;
    }
`
const SubPanel = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    .item {
        width: 100%;
        border: 1px solid #fff;
        padding: 1rem;
        height: 50vh;
    }
`

const Alerts = () =>{
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if(isAuthenticated){
        return <Container>
                <Header>
                    <div>
                        <HeaderTitle>Price Alerts</HeaderTitle>
                        <HeaderDescription>Get notified about significant price movements in real-time</HeaderDescription>
                    </div>
                    <div>
                        <ButtonSecondary>Configure Alerts</ButtonSecondary>
                    </div>
                </Header>
            <Dashboard>
                <MainPanel>
                    <LiveAlerts />
                    <HistoryAlerts />
                </MainPanel>
                <SubPanel>
                    <div className="item">Kolumna 30%</div>
                </SubPanel>
            </Dashboard>
        </Container>
    } else {
        return <Container>
            <h1>You don't have permission</h1>
        </Container>
    }
}

export default Alerts;