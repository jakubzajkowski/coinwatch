import styled from "styled-components";
import {FaCaretDown, FaCaretUp, FaChartBar} from "react-icons/fa";

interface Alert {
    name: string;
    type: "increase" | "decrease" | "volume";
    change: string;
    price: string;
    date: string;
}

interface HistoryAlertCardProps {
    alert : Alert;
}

const Card = styled.div`
  background: #1f1f1f;
  padding: 1rem;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AlertText = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlertName = styled.div`
  font-weight: 600;
`;

const AlertDesc = styled.div`
  font-size: 0.875rem;
  color: #ccc;
`;

const AlertPrice = styled.div`
  text-align: right;
`;

const PriceValue = styled.div`
  font-weight: 600;
`;

const PriceDate = styled.div`
  font-size: 0.75rem;
  color: #aaa;
`;

const AlertIcon: React.FC<{ type: Alert["type"] }> = ({ type }) => {
    switch (type) {
        case "increase":
            return <FaCaretUp color='green' />;
        case "decrease":
            return <FaCaretDown color='red' />;
        case "volume":
            return <FaChartBar color="blue" />;
        default:
            return null;
    }
};

const HistoryAlertCard: React.FC<HistoryAlertCardProps> = ({ alert }) => (
    <Card>
        <CardContent>
            <AlertIcon type={alert.type} />
            <AlertText>
                <AlertName>{alert.name}</AlertName>
                <AlertDesc>
                    {alert.type === "increase" && `Price increased by ${alert.change}`}
                    {alert.type === "decrease" && `Price decreased by ${alert.change}`}
                    {alert.type === "volume" && `Volume spiked by ${alert.change}`}
                </AlertDesc>
            </AlertText>
        </CardContent>
        <AlertPrice>
            <PriceValue>{alert.price}</PriceValue>
            <PriceDate>{alert.date}</PriceDate>
        </AlertPrice>
    </Card>
);

export default HistoryAlertCard;