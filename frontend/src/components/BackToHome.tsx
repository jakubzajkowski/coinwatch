import {FaArrowLeft} from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
color: white !important`

const BackToHome = () =>{
    return <Container>
        <FaArrowLeft style={{margin:"0 1rem 0 0"}}/><p style={{display:"inline"}}>Back to Home</p>
    </Container>
}

export default BackToHome;