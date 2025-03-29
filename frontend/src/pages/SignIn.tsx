import React, {FC, useState} from "react";
import BackToHome from "../components/BackToHome.tsx";
import styled from "styled-components";
import {ButtonPrimary, ButtonSecondary, FormError, InputCoinWatch, LabelCoinWatch} from "../components/styled.tsx";
import AuthService from "../api/AuthService.ts";
import {AxiosError} from "axios";

export interface FormLoginDataType {
    email: string;
    password: string;
}

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
    @media (max-width: 950px) {
        width: 95%;
    }
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
    const [userData,setUserData] = useState<FormLoginDataType>({email: "", password: ""})
    const [error,setError] = useState<string | Record<keyof FormLoginDataType, string>>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try{
            const {data} = await AuthService.login(userData);
            console.log(data)
        }catch (e:unknown){
            if (e instanceof AxiosError) {
                if(e.response) {
                    const serverError = e.response.data;
                    console.log(serverError)
                    setError(serverError)
                }
            }
        }
    }

    return <Container>
        <Header>
            <BackToHome />
            <div>
                <Title>Welcome Back</Title>
                <Description>Sign in to your CoinWatch account</Description>
            </div>
        </Header>
        <Form onSubmit={handleSubmit}>
            <div style={{width: '100%', margin: '1rem 0rem'}}>
                <LabelCoinWatch htmlFor="email">Email</LabelCoinWatch>
                <InputCoinWatch name="email" onChange={handleChange} margin="0.5rem 0" width="100%" placeholder="john@email.com"/>
                {error && <FormError>{typeof error !== "string" ? error?.email : ""}</FormError>}
            </div>
            <div style={{width: '100%', margin: '1rem 0rem'}}>
                <LabelCoinWatch htmlFor="email">Password</LabelCoinWatch>
                <InputCoinWatch onChange={handleChange} name="password" type="password" margin="0.5rem 0" width="100%"/>
                {error && <FormError>{typeof error !== "string" ? error?.password : ""}</FormError>}
                <p style={{color: "#b4b4b4", fontSize: '0.8rem', textAlign: "right"}}>
                    Forgot your password?
                </p>
            </div>
            {typeof error === "string" && <FormError>{error}!</FormError>}
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