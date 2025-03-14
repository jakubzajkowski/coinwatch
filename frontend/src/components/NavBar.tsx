import styled from 'styled-components'
import {ButtonPrimary, ButtonSecondary, LinkCoinWatch} from "./styled.ts";

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
    background-color: rgba(0, 0, 0, 0.92);;
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
                <li><LinkCoinWatch to="/">Markets</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/">Portfolio</LinkCoinWatch></li>
                <li><LinkCoinWatch to="/">News</LinkCoinWatch></li>
            </Menu>
        </div>
        <div>
            <ButtonSecondary>Sign In</ButtonSecondary>
            <ButtonPrimary>Get Started</ButtonPrimary>
        </div>
    </Nav>
}


export default NavBar;