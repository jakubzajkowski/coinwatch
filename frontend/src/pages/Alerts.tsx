import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store.ts";
import styled from "styled-components";

const Container = styled.div`
    padding: 5rem 0.5rem 0 0.5rem;
`

const Alerts = () =>{
    const { user, isAuthenticated } = useSelector((state: ReducerType) => state.auth);

    if(isAuthenticated){
        return <Container>

            </Container>
    }else{
        return <Container>
            <h1>You don't have permission</h1>
        </Container>
    }
}

export default Alerts;