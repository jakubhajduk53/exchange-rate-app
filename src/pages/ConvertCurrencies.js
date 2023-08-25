import Button from "../components/Button";
import { fetchCodes, pairCurrencies } from "../api";
import { formClasses } from "../data";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

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

  const convertCurrencies = async () => {
    const conversionRate = await pairCurrencies(
      currencies.firstCurrency,
      currencies.secondCurrency
    );
    setInputValue((prevValue) => ({
      ...prevValue,
      secondInput: inputValue.firstInput * conversionRate,
    }));
  };

  useEffect(() => {
    const getData = async () => {
      const [fetchedCodes, firstCode] = await fetchCodes();
      setCodes(fetchedCodes);
      setCurrencies({
        firstCurrency: firstCode,
        secondCurrency: firstCode,
      });
    };

    getData();
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      {codes.size ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            convertCurrencies();
          }}
          className="flex flex-col gap-5 p-5"
        >
          <div className="flex gap-5">
            <input
              className={formClasses + "w-1/4 sm:w-auto"}
              value={inputValue.firstInput}
              onChange={(event) => {
                setInputValue((prevValue) => ({
                  ...prevValue,
                  firstInput: event.target.value,
                }));
              }}
            />
            <select
              onChange={(event) => {
                setCurrencies((prevValue) => ({
                  ...prevValue,
                  firstCurrency: event.target.value,
                }));
              }}
              value={currencies.firstCurrency}
              className={formClasses + "w-3/4 sm:w-auto"}
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
              className={formClasses + "w-1/4 sm:w-auto"}
              disabled
              value={inputValue.secondInput}
            />
            <select
              onChange={(event) => {
                setCurrencies((prevValue) => ({
                  ...prevValue,
                  secondCurrency: event.target.value,
                }));
              }}
              value={currencies.secondCurrency}
              className={formClasses + "w-3/4 sm:w-auto"}
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
          <Button type="submit" value="Convert Currencies" />
        </form>
      ) : null}
    </div>
  );
}

export default ConvertCurrencies;
