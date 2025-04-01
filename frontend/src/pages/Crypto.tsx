import {FC, use, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GetCryptoCurrencyByCryptoIdQuery} from "../graphql/generated.ts";
import {GET_CURRENCIES_BY_ID_FOR_CRYPTO} from "../apollo/queries.ts";
import BackToHome from "../components/BackToHome.tsx";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {theme} from "../theme/theme.ts";

const Container = styled.div`
    padding: 5rem 0.5rem 0 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0 0 0;
`
const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const CryptoImage = styled.img`
    width: 50px;
    height: 50px;
    margin: 0 1rem;
`
const NavigationPanel = styled.div`
    display: flex;
    width: 25%;
    justify-content: space-between;
    padding: 0.6rem;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.third };
    background-color: ${({ theme }) => theme.colors.fourth};
`
interface NavigationPanelOptionProps {
    color? : string
    backgroundColor? : string
}

const NavigationPanelOption = styled.div<NavigationPanelOptionProps>`
    cursor: pointer;
    padding: 0.8rem;
    border-radius: 0.4rem;
    color: ${({ color }) => color || "auto"};
    background-color: ${({ backgroundColor }) => backgroundColor || "auto"};
`
const CryptoMain = styled.div`
    padding: 1rem;
`

const Crypto : FC = () =>{
    const [panel,setPanel] = useState<string>("Overview");

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loading, error, data } = useQuery<GetCryptoCurrencyByCryptoIdQuery>(GET_CURRENCIES_BY_ID_FOR_CRYPTO,
        {
            variables: {cryptoId : id}
        }
        );

    if(error) navigate("/404")

    if(loading) return <div>Loading</div>

    return <Container>
        <BackToHome />
        <Header>
            <Logo>
                <CryptoImage src={data?.getCryptoCurrencyByCryptoId?.imageUrl as string}/>
                <div>
                    <h1>{data?.getCryptoCurrencyByCryptoId?.name}</h1>
                    <p>{data?.getCryptoCurrencyByCryptoId?.symbol.toUpperCase()}</p>
                </div>
            </Logo>
            <div>
                <h2>${data?.getCryptoCurrencyByCryptoId?.currentPrice}</h2>
                {(data?.getCryptoCurrencyByCryptoId?.priceChangePercentage24h as number)>0 ?
                    <p style={{textAlign:"right"}}>
                        <FaCaretUp color='green' />
                        {Math.abs(data?.getCryptoCurrencyByCryptoId?.priceChangePercentage24h as number)}%
                    </p>:
                    <p>
                        <FaCaretDown color='red' />
                        {Math.abs(data?.getCryptoCurrencyByCryptoId?.priceChangePercentage24h as number)}%
                    </p>
                }
            </div>
        </Header>
        <CryptoMain>
            <NavigationPanel>
                {["Overview","Markets","Historical Data","News"].map((title)=>
                    <NavigationPanelOption color={panel==title ? "white" : "auto"} backgroundColor={panel==title ? "#000000" : "auto"} onClick={()=>setPanel(title)} key={title}>{title}</NavigationPanelOption>
                )}
            </NavigationPanel>
        </CryptoMain>
    </Container>
}

export default Crypto;