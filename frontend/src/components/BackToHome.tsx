import {FaArrowLeft} from "react-icons/fa";
import styled from "styled-components";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    color: white !important;
    display:flex;
    align-items:center;
    gap:0.4rem;
    cursor: pointer;
`

const BackToHome : FC = () =>{
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return <Container onClick={handleBack}>
      <FaArrowLeft />
      Go back to previous page
    </Container>
}

export default BackToHome;