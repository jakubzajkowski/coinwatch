import {gql, useQuery} from "@apollo/client";
import {useEffect} from "react";

const GET_CURRENCIES = gql`
  query getCryptoCurrencies {
    getCryptoCurrencies {
      id
      name
      symbol
      currentPrice
      marketCap
      lastUpdated
    }
  }
`

const Dashboard = () =>{
    const { loading, error, data } = useQuery(GET_CURRENCIES);

    useEffect(() => {
        console.log(data);
    },[data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <div>Dashboard</div>;
}

export default Dashboard;