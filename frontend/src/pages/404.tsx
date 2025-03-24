import styled from "styled-components";
import Error from "../components/error.tsx";

const Container = styled.div`
    padding: 5rem 0.5rem 0 0.5rem;
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.secondary};
`

const NotFound = ()=>{
    return <Container>
        <Error code={404} title={"Page Not Found"} description={"There is no such a page found."} />
    </Container>
}

export default NotFound