import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchCoins = async () => {
      try{
        const response = await fetch(`${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
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
  },[])

  // useEffect(() => {
  //   fetch(`${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
  //   .then((response) => {
  //     if(!response.ok) throw new Error('Failed to fetch data')
  //       // response.ok is true only if the status code is 200–299 (the “successful” range).
  //     return response.json()
  //   })
  //   .then((data) => {
  //     console.log(data)
  //     setCoins(data)
  //     setLoading(false)
  //   })
  //   .catch((err) => {
  //     setError(err.message)
  //     setLoading(false)
  //   })
  // },[])

  return ( 
    <div><h1>🚀 Crypto Dash</h1></div>
   );
}
 
export default App;