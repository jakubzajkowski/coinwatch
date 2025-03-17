import styled from "styled-components";

const FooterMenu = styled.ul`
    display: flex;
    justify-content: center;
    gap: 1rem;
    li {
        list-style: none;
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 10vh;
    padding: 0.2rem;
    background-color: ${props => props.theme.colors.secondary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    color: #b4b4b4 !important;
    
    @media (max-width: 950px) {
        height: 20vh;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
    }
`

const Footer = () => {
    return <FooterContainer>
        <p>© 2025 CoinWatch. All rights reserved.</p>
        <FooterMenu>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Contact</li>
        </FooterMenu>
    </FooterContainer>
}

export default Footer;

