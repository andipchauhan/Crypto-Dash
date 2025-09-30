import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";

const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('')

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

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(filter.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(filter.toLowerCase())
  })

  return ( 
    <div><h1>🚀 Crypto Dash</h1>
    {loading && <p>Loading...</p>}
    {error && <div className="error">{error}</div>}

    <div className="top-controls">
    <FilterInput filter={filter} onFilterChange={setFilter}/>
    <LimitSelector limit={limit} onLimitChange={setLimit}/>
    </div>

    {!loading && !error && (
      <main className="grid">
        {filteredCoins.length > 0 ?
          filteredCoins.map((coin)=> (
            <CoinCard coin={coin} key={coin.id}/>
          )) 
          : <p>No matching coins.</p> 
        }
      </main>
    )}
    </div>
   );
}
 
export default App;