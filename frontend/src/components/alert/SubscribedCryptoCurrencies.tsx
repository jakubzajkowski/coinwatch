import styled from "styled-components";
import {useMutation, useQuery} from "@apollo/client";
import {GET_SUBSCRIPTION_BY_USER_ID, MUTATION_DELETE_SUBSCRIPTION} from "../../apollo/queries.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {GetSubscriptionByUserIdQuery} from "../../graphql/generated.ts";
import {TiDelete} from "react-icons/ti";
import QueryBoundary from "../QueryBoundary.tsx";

const Container = styled.div`
    width: 100%;
`
const Title = styled.h2`
    color: ${({theme})=>theme.colors.primary};
    font-size: 0.9rem;
    margin: 0.5rem 0;
`

const Description = styled.p`
    color: ${({theme})=>theme.colors.third};
    font-size: 0.8rem;
`

const SubscribedCryptos = styled.div`
    border-radius: 0.4rem;
    border: 1px solid rgb(255,255,255,0.3);
    margin: 1rem 0;
    overflow-y: scroll;
    max-height: 400px;
`

const SubscribedCryptoCard = styled.div`
    border-bottom: 1px solid rgb(255,255,255,0.3);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SubscribedCryptoCurrencies = () => {
    const {user} = useSelector((state: RootState) => state.auth);

    const {error,loading,data,refetch} = useQuery<GetSubscriptionByUserIdQuery>(GET_SUBSCRIPTION_BY_USER_ID,{
        variables: {userId: user?.id}
    })

    const [deleteSubscription] = useMutation(MUTATION_DELETE_SUBSCRIPTION);

    const handleDelete = async (cryptoId: string) => {
        try {
            const response = await deleteSubscription({
                variables: { userId: user?.id, cryptoId: cryptoId }
            });

            if (response.data) {
                await refetch();
            }
        } catch (err) {
            console.error('Błąd przy usuwaniu subskrypcji ❌', err);
        }
    };

    return <QueryBoundary error={error} loading={loading}> 
            (data?.getSubscriptionByUserId?.length==0 ? <Title>You have no subscribed cryptocurrencies</Title> : <Container>
            <Title>Your subscribed cryptocurrencies</Title>
            <Description>You'll receive alerts for these cryptocurrencies</Description>
            <SubscribedCryptos>
                {data?.getSubscriptionByUserId && data.getSubscriptionByUserId.map((crypto)=>{
                    return <SubscribedCryptoCard>
                        <div style={{display: "flex",justifyContent:"center",alignItems:"center",gap:"0.5rem"}}>
                            <img style={{height:"30px",width:"30px"}} src={crypto?.cryptoCurrency?.imageUrl as string}/>
                            <p style={{display:"inline"}}>{crypto?.cryptoCurrency?.cryptoId} ({crypto?.cryptoCurrency?.symbol})</p>
                        </div>
                        <TiDelete onClick={()=>handleDelete(crypto?.cryptoCurrency?.id as string)} style={{height:"30px",width:"30px",cursor:"pointer"}}/>
                    </SubscribedCryptoCard>
                })}
            </SubscribedCryptos>
        </Container>)
    </QueryBoundary>
}

export default SubscribedCryptoCurrencies;