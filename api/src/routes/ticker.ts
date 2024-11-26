import { Client } from "pg";
import { Router } from "express";
const pgClient = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD,
    port: Number(process.env.PG_PORT),
});
pgClient.connect();
export const tickersRouter = Router();

tickersRouter.get("/", async (req, res) => {  
    // console.log("response")
    // const market="SOL_USDC"  //generalize it 
    const query = `SELECT * FROM market_summary`;
    const response=await pgClient.query(query)
    // console.log(response.rows[0]);
    // const rows=response.rows[0];

    res.json(response.rows)
    // res.json({"firstPrice": rows.open,
    //     "high": rows.high,
    //     "lastPrice":rows.close,
    //     "low": rows.low,
    //     "priceChange": rows.open-rows.last,
    //     "priceChangePercent": (rows.open-rows.last/rows.high)*100,
    //     "quoteVolume": rows.quoteVolume,
    //     "symbol":market,
    //     "trades": rows.trades,
    //     "volume":rows.quoteVolume});
})