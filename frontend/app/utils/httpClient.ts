import axios from "axios";
import { Depth, KLine, Ticker, Trade } from "./types";
import { basename } from "path";

// const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";
const BASE_URL = "http://localhost:3000/api/v1";
export async function placeOrder(market:string,userId:string,price:string,side:string,quantity:string){
         const response=await axios.post(`${BASE_URL}/order`,{price:price,side:side,quantity:quantity,market:market},{withCredentials:true});
}
export async function getTicker(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    console.log("tickers=",tickers);
    const ticker = tickers.find(t => t.symbol === market);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    console.log(ticker)
    return ticker
}

export async function getTickers(): Promise<Ticker[]> {
    const response = await axios.get(`${BASE_URL}/tickers`);
    console.log(response.data)
    const data=response.data;
    const markets=["SOL_USDC","BTC_USDC"]
    markets.forEach(market=>{
        const exists=data.find(d=>market===d.symbol)
        if(!exists)
            data.push({ "firstprice": "0",
                "high":"0",
                "lastprice": "0",
                "low": "0",
                "pricechange": "0",
                "pricechangepercent": "0",
                "quotevolume": "0",
                "symbol": `${market}`,
                "trades": "0",
                "volume": "0"})
    })
   return data
}


export async function getDepth(market: string): Promise<Depth> {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data; 
}
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
   
    return response.data;
}

export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await axios.post(`${BASE_URL}/klines`, {
        market: market,
        interval: interval,
        startTime: startTime,
        endTime: endTime,
      });    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}
export async function signIn(email:string,password:string){

   const data= await axios.post(`${BASE_URL}/signIn`,{email:email,password:password},{withCredentials:true});
   return data.data
}

export async function orderHistory(market:string){
    const response=await axios.get(`${BASE_URL}/order/history?market=${market}`,{withCredentials:true});
    console.log(response.data); 
    return response.data
}
export async function fillOrders(market:string){
    const response=await axios.get(`${BASE_URL}/order/fills?market=${market}`,{withCredentials:true})
    console.log(response.data)
    return response.data
}

export async function openOrders(market:string){
    const response=await axios.get(`${BASE_URL}/order/open?market=${market}`,{withCredentials:true})
    return response.data
}


export async function getAssets(){
    const response=await axios.get(`${BASE_URL}/order/assets`,{withCredentials:true})
    return response.data;
}

export async function signup(email:string,password:string,username:string){
    const response=await axios.post(`${BASE_URL}/signUp`,{email,password,username})
    console.log(response)
    return response.data
}