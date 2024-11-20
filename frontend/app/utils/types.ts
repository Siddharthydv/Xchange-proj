
export interface KLine {
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}

export interface Trade {
    "id": number,
    "isBuyerMaker": boolean,
    "price": string,
    "quantity": string,
    "quoteQuantity": string,
    "timestamp": number
}

export interface Depth {
    bids: [string, string][],
    asks: [string, string][],
    lastUpdateId: string
}

export interface Ticker {
    "firstprice": string,
    "high": string,
    "lastprice": string,
    "low": string,
    "pricechange": string,
    "pricechangepercent": string,
    "quotevolume": string,
    "symbol": string,
    "trades": string,
    "volume": string
}