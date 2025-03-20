import styled from "styled-components";
import BackToHome from "../components/BackToHome.tsx";
import {InputCoinWatch, LabelCoinWatch} from "../components/styled.tsx";
import {SelectCoinWatch} from "../components/styled.tsx";

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 5rem 0 0 0;
    background-color: ${({ theme }) => theme.colors.secondary};
`
const Form = styled.form`
    width: 50%;
`
const Header = styled.div`
    width: 60%;
`
const Title = styled.h1`
    color: #ffffff;
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;

const Description = styled.p`
    color: #b4b4b4;
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
    @media (max-width: 950px) {
        width: 85%;
    }
`;

const FormSection = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    gap: 3rem;
`

const FormTitle = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    margin: 2rem 0 0 0;
`

const SignUp = () =>{
    return (<Container>
        <Header>
            <BackToHome />
            <Title>Create Your Account</Title>
            <Description>Join CoinWatch to track your crypto portfolio and stay updated with the market</Description>
        </Header>
        <Form>
            <FormTitle>Personal Information</FormTitle>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">First name</LabelCoinWatch>
                        <InputCoinWatch margin="0.5rem 0" width="100%" placeholder="John"/>
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Email</LabelCoinWatch>
                        <InputCoinWatch margin="0.5rem 0" width="100%" placeholder="john@email.com"/>
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Date of birth</LabelCoinWatch>
                        <InputCoinWatch type="date" margin="0.5rem 0" width="100%"/>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Last name</LabelCoinWatch>
                        <InputCoinWatch margin="0.5rem 0" width="100%" placeholder="Doe"/>
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Phone number (optional)</LabelCoinWatch>
                        <InputCoinWatch margin="0.5rem 0" width="100%" placeholder="+1 (555) 000-0000"/>
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Country</LabelCoinWatch>
                        <SelectCoinWatch items={["Poland","USA","Germany"]} defaultValue="Select country" margin="0.5rem 0" width="100%"/>
                    </div>
                </div>
            </FormSection>
            <FormTitle>Account Security</FormTitle>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Password</LabelCoinWatch>
                        <InputCoinWatch type="password" margin="0.5rem 0" width="100%"/>
                        <p style={{color: "#b4b4b4",fontSize: '0.8rem'}}>
                            Must be at least 8 characters with a number and a special character
                        </p>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Confirm password</LabelCoinWatch>
                        <InputCoinWatch margin="0.5rem 0" type="password" width="100%"/>
                    </div>
                </div>
            </FormSection>
            <FormTitle>Preferences</FormTitle>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Password</LabelCoinWatch>
                        <InputCoinWatch type="password" margin="0.5rem 0" width="100%"/>
                        <p style={{color: "#b4b4b4",fontSize: '0.8rem'}}>
                            Must be at least 8 characters with a number and a special character
                        </p>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Confirm password</LabelCoinWatch>
                        <InputCoinWatch margin="0.5rem 0" type="password" width="100%"/>
                    </div>
                </div>
            </FormSection>
        </Form>
    </Container>)
}

export default SignUp;