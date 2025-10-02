import { useParams } from "react-router";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_COIN_API_URL

const CoinDetailsPage = () => {
    const {id} = useParams()
    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(()=>{
        const fetchCoin = async () =>{
            try {
                const response = await fetch(`${API_URL}/${id}`)
                if(!response.ok) throw new Error('Failed to fetch data')
                const data = await response.json
                setError(data)
                setCoin(data)
            } catch (err) {
                setError(err.message)
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        }
        fetchCoin();
    },[id])
    // },[])
    return ( <div>Coin Details: {id}</div> );
}
 
export default CoinDetailsPage;