import { CANCEL_ORDER, CREATE_ORDER, GET_DEPTH, GET_OPEN_ORDERS, ON_RAMP } from "."
const CREATE_USER="CREATE_USER"
const GET_ASSETS="GET_ASSETS"
export type MessageToEngine = {
    type: typeof CREATE_ORDER,
    data: {
        market: string,
        price: string,
        quantity: string,
        side: "buy" | "sell",
        userId: string
    }
} | {
    type: typeof CANCEL_ORDER,
    data: {
        orderId: string,
        market: string,
    }
} | {
    type: typeof ON_RAMP,
    data: {
        amount: string,
        userId: string,
        txnId: string
    }
} | {
    type: typeof GET_DEPTH,
    data: {
        market: string,
    }
} | {
    type: typeof GET_OPEN_ORDERS,
    data: {
        userId: string,
        market: string,
    }
}|{
    type:typeof CREATE_USER,
    data:{
        userId:Number,
        username:string,
    }
}|{
    type:typeof GET_ASSETS,
    data:{
        userId:string
    }
}

