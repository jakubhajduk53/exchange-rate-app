import axios from "axios";
import { useState } from "react";
import { nanoid } from "nanoid";

const API_KEY = process.env.REACT_APP_API_KEY;
const SITE_URL = process.env.REACT_APP_SITE_URL;

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const { data, error } = await axios.get(
      `${SITE_URL + API_KEY}/latest/${searchTerm}`
    );
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      console.log(data);
      console.log(data.conversion_rates);
      setData(Object.entries(data.conversion_rates));
    }
  };

  return (
    <div>
      <p className="text-3xl">Exchange Rate App</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button type="submit">Select Currency</button>
      </form>
      <div>
        {data
          ? data.map(([name, value]) => {
              return (
                <div key={nanoid()}>
                  {name} : {value}
                </div>
              );
            })
          : null}
      </div>
      <button
        onClick={() => {
          fetchData();
        }}
        className="text-2xl border rounded-md p-2 bg-blue-500 text-white"
      >
        Get Data
      </button>
    </div>
  );
}

export default App;
