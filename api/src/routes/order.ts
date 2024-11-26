import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP, GET_OPEN_ORDERS } from "../types";
import { Client } from "pg";
import { jwtVerify } from "../jwtVerify";
export const orderRouter = Router();
const client = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD,
    port: Number(process.env.PG_PORT),
});
client.connect();
orderRouter.use(jwtVerify)
orderRouter.get('/dummy',(req,res)=>{
    return   res.json(req.body.userId);
  
})
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
            userId: req.body.userId as string,
            market: req.query.market as string
        }
    });
    console.log("open",response.payload)
    res.json(response.payload);
});

orderRouter.get("/history",async(req,res)=>{
    console.log("history",req.body.userId)
    const query=`SELECT * FROM orderTable 
                 WHERE userId=$1 AND market=$2`
    const values=[req.body.userId,req.query.market];
    const response =await client.query(query,values);
    res.json(response.rows);
})

orderRouter.get("/fills",async (req,res)=>{
    console.log(req.body.userId)
    const query=`SELECT * FROM orderTable 
                 WHERE userId=$1 AND executedQty=quantity::Integer`
    const values=[req.body.userId];
    const response =await client.query(query,values);
    res.json(response.rows);
})


orderRouter.get("/assets",async (req,res)=>{
    const userId=req.body.userId;
    const response=await RedisManager.getInstance().sendAndAwait({
        type:"GET_ASSETS",
        data:{
            userId:String(userId)
        }
    })
    res.json(response.payload)
})