import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const SITE_URL = process.env.REACT_APP_SITE_URL;

export const fetchCodes = async () => {
  const { data, error } = await axios.get(`${SITE_URL + API_KEY}/codes`);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const codes = new Map(data.supported_codes);
    return [codes, codes.entries().next().value[0]];
  }
};

export const fetchData = async (term) => {
  const { data, error } = await axios.get(
    `${SITE_URL + API_KEY}/latest/${term}`
  );
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return Object.entries(data.conversion_rates);
  }
};

export const pairCurrencies = async (firstCurrency, secondCurrency) => {
  const { data, error } = await axios.get(
    `${SITE_URL + API_KEY}/pair/${firstCurrency}/${secondCurrency}`
  );
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data.conversion_rate;
  }
};
