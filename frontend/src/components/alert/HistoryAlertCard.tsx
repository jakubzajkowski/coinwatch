import styled from "styled-components";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {FC} from "react";
import {Alert} from "./HistoryAlerts.tsx";
import formatDateTime from "../../utils/formatDateTime.ts";

interface HistoryAlertCardProps {
    alert : Alert | null;
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

const AlertIcon: FC<{ type: Alert["changePercent"] | null}> = ({ type }) => {
        if (type as number>0) return <FaCaretUp color='green' />
        else return <FaCaretDown color='red' />;
};

const HistoryAlertCard: FC<HistoryAlertCardProps> = ({ alert }) => (
    <Card>
        <CardContent>
            <AlertIcon type={alert?.changePercent as number} />
            <AlertText>
                <AlertName>{alert?.symbol}</AlertName>
                <AlertDesc>
                    {(alert?.changePercent as number)<0 ?
                        <div>
                            Price decreased by {Math.abs(alert?.changePercent as number)}%
                        </div>:
                        <div>
                            Price increased by {Math.abs(alert?.changePercent as number)}%
                        </div>}
                </AlertDesc>
            </AlertText>
        </CardContent>
        <AlertPrice>
            <PriceValue>${alert?.newPrice}</PriceValue>
            <PriceDate>{formatDateTime(alert?.createdAt as string)}</PriceDate>
        </AlertPrice>
    </Card>
);

export default HistoryAlertCard;