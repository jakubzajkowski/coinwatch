import styled from "styled-components";
import BackToHome from "../components/BackToHome.tsx";
import {ButtonPrimary, FormError, InputCoinWatch, LabelCoinWatch, RadioCoinWatch} from "../components/styled.tsx";
import {SelectCoinWatch} from "../components/styled.tsx";
import {RadioGroup} from "@mui/material";
import React, {useState} from "react";
import countries from "../data/countries.ts";
import currencies from "../data/currencies.ts";
import AuthService from "../api/AuthService.ts";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

export interface FormDataType {
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string,
    phoneNumber: string,
    country: string,
    password: string,
    confirmPassword: string,
    preferredCurrency: string,
    experienceLevel: string,
    interests: string[],
    agreedToTerms: boolean,
    receiveUpdates: boolean,
}

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
    width: 45%;
    @media (max-width: 950px) {
        width: 95%;
    }
`
const Header = styled.div`
    width: 60%;
    @media (max-width: 950px) {
        width: 100%;
    }
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
`;

const FormSection = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    gap: 3rem;

    @media (max-width: 950px) {
        gap: 1rem;
    }
`

const FormTitle = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    margin: 1.5rem 0 0 0;
`

const SignUp = () =>{
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormDataType>({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: "",
        country: "",
        password: "",
        confirmPassword: "",
        preferredCurrency: "",
        experienceLevel: "",
        interests: [],
        agreedToTerms: false,
        receiveUpdates: false,
    });
    const [formErrors, setFormErrors] = useState<Record<keyof FormDataType, string> & { adult: string , general: string}>({
        agreedToTerms: "",
        confirmPassword: "",
        country: "",
        dateOfBirth: "",
        email: "",
        experienceLevel: "",
        firstName: "",
        interests: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        preferredCurrency: "",
        receiveUpdates: "",
        adult: "",
        general: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const handleCustomChange = (value: string,name: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked, name } = e.target;
        let updatedInterests : string[] = [...formData.interests];

        if (checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter((interest) => interest !== value);
        }

        setFormData({
            ...formData,
            interests: updatedInterests,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const {data} = await AuthService.register(formData);
            console.log(data)
            if (!data?.id) throw new Error("Invalid response: Missing user ID");

            navigate("/");
        }catch(e: unknown){
            if (e instanceof AxiosError) {
                if(e.response) {
                    const serverErrors = e.response.data;
                    setFormErrors(serverErrors);
                }
            }
        }
    };

    return (<Container>
        <Header>
            <BackToHome />
            <Title>Create Your Account</Title>
            <Description>Join CoinWatch to track your crypto portfolio and stay updated with the market</Description>
        </Header>
        <Form onSubmit={handleSubmit}>
            <FormTitle>Personal Information</FormTitle>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">First name</LabelCoinWatch>
                        <InputCoinWatch name="firstName" value={formData.firstName}
                                        onChange={handleChange} margin="0.5rem 0" width="100%" placeholder="John"/>
                        {formErrors.firstName && <FormError>{formErrors.firstName}</FormError>}
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Email</LabelCoinWatch>
                        <InputCoinWatch name="email" value={formData.email}
                                        onChange={handleChange} margin="0.5rem 0" width="100%" placeholder="john@email.com"/>
                        {formErrors.email && <FormError>{formErrors.email}</FormError>}
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Date of birth</LabelCoinWatch>
                        <InputCoinWatch name="dateOfBirth" value={formData.dateOfBirth}
                                        onChange={handleChange} type="date" margin="0.5rem 0" width="100%"/>
                        {formErrors.dateOfBirth && <FormError>{formErrors.dateOfBirth}</FormError>}
                        {formErrors.adult && <FormError>{formErrors.adult}</FormError>}
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Last name</LabelCoinWatch>
                        <InputCoinWatch name="lastName" value={formData.lastName}
                                        onChange={handleChange} margin="0.5rem 0" width="100%" placeholder="Doe"/>
                        {formErrors.lastName && <FormError>{formErrors.lastName}</FormError>}
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Phone number (optional)</LabelCoinWatch>
                        <InputCoinWatch name="phoneNumber" value={formData.phoneNumber}
                                        onChange={handleChange} margin="0.5rem 0" width="100%" placeholder="+1 (555) 000-0000"/>
                        {formErrors.phoneNumber && <FormError>{formErrors.phoneNumber}</FormError>}
                    </div>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Country</LabelCoinWatch>
                        <SelectCoinWatch name="country"
                                         onChange={handleCustomChange} items={countries} defaultValue="Select country"
                                         margin="0.5rem 0" width="100%"/>
                        {formErrors.country && <FormError>{formErrors.country}</FormError>}
                    </div>
                </div>
            </FormSection>
            <FormTitle>Account Security</FormTitle>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Password</LabelCoinWatch>
                        <InputCoinWatch name="password"
                                        value={formData.password}
                                        onChange={handleChange} type="password" margin="0.5rem 0" width="100%"/>
                        <p style={{color: "#b4b4b4", fontSize: '0.8rem'}}>
                            Must be at least 8 characters with a number and a special character
                        </p>
                        {formErrors.password && <FormError>{formErrors.password}</FormError>}
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Confirm password</LabelCoinWatch>
                        <InputCoinWatch name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange} margin="0.5rem 0" type="password" width="100%"/>
                        {formErrors.confirmPassword && <FormError>{formErrors.confirmPassword}</FormError>}
                    </div>
                </div>
            </FormSection>
            <FormTitle>Preferences</FormTitle>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Preferred currency</LabelCoinWatch>
                        <SelectCoinWatch name="preferredCurrency"
                                         onChange={handleCustomChange} items={currencies} defaultValue="Select currency" margin="0.5rem 0"
                                         width="100%"/>
                        {formErrors.preferredCurrency && <FormError>{formErrors.preferredCurrency}</FormError>}
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%', margin: '1rem 0rem'}}>
                        <LabelCoinWatch htmlFor="email">Experience level</LabelCoinWatch>
                        <RadioGroup name="experienceLevel" onChange={handleChange} >
                            <RadioCoinWatch defaultValue="beginner" label="Beginner"/>
                            <RadioCoinWatch defaultValue="intermediate" label="Intermediate"/>
                            <RadioCoinWatch defaultValue="expert" label="Expert"/>
                        </RadioGroup>
                        {formErrors.experienceLevel && <FormError>{formErrors.experienceLevel}</FormError>}
                    </div>
                </div>
            </FormSection>
            <p style={{color: "white", display: "inline", fontWeight: "bold"}}>Interests (select all that apply)</p>
            <FormSection>
                <div style={{width: '100%'}}>
                    <div>
                        <div>
                            <InputCoinWatch name="Bitcoin"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>Bitcoin</p>
                        </div>
                        <div>
                            <InputCoinWatch name="Trading"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>Trading</p>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div>
                        <div>
                            <InputCoinWatch name="Ethereum"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>Ethereum</p>
                        </div>
                        <div>
                            <InputCoinWatch name="Mining"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>Mining</p>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div>
                        <div>
                            <InputCoinWatch name="DeFi"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>DeFi</p>
                        </div>
                        <div>
                            <InputCoinWatch name="Staking"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>Staking</p>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div>
                        <div>
                            <InputCoinWatch name="NFTs"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>NFTs</p>
                        </div>
                        <div>
                            <InputCoinWatch name="News"
                                            onChange={handleInterestsChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                            <p style={{color: "white", display: "inline"}}>News</p>
                        </div>
                    </div>
                </div>
            </FormSection>
            {formErrors.interests && <FormError>{formErrors.interests}</FormError>}
            <div style={{border: "1px solid rgb(222,222,222,0.4)", margin: "1.5rem 0"}}></div>
            <div>
                <InputCoinWatch name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange} type="checkbox" width={"20px"} margin="1rem 0"/>
                <p style={{color: "white", display: "inline"}}>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                {formErrors.agreedToTerms && <FormError>{formErrors.agreedToTerms}</FormError>}
            </div>
            <div>
                <InputCoinWatch name="receiveUpdates"
                                checked={formData.receiveUpdates}
                                onChange={handleChange} type="checkbox" width={"20px"} margin="0.2rem 0 3rem 0"/>
                <p style={{color: "white", display: "inline"}}>I want to receive news, updates, and offers from
                    CoinWatch</p>
            </div>
            {formErrors.general && <FormError>{formErrors.general}</FormError>}
            <ButtonPrimary>Create Account</ButtonPrimary>
            <p style={{color: "white",margin:"2rem 0"}}>Already have an account? <a href="#">Sign in</a></p>
        </Form>
    </Container>)
}

export default SignUp;