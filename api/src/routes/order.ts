import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP, GET_OPEN_ORDERS } from "../types";
import { Client } from "pg";
export const orderRouter = Router();
const client = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});
client.connect();
orderRouter.post("/", async (req, res) => {
    const { market, price, quantity, side, userId } = req.body;
    console.log({ market, price, quantity, side, userId })
    //TODO: can u make the type of the response object right? Right now it is a union.
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CREATE_ORDER,
        data: {
            market,
            price,
            quantity,
            side,
            userId
        }
    });
    res.json(response.payload);
});

orderRouter.delete("/", async (req, res) => {
    const { orderId, market } = req.body;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CANCEL_ORDER,
        data: {
            orderId,
            market
        }
    });
    res.json(response.payload);
});

orderRouter.get("/open", async (req, res) => {
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_OPEN_ORDERS,
        data: {
            userId: req.query.userId as string,
            market: req.query.market as string
        }
    });
    res.json(response.payload);
});

orderRouter.get("/history",async(req,res)=>{
    console.log(req.query.userId)
    const query=`SELECT * FROM orderTable 
                 WHERE userId=$1 AND market=$2`
    const values=[req.query.userId,req.query.market];
    const response =await client.query(query,values);
    res.json(response.rows);
})

orderRouter.get("/fills",async (req,res)=>{
    console.log(req.query.userId)
    const query=`SELECT * FROM orderTable 
                 WHERE userId=$1 AND executedQty=quantity::Integer`
    const values=[req.query.userId];
    const response =await client.query(query,values);
    res.json(response.rows);
})