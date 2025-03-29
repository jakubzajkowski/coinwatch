import {FC} from "react";
import BackToHome from "../components/BackToHome.tsx";
import styled from "styled-components";
import {ButtonPrimary, ButtonSecondary, InputCoinWatch, LabelCoinWatch} from "../components/styled.tsx";

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 90vh;
    width: 100%;
    padding: 5rem 0 0 0;
    background-color: ${({ theme }) => theme.colors.secondary};
`

const Header = styled.header`
    width: 25%;
    margin: 1rem;
`
const Title = styled.h1`
    color: #ffffff;
    font-size: 2rem;
    margin: 3rem 0 1rem 0;
    text-align: center;
`
const Description = styled.p`
    color: #b4b4b4;
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
`
const Form = styled.form`
    width: 25%;
    @media (max-width: 950px) {
        width: 95%;
    }
`
const OauthButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
`

const SignIn : FC = () =>{
    return <Container>
        <Header>
            <BackToHome />
            <div>
                <Title>Welcome Back</Title>
                <Description>Sign in to your CoinWatch account</Description>
            </div>
        </Header>
        <Form>
            <div style={{width: '100%', margin: '1rem 0rem'}}>
                <LabelCoinWatch htmlFor="email">Email</LabelCoinWatch>
                <InputCoinWatch name="email" margin="0.5rem 0" width="100%" placeholder="john@email.com"/>
            </div>
            <div style={{width: '100%', margin: '1rem 0rem'}}>
                <LabelCoinWatch htmlFor="email">Password</LabelCoinWatch>
                <InputCoinWatch name="password" type="password" margin="0.5rem 0" width="100%"/>
                <p style={{color: "#b4b4b4", fontSize: '0.8rem', textAlign: "right"}}>
                    Forgot your password?
                </p>
            </div>
            <ButtonPrimary width={"100%"}>Sign In</ButtonPrimary>
            <p style={{color: "#b4b4b4", fontSize: '0.8rem', textAlign: "center", margin: "0.5rem"}}>
                OR CONTINUE WITH
            </p>
            <OauthButtonsContainer>
                <ButtonSecondary width={"100%"}>Google</ButtonSecondary>
                <ButtonSecondary width={"100%"}>Apple</ButtonSecondary>
            </OauthButtonsContainer>
            <p style={{color: "white", margin: "2rem 0"}}>Don't have an account? <a href="#">Create an account</a></p>
        </Form>
    </Container>
}

export default SignIn;