import { useState, useEffect } from "react";
import HomePage from "./pages/homePage";
import { Routes, Route } from "react-router";
import AboutPage from "./pages/aboutPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/notFound";
import CoinDetailsPage from "./pages/coinDetailsPage";

const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  useEffect(() => {
    const fetchCoins = async () => {
      try{
        const response = await fetch(`${API_URL}vs_currency=inr&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if(!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        setCoins(data)
      }
      catch(err){
        setError(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    fetchCoins();
  },[limit])

  return ( 
    <>
    <Header/>
    <Routes>
      <Route path="/" 
      element={ <HomePage 
        coins={coins}
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
        sortBy={sortBy}
        setSortBy={setSortBy}
        loading={loading}
        error={error}
        />
    }/>
    <Route path="/about" element={ <AboutPage/> }/>
    <Route path="/coin/:id" element={ <CoinDetailsPage/> }/>
    <Route path="/*" element={ <NotFoundPage/> }/>
    </Routes>
    </>

   );
}
 
export default App;