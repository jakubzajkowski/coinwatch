import {useQuery} from "@apollo/client";
import {useEffect} from "react";
import {GET_CURRENCIES_FOR_MARKETOVERVIEW} from "../apollo/queries.ts";
import {GetCryptoCurrenciesQuery} from "../graphql/generated.ts";

const Dashboard = () =>{
    const { loading, error, data } = useQuery<GetCryptoCurrenciesQuery>(GET_CURRENCIES_FOR_MARKETOVERVIEW);

    useEffect(() => {
        console.log(data);
    },[data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <div>Dashboard</div>;
}

export default Dashboard;