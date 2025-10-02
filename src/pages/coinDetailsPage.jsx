import { useParams, Link } from "react-router";
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
                const data = await response.json()
                setCoin(data)
            } catch (err) {
                setError(err.message)
            } finally{
                setLoading(false)
            }
        }
        fetchCoin();
    },[id])
    // },[])

    return ( <div className="coin-details-container">
        <Link to='/' >← Back To Home</Link>
        <h1 className="coin-details-title">
            {coin ? `${coin.name} (${coin.symbol.toUpperCase()})`: 'Coin Details'}
        </h1>
        { loading && <p>Loading...</p>}
        { error && <div className="error">❌ {error}</div>}
        { !loading && !error && (
            <>
            <img 
            src={coin.image.large} 
            alt={coin.name} 
            className="coin-details-image" />
            <p>{coin.description.en.split('. ')[0]+'.'}</p>
            <div className="coin-details-info">
                <h3>Rank: #{coin.market_cap_rank}</h3>
                <h3>Current Price: ₹{coin.market_data.current_price.inr.toLocaleString()}</h3>
                <h4>Market Cap: ₹{coin.market_data.market_cap.inr.toLocaleString()}</h4>
                <h4>24 High: ₹{coin.market_data.high_24h.inr.toLocaleString()}</h4>
                <h4>24 Low: ₹{coin.market_data.low_24h.inr.toLocaleString()}</h4>
                <h4>24 Price Change: ₹{coin.market_data.price_change_24h.toFixed(2)} {' '}
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%</h4>
                <h4>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</h4>
                <h4>Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}</h4>

                <h4>All Time High: {coin.market_data.ath.inr.toLocaleString()} {' on '} 
                    { new Date(coin.market_data.ath_date.inr).toLocaleDateString()}</h4>

                <h4>All Time Low: {coin.market_data.atl.inr.toLocaleString()} {' on '} 
                    { new Date(coin.market_data.atl_date.inr).toLocaleDateString()}</h4>
                <h4>Last Updated: {new Date(coin.last_updated).toLocaleDateString()}</h4>
            </div>
            <div className="coin-details-links">
                {coin.links.homepage[0] && (
                    <p>
                        🌐{' '}
                        <a href={coin.links.homepage[0]}
                            target='_blank'
                            rel="noopener noreferrer"
                        >Website</a>
                    </p>
                )}
                {coin.links.blockchain_site[0] && (
                    <p>
                        🧩{' '}
                        <a href={coin.links.blockchain_site[0]}
                            target='_blank'
                            rel="noopener noreferrer"
                        >Blockchain Explorer</a>
                    </p>
                )}
                {coin.categories.length >0 && (
                    <p>Categories: {coin.categories.join(', ')}</p>
                )}
                {!loading && !error && !coin && <p>No Data Found</p>}
            </div>
            </>
        )}

    </div> );
}
 
export default CoinDetailsPage;