import React from "react"
import { useState, useEffect } from "react"

function App() {

  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);
 
  const onSubmit = (event)=>{
      event.preventDefault();
      if (value==="") return;
      setValue(event.target.value);
      setValue("");
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((respone) => respone.json())
      .then((json) => {
        setCoins(json); // coin을 setcoin에 삽입
        setLoading(false); // loading이 끝났으므로 setloading 값 변경
      }) // json = coin
  }, []) // API 호출은 1번만! 따라서, 두 번째 인자는 빈 리스트

  return (
    <div>
      <h1>The coins! {loading ? null : `(${coins.length})`} </h1>
      <form onSubmit={onSubmit}>

        <input onChange={onChange} value={value} type="number"
          placeholder="How much do you have?" />

        <button>SEARCH</button>
        
        {loading ? <strong>Loading...</strong> :
          <ul>
            {coins.map((coin) =>
              <li>{coin.name} ({coin.symbol}):{coin.quotes.USD.price} USD</li>)
            }
          </ul>
        }

      </form>
    </div>
  );
}

export default App;
