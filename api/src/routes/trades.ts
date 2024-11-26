import { Router } from "express";
import { Client } from "pg";
const client = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD,
    port: Number(process.env.PG_PORT),
});
client.connect();
export const tradesRouter = Router();

tradesRouter.get("/", async (req, res) => {
    console.log("entered")
    const market = req.query.symbol;
    console.log("market=",market)
    const query = `SELECT id,isBuyerMaker,price,quantity,quoteQuantity,timestamp FROM Trades WHERE market=$1;`;
    const values = [market];
    const result = await client.query(query,values);
    const response=result.rows
    res.json(response);
})
