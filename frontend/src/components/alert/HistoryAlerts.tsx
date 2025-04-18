import {FC, useMemo, useState} from "react";
import HistoryAlertCard from "./HistoryAlertCard.tsx";
import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {GetAlertByUserIdQuery} from "../../graphql/generated.ts";
import {GET_ALERT_BY_USER_ID} from "../../apollo/queries.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import QueryBoundary from "../QueryBoundary.tsx";

export interface Alert {
    id: string; symbol: string; changePercent?: number | null | undefined; oldPrice?: number | null | undefined; newPrice?: number | null | undefined; createdAt?: string | null
}

const Container = styled.div`
    padding: 1rem;
    border: 1px solid rgb(255,255,255,0.4);
    border-radius: 0.5rem;
    overflow-y: scroll;
    height: 700px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SubTitle = styled.p`
  color: #999;
  margin-bottom: 1.5rem;
`;

const TabList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#333' : '#1f1f1f')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const CryptoAlertsComponent: FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'increase' | 'decrease'>('all')
    const { user } = useSelector((state: RootState) => state.auth)

    const {error,loading,data} = useQuery<GetAlertByUserIdQuery>(GET_ALERT_BY_USER_ID,{
        variables: { userId: user?.id }
    })

    const handleTabClick = (tab: 'all' | 'increase' | 'decrease') => {
        setActiveTab(tab)
    }

    const filteredAlerts = useMemo(() => {
        if (!data?.getAlertByUserId) return []

        return data.getAlertByUserId.filter((alert) => {
            switch (activeTab) {
                case 'increase':
                    return alert?.changePercent && alert.changePercent > 0
                case 'decrease':
                    return alert?.changePercent && alert.changePercent < 0
                default:
                    return true
            }
        })
    }, [data?.getAlertByUserId, activeTab])

    return (
        <Container>
            <Title>Alert History</Title>
            <SubTitle>Your recent price movement notifications</SubTitle>

            <TabList>
                <TabButton active={activeTab === 'all'} onClick={() => handleTabClick('all')}>All</TabButton>
                <TabButton active={activeTab === 'increase'} onClick={() => handleTabClick('increase')}>Price Increase</TabButton>
                <TabButton active={activeTab === 'decrease'} onClick={() => handleTabClick('decrease')}>Price Decrease</TabButton>
            </TabList>

            <QueryBoundary error={error} loading={loading}>
                {filteredAlerts?.slice().reverse().map((alert, i) => (
                    <HistoryAlertCard key={i} alert={alert} />
                ))}
            </QueryBoundary>

        </Container>
    );
};

export default CryptoAlertsComponent;