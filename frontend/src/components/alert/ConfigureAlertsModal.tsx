import styled from "styled-components";
import {Dispatch, FC, useState} from "react";
import {ButtonPrimary} from "../styled.tsx";

interface ConfigureAlertsModalProps {
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(6px);
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const ModalWrapper = styled.div`
    background-color: #151518;
    color: white;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    max-width: 90vw;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
`;

const ModalTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 12px;
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

const Tab = styled.button<{ active?: boolean }>`
    flex: 1;
    padding: 10px;
    background: ${({ active }) => (active ? "white" : "#000000")};
    color: ${({ active }) => (active ? "black" : "#888")};
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
`;

const SubscribedList = styled.div`
    margin-bottom: 20px;
    line-height: 1.6;
`;

const InputRow = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #444;
    background: #2b2b3d;
    color: white;
`;

const AddButton = styled.button`
    padding: 8px 16px;
    border: none;
    background: white;
    color: black;
    border-radius: 0 0.3rem 0.3rem 0;
    cursor: pointer;
    font-weight: bold;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const ConfigureAlertsModal: FC<ConfigureAlertsModalProps> = ({setIsOpen}) => {
    const [activeTab, setActiveTab] = useState<"thresholds" | "coins" | "notifications">("coins");
    const [customSymbol, setCustomSymbol] = useState("");
    const [subscribedCoins, setSubscribedCoins] = useState<string[]>([
        "Bitcoin (BTC)",
        "Ethereum (ETH)",
        "Solana (SOL)",
        "Binance Coin (BNB)",
        "Cardano (ADA)",
        "XRP (XRP)",
    ]);

    const handleAddSymbol = () => {
        if (customSymbol.trim()) {
            setSubscribedCoins([...subscribedCoins, customSymbol.trim()]);
            setCustomSymbol("");
        }
    };

    return (
        <Overlay>
            <ModalWrapper>
                <ModalTitle>Configure Price Alerts</ModalTitle>
                <p style={{ marginBottom: "16px", fontSize: "14px", color: "#aaa" }}>
                    Customize how and when you receive price movement notifications. Our system checks for price changes greater than 1% within a 10-minute window by default.
                </p>

                <Tabs>
                    <Tab active={activeTab === "thresholds"} onClick={() => setActiveTab("thresholds")}>Thresholds</Tab>
                    <Tab active={activeTab === "coins"} onClick={() => setActiveTab("coins")}>Coins</Tab>
                    <Tab active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")}>Notifications</Tab>
                </Tabs>

                {activeTab === "coins" && (
                    <>
                        <SubscribedList>
                            <strong>Subscribed Cryptocurrencies:</strong>
                            <ul>
                                {subscribedCoins.map((coin, index) => (
                                    <p key={index}> {coin}</p>
                                ))}
                            </ul>
                        </SubscribedList>

                        <InputRow>
                            <Input
                                type="text"
                                placeholder="Enter symbol (e.g., LINK)"
                                value={customSymbol}
                                onChange={(e) => setCustomSymbol(e.target.value)}
                            />
                            <AddButton onClick={handleAddSymbol}>Add</AddButton>
                        </InputRow>
                    </>
                )}

                <ActionButtons>
                    <ButtonPrimary onClick={()=>setIsOpen(state=>!state)}>Cancel</ButtonPrimary>
                    <ButtonPrimary>Save Changes</ButtonPrimary>
                </ActionButtons>
            </ModalWrapper>
        </Overlay>
    );
};

export default ConfigureAlertsModal;