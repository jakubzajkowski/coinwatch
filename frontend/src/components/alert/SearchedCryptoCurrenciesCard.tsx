import {FC, useState} from "react";
import styled from "styled-components";
import {IoIosAddCircle} from "react-icons/io";
import {ApolloError, useMutation} from "@apollo/client";
import {MUTATION_ADD_SUBSCRIPTION} from "../../apollo/queries.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {Alert} from "../Alert.tsx";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const List = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`
const Image = styled.img`
    width: 30px;
    height: 30px;
`

interface SearchedCryptoCurrenciesProps {
    cryptoId: string
    id: number
    image: string
}

const SearchedCryptoCurrenciesCard : FC<SearchedCryptoCurrenciesProps> = ({cryptoId,id,image}) => {
    const [showAlertSuccess, setShowAlertSuccess] = useState<boolean>(false);
    const [showAlertError, setShowAlertError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {user} = useSelector((state:RootState)=>state.auth)

    const [mutationAddSubscription] = useMutation(MUTATION_ADD_SUBSCRIPTION,{
        variables: {userId: user?.id, cryptoId: id}
    })

    const handleAddSubscription = async () => {
        try{
            await mutationAddSubscription();
            setShowAlertSuccess(state=>!state)
        }catch (e){
            if (e instanceof ApolloError) {
                setErrorMessage(e.message)
            } else {
                console.log(e);
            }
            setShowAlertError(state => !state);
        }
    }

    return <>{showAlertSuccess && <Alert
            type="success"
            message="Added Successful!"
            onClose={() => setShowAlertSuccess(false)}
        />}
        {showAlertError && <Alert
            type="error"
            message={errorMessage}
            onClose={() => setShowAlertError(false)}
        />}
        <Container>
            <List>
                <Image src={image} alt={"Icon"}/>
                {cryptoId}
            </List>
            <IoIosAddCircle onClick={handleAddSubscription} style={{width:"30px",height:"30px",cursor:"pointer"}}/>
        </Container>
    </>
}

export default SearchedCryptoCurrenciesCard