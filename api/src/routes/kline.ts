import { Client } from 'pg';
import { Router } from "express";
import { RedisManager } from "../RedisManager";
interface RequestBody {
    market: string;
    interval: string;
    startTime: string;
    endTime: string;
  }
  
const pgClient = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD,
    port: Number(process.env.PG_PORT),
});
pgClient.connect();

export const klineRouter = Router();

klineRouter.post("/", async (req, res) => {
    const { market, interval, startTime, endTime }:{market:string,interval:string, startTime:string, endTime:string } = req.body;
    let query;
    console.log(req.body)
    let hey='1h';
    switch (hey) {
        case '1m':
            query = `SELECT * FROM ${market.split("_")[0]}_klines_1m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '1h':
            query = `SELECT * FROM ${market.split("_")[0]}_klines_1h WHERE  bucket >= $1 AND bucket <= $2`;
            break;
        case '1w':
            query = `SELECT * FROM ${market.split("_")[0]}_klines_24h WHERE bucket >= $1 AND bucket <= $2`;
            break;
        default:
            return res.status(400).send('Invalid interval');
    }

    try {
        //@ts-ignore
        const result = await pgClient.query(query, [new Date(startTime * 1000 as string), new Date(endTime * 1000 as string)]);
        res.json(result.rows.map(x => ({
            close: x.close,
            end: x.bucket,
            high: x.high,
            low: x.low,
            open: x.open,
            quoteVolume: x.quoteVolume,
            start: x.start,
            trades: x.trades,
            volume: x.volume,
        })));
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});