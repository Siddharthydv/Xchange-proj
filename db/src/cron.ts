import { Client } from 'pg'; 

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD,
    port: 5432,
});
client.connect();

export async function refreshViews() {

    await client.query('REFRESH MATERIALIZED VIEW SOL_klines_1m');
    await client.query('REFRESH MATERIALIZED VIEW SOL_klines_1h');
    await client.query('REFRESH MATERIALIZED VIEW SOL_klines_24h');
    await client.query('REFRESH MATERIALIZED VIEW market_summary');
    console.log("Materialized views refreshed successfully");
}

refreshViews().catch(console.error);

setInterval(() => {
    refreshViews()
}, 1000 * 10 );