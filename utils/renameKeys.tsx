import { KeyboardAvoidingViewComponent } from "react-native";

export const renameKeysArr = (bestMatchesArr:any):void => {
//   const keysMap = {
//     symbol: "01. symbol",
//     open: "02. open",
//     high: "03. high",
//     low: "04. low",
//     price: "05. price",
//     volume: "06. volume",
//     tradingDay: "07. latest trading day",
//     prevClose: "08. previous close",
//     changePnt: "09. change",
//     changePercent: "10. change percent"
//   };
// console.log(bestMatchesArr)
//@ts-ignore
bestMatchesArr.forEach((quoteDataObj => {
    for (let key in quoteDataObj) {
      const newKey = key.replace(/^\d+\.\s/, "");
      quoteDataObj[newKey] = quoteDataObj[key];
      delete quoteDataObj[key];
    }
}))

};

export const renameKeysObj= (quoteDataObj:any):void => {
  //   const keysMap = {
  //     symbol: "01. symbol",
  //     open: "02. open",
  //     high: "03. high",
  //     low: "04. low",
  //     price: "05. price",
  //     volume: "06. volume",
  //     tradingDay: "07. latest trading day",
  //     prevClose: "08. previous close",
  //     changePnt: "09. change",
  //     changePercent: "10. change percent"
  //   };

  for (let key in quoteDataObj) {
    const newKey = key.replace(/^\d+\.\s/, "");
    console.log(`newKey: ${newKey}`)
    quoteDataObj[newKey] = quoteDataObj[key];
    delete quoteDataObj[key];
  }
  console.log(quoteDataObj)
  
  };
  