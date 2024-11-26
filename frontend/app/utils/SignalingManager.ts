import { Ticker, Trade } from "./types";

// export const BASE_URL = "wss://ws.backpack.exchange/"
export const BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string
console.log(BASE_URL)
export class SignalingManager {
    private ws: WebSocket;
    private static instance: SignalingManager;
    private bufferedMessages: any[] = [];
    private callbacks: any = {};
    private id: number;
    private initialized: boolean = false;

    private constructor() {
        this.ws = new WebSocket(BASE_URL);
        this.bufferedMessages = [];
        this.id = 1;
        this.init();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SignalingManager();
        }
        return this.instance;
    }

    init() {
        this.ws.onopen = () => {
            this.initialized = true;
            this.bufferedMessages.forEach(message => {
                this.ws.send(JSON.stringify(message));
            });
            this.bufferedMessages = [];
        }
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("type=",message);
            const type = message.data.e;
            if (this.callbacks[type]) {
                this.callbacks[type].forEach(({ callback }:{callback:any}) => {
                    if (type === "ticker") {
                        const newTicker: Partial<Ticker> = {
                            lastprice: message.data.lastprice,
                            high: message.data.high,
                            low: message.data.low,
                            volume: message.data.volume,
                            quotevolume: message.data.quotevolume,
                            symbol: message.data.symbol,
                        }
                        console.log(newTicker);
                        callback(newTicker);
                   }
                   if (type === "depth") {
                        // const newTicker: Partial<Ticker> = {
                        //     lastPrice: message.data.c,
                        //     high: message.data.h,
                        //     low: message.data.l,
                        //     volume: message.data.v,
                        //     quoteVolume: message.data.V,
                        //     symbol: message.data.s,
                        // }
                        // console.log(newTicker);
                        // callback(newTicker);
                        const updatedBids = message.data.b;
                        const updatedAsks = message.data.a;
                        callback({ bids: updatedBids, asks: updatedAsks });
                    }
                    if(type==="trade")
                    {
                        const newTrade:Trade={
                            id: message.data.t,
                            isBuyerMaker: message.data.m,
                            price: message.data.p,
                            quantity: message.data.q,
                            quoteQuantity: String(Number(message.data.p)*Number(message.data.q)),
                            timestamp: Date.now()
                        }
                        console.log("new trade",newTrade.timestamp)
                        callback(newTrade)
                    }
                });
            }
        }
    }

    sendMessage(message: any) {
        const messageToSend = {
            ...message,
            id: this.id++
        }
        if (!this.initialized) {
            this.bufferedMessages.push(messageToSend);
            return;
        }
        this.ws.send(JSON.stringify(messageToSend));
    }

    async registerCallback(type: string, callback: any, id: string) {
        this.callbacks[type] = this.callbacks[type] || [];
        this.callbacks[type].push({ callback, id });
        console.log(this.callbacks)
        // "ticker" => callback
    }

    async deRegisterCallback(type: string, id: string) {
        console.log('DEREG',this.callbacks)
        if (this.callbacks[type]) {
            const index = this.callbacks[type].findIndex((callback:any) => callback.id === id);
            if (index !== -1) {
                this.callbacks[type].splice(index, 1);
            }
        }
    }
}