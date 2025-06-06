import styled from 'styled-components'
import {ButtonPrimary, ButtonSecondary, LinkCoinWatch} from "../styled.tsx";
import LanguageSwitcher from "./LanguageSwitcher.tsx";

const Nav = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    align-items: center;
    z-index: 10;
    padding: 0.4rem 0.1rem;
    top: 0;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.8);;
    border-bottom: 1px solid rgba(255,255,255, 0.5);
`

const Menu = styled.ul`
    display: flex;
    align-items: center;
    li{
        margin: 0 1rem;
        list-style: none;
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.95rem;
    }
`

const Logo = styled.h1`
    color: ${({ theme }) => theme.colors.primary} ;
`



const NavBar = () => {
    return <Nav>
        <div>
            <Logo>CoinWatch</Logo>
        </div>
        <div>
            <Menu>
                <li><LinkCoinWatch to="/">Home</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/cryptocurrencies">Cryptos</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/alerts">Alerts</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/">Market</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/">Portfolio</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/">News</LinkCoinWatch></li>
            </Menu>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
        <LanguageSwitcher />
            <ButtonSecondary><LinkCoinWatch to={"/sign-in"}>Sign In</LinkCoinWatch></ButtonSecondary>
            <ButtonPrimary><LinkCoinWatch color={"black"} to={"/sign-up"}>Get Started</LinkCoinWatch></ButtonPrimary>
        </div>
    </Nav>
}


export default NavBar;