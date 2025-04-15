import styled from "styled-components";
import {Dispatch, FC, useState} from "react";
import {ButtonPrimary} from "../styled.tsx";
import SubscribedCryptoCurrencies from "./SubscribedCryptoCurrencies.tsx";
import {useQuery} from "@apollo/client";
import {SEARCH_CRYPTO_CURRENCIES_BY_CRYPTO_ID} from "../../apollo/queries.ts";
import {SearchCryptoCurrencyByCryptoIdQuery} from "../../graphql/generated.ts";
import SearchedCryptoCurrenciesCard from "./SearchedCryptoCurrenciesCard.tsx";

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
    width: 500px;
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

const SearchedCryptoCurrenciesContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow-y: scroll;
    gap: 1rem;
    margin: 1rem 0;
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
    const [activeTab, setActiveTab] = useState<"subscriptions" | "coins">("coins");
    const [cryptoId, setCryptoId] = useState("");

    const { loading, data, refetch } = useQuery<SearchCryptoCurrencyByCryptoIdQuery>(SEARCH_CRYPTO_CURRENCIES_BY_CRYPTO_ID, {
        variables: {cryptoId: ""}
    });

    const handleSearch = () => {
        refetch({cryptoId: cryptoId})
    };

    return (
        <Overlay>
            <ModalWrapper>
                <ModalTitle>Configure Price Alerts</ModalTitle>
                <p style={{ marginBottom: "16px", fontSize: "14px", color: "#aaa" }}>
                    Customize how and when you receive price movement notifications. Our system checks for price changes greater than specific % within a 3 to 10 minutes windows by default.
                </p>

                <Tabs>
                    <Tab active={activeTab === "subscriptions"} onClick={() => setActiveTab("subscriptions")}>Subscriptions</Tab>
                    <Tab active={activeTab === "coins"} onClick={() => setActiveTab("coins")}>Coins</Tab>
                </Tabs>

                {activeTab === "subscriptions" && <SubscribedCryptoCurrencies />}

                {activeTab === "coins" && (
                    <>
                        <InputRow>
                            <Input
                                type="text"
                                placeholder="Enter cryptoId (e.g., LINK)"
                                value={cryptoId}
                                onChange={(e) => setCryptoId(e.target.value)}
                            />
                            <AddButton onClick={handleSearch}>Search</AddButton>
                        </InputRow>
                        {loading ? <div>Loading...</div> : <SearchedCryptoCurrenciesContainer>
                            {data?.searchCryptoCurrencyByCryptoId && data.searchCryptoCurrencyByCryptoId.map((crypto) =>
                                <SearchedCryptoCurrenciesCard cryptoId={crypto?.cryptoId as string} id={crypto?.id as string} image={crypto?.imageUrl as string}/>
                            )}
                        </SearchedCryptoCurrenciesContainer>}
                    </>
                )}

                <ActionButtons>
                    <ButtonPrimary onClick={()=>setIsOpen(state=>!state)}>Cancel</ButtonPrimary>
                </ActionButtons>
            </ModalWrapper>
        </Overlay>
    );
};

export default ConfigureAlertsModal;