import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";

const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {

    const fetchCoins = async () => {
      try{
        const response = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if(!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        console.log(data)
        setCoins(data)
      }
      catch(err){
        setError(err.message)
        console.error("Caught error:", err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchCoins();
  },[limit])

  return ( 
    <div><h1>🚀 Crypto Dash</h1>
    {loading && <p>Loading...</p>}
    {error && <div className="error">{error}</div>}

    <LimitSelector limit={limit} onLimitChange={setLimit}/>

    {!loading && !error && (
      <main className="grid">
        {
          coins.map((coin)=> (
            <CoinCard coin={coin} key={coin.id}/>
          ))
        }
      </main>
    )}
    </div>
   );
}
 
export default App;