import Button from "../components/Button";
import { fetchCodes, fetchData } from "../api";
import { formClasses } from "../data";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function MainPage() {
  const [data, setData] = useState([]);
  const [codes, setCodes] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState("");

  const updateData = async () => {
    const response = await fetchData(searchTerm);
    setData(response);
  };

  useEffect(() => {
    const getData = async () => {
      const [fetchedCodes, firstCode] = await fetchCodes();
      setCodes(fetchedCodes);
      setSearchTerm(firstCode);
    };

    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {codes?.size ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateData();
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
          <Button type="submit" value="Select Currency" />
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
