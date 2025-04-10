import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {GET_SUBSCRIPTION_BY_USER_ID} from "../../apollo/queries.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {GetSubscriptionByUserIdQuery} from "../../graphql/generated.ts";
import {TiDelete} from "react-icons/ti";

const Container = styled.div`
    width: 100%;
`
const Title = styled.h2`
    color: ${({theme})=>theme.colors.primary};
    font-size: 0.9rem;
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

    const {error,loading,data} = useQuery<GetSubscriptionByUserIdQuery>(GET_SUBSCRIPTION_BY_USER_ID,{
        variables: {userId: user?.id}
    })

    console.log(data)

    if (error) return <div>
        Error
    </div>

    if (loading) return <div>
        Loading...
    </div>

    return <Container>
        <Title>Your subscribed cryptocurrencies</Title>
        <Description>You'll receive alerts for these cryptocurrencies</Description>
        <SubscribedCryptos>
            {data?.getSubscriptionByUserId && data.getSubscriptionByUserId.map((crypto)=>{
                return <SubscribedCryptoCard>
                    <div style={{display: "flex",justifyContent:"center",alignItems:"center",gap:"0.5rem"}}>
                        <img style={{height:"30px",width:"30px"}} src={crypto?.cryptoCurrency?.imageUrl as string}/>
                        <p style={{display:"inline"}}>{crypto?.cryptoCurrency?.cryptoId} ({crypto?.cryptoCurrency?.symbol})</p>
                    </div>
                    <TiDelete style={{height:"30px",width:"30px",cursor:"pointer"}}/>
                </SubscribedCryptoCard>
            })}
        </SubscribedCryptos>
    </Container>
}

export default SubscribedCryptoCurrencies;