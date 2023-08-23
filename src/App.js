import { Header } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const API_KEY = process.env.REACT_APP_API_KEY;
const SITE_URL = process.env.REACT_APP_SITE_URL;

function App() {
  const [data, setData] = useState([]);
  const [codes, setCodes] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCodes = async () => {
    const { data, error } = await axios.get(`${SITE_URL + API_KEY}/codes`);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      const codes = new Map(data.supported_codes);
      setCodes(codes);
      setSearchTerm(codes.entries().next().value[0]);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchData = async (term) => {
    console.log(codes.get(term));

    const { data, error } = await axios.get(
      `${SITE_URL + API_KEY}/latest/${term}`
    );
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      setData(Object.entries(data.conversion_rates));
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData(searchTerm);
        }}
      >
        <select
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          value={searchTerm}
        >
          {Array.from(codes).map(([key, value]) => {
            return (
              <option key={nanoid()} value={key}>
                {value}({key})
              </option>
            );
          })}
        </select>
        <button type="submit">Select Currency</button>
      </form>
      <div>
        {data.map(([name, value]) => {
          return (
            <div key={nanoid()}>
              {codes.get(name)} : {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
