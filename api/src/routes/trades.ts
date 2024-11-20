import { Router } from "express";
import { Client } from "pg";
const client = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
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
