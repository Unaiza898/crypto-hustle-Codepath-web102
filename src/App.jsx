import { useState, useEffect } from "react";
import CoinInfo from "./Components/CoinInfo";
import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [list, setList] = useState(0);
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      );
      const json = await response.json();
      setList(json);
    };
    fetchAllCoinData().catch(console.error);
  }, []);
  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <ul>
          {list &&
            Object.entries(list.Data).map(([coin], key) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                key = {key}
                image={list.Data[coin].ImageUrl}
                name={list.Data[coin].FullName}
                symbol={list.Data[coin].Symbol}
              />
              ) : null
            )}
        </ul>
      </div>
    </>
  );
}

export default App;
