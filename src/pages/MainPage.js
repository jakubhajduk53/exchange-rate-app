import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import classNames from "classnames";

const API_KEY = process.env.REACT_APP_API_KEY;
const SITE_URL = process.env.REACT_APP_SITE_URL;

const formClasses = classNames(
  "bg-gray-600 shadow-md rounded-xl p-2 sm:p-5 text-sm sm:text-base "
);

function MainPage() {
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

  const fetchData = async (term) => {
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

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {codes.size ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetchData(searchTerm);
          }}
          className="flex p-2 gap-2 sm:p-5 sm:gap-5"
        >
          <select
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            value={searchTerm}
            className={formClasses + "w-3/4 sm:w-auto"}
          >
            {Array.from(codes).map(([key, value]) => {
              return (
                <option
                  key={nanoid()}
                  value={key}
                  className="text-sm sm:text-base max-w-5"
                >
                  {value}({key})
                </option>
              );
            })}
          </select>
          <button type="submit" className={formClasses}>
            Select Currency
          </button>
        </form>
      ) : null}
      <div className="pb-5 text-center">
        {data.map(([name, value], index) => {
          return (
            <div
              key={nanoid()}
              className={index === 0 ? "text-3xl mb-2" : "text-lg"}
            >
              {codes.get(name)}:{" "}
              <span className={value >= 1 ? "text-green-400" : "text-red-400"}>
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
