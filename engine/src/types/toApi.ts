import { UserBalance } from "../trade/Engine";
import { Order } from "../trade/Orderbook";

export const CREATE_ORDER = "CREATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const ON_RAMP = "ON_RAMP";
export const CREATE_USER="CREATE_USER"
export const GET_DEPTH = "GET_DEPTH";

export type MessageToApi = {
    type: "DEPTH",
    payload: {
        bids: [string, string][],
        asks: [string, string][],
    }
} | {
    type: "ORDER_PLACED",
    payload: {
        orderId: string,
        executedQty: number,
        fills: {
            price: string,
            qty: number,
            tradeId: number
        }[]
    }
} | {
    type: "ORDER_CANCELLED",
    payload: {
        orderId: string,
        executedQty: number,
        remainingQty: number
    }
} | {
    type: "OPEN_ORDERS",
    payload: Order[]
}|{
    type:"CREATE_USER",
    payload:Number
}|{
    type:"GET_ASSETS",
    payload:UserBalance
}