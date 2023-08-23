import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { nanoid } from "nanoid";

const API_KEY = process.env.REACT_APP_API_KEY;
const SITE_URL = process.env.REACT_APP_SITE_URL;

const formClasses = classNames("p-5 bg-gray-600 shadow-md rounded-xl");

function ConvertCurrencies() {
  const [codes, setCodes] = useState(new Map());
  const [currencies, setCurrencies] = useState({
    firstCurrency: "",
    secondCurrency: "",
  });
  const [inputValue, setInputValue] = useState({
    firstInput: 0,
    secondInput: 0,
  });

  const fetchCodes = async () => {
    const { data, error } = await axios.get(`${SITE_URL + API_KEY}/codes`);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      const codes = new Map(data.supported_codes);
      setCodes(codes);
      setCurrencies({
        firstCurrency: codes.entries().next().value[0],
        secondCurrency: codes.entries().next().value[0],
      });
    }
  };

  const pairCurrencies = async () => {
    const { data, error } = await axios.get(
      `${SITE_URL + API_KEY}/pair/${currencies.firstCurrency}/${
        currencies.secondCurrency
      }`
    );
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      setInputValue((prevValue) => ({
        ...prevValue,
        secondInput: (inputValue.firstInput * data.conversion_rate).toFixed(2),
      }));
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          pairCurrencies();
        }}
        className="flex flex-col gap-5 p-5"
      >
        <div className="flex gap-5">
          <input
            className={formClasses}
            value={inputValue.firstInput}
            onChange={(event) => {
              setInputValue((prevValue) => ({
                ...prevValue,
                firstInput: event.target.value,
              }));
            }}
            type="number"
            min={0}
          />
          <select
            onChange={(event) => {
              setCurrencies((prevValue) => ({
                ...prevValue,
                firstCurrency: event.target.value,
              }));
            }}
            value={currencies.firstCurrency}
            className={formClasses}
          >
            {Array.from(codes).map(([key, value]) => {
              return (
                <option key={nanoid()} value={key}>
                  {value}({key})
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-5">
          <input
            className={formClasses}
            disabled
            value={inputValue.secondInput}
            type="number"
            min={0}
          />
          <select
            onChange={(event) => {
              setCurrencies((prevValue) => ({
                ...prevValue,
                secondCurrency: event.target.value,
              }));
            }}
            value={currencies.secondCurrency}
            className={formClasses}
          >
            {Array.from(codes).map(([key, value]) => {
              return (
                <option key={nanoid()} value={key}>
                  {value}({key})
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className={formClasses}>
          Convert Currencies
        </button>
      </form>
    </div>
  );
}

export default ConvertCurrencies;
