import styled from "styled-components";
import {FC} from "react";
import {ButtonPrimary, ButtonSecondary, LinkCoinWatch} from "./styled.tsx";


interface ErrorProps {
    code: number
    title: string
    description: string
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5rem;
    color: ${({ theme }) => theme.colors.primary};
`

const ContainerButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`

const Code = styled.h1`
    font-size: 5rem;
`
const Title = styled.h2`
    font-size: 2rem;
`
const Description = styled.p`
    font-size: 1rem;
    margin: 0.5rem 0 2rem 0;
    color: #b4b4b4;
`

const Error : FC<ErrorProps> = ({code,description,title}) =>{
    return (<Container>
            <Code>{code}</Code>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <ContainerButtons>
                <ButtonPrimary><LinkCoinWatch color={"black"} to={"/"}>Go Back</LinkCoinWatch></ButtonPrimary>
                <ButtonSecondary><LinkCoinWatch to={"/"}>Go to Home</LinkCoinWatch></ButtonSecondary>
            </ContainerButtons>
        </Container>
    )
}

export default Error