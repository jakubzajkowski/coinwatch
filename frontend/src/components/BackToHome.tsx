import {FaArrowLeft} from "react-icons/fa";
import styled from "styled-components";
import {LinkCoinWatch} from "./styled.tsx";

const Container = styled.div`
color: white !important`

const BackToHome = () =>{
    return <Container>
        <FaArrowLeft style={{margin:"0 1rem 0 0"}}/><LinkCoinWatch to={"/"} style={{display:"inline"}}>Back to Home</LinkCoinWatch>
    </Container>
}

export default BackToHome;