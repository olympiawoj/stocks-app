import axios from "axios";
import { renameKeysArr, renameKeysObj } from "./renameKeys";
import { API_KEY } from "react-native-dotenv";

export const handleQuote = async (ticker: string) => {
    /*
    Returns the price and volume information for a ticker
    */
    const quoteURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(quoteURL);
      const searchObj = response.data["Global Quote"];
      renameKeysObj(searchObj);
      if (searchObj.price) {
        return searchObj.price;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const handleCompanyOverview = async (ticker: string) => {
      /* 
      This API returns the company information, financial ratios, and other key metrics 
      for the equity specified. Data is generally refreshed on the same day a company reports its latest earnings and financials.
      */
    const quoteURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(quoteURL);
      // console.log(response.data);
      // const searchObj = response.data["Global Quote"]
      // renameKeysObj(searchObj)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };