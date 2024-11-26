require('dotenv').config();
  const { Client } = require('pg');
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.HOST,
  database: process.env.DATABASE as string,
  password: process.env.PASSWORD,
  port: 5432,
});

export async function orderTable() {
  await client.connect();
  const query = `CREATE TABLE IF NOT EXISTS orderTable (
    orderId VARCHAR(50) PRIMARY KEY,
    executedQty NUMERIC,
    market VARCHAR(50),
    price VARCHAR(10),
    quantity VARCHAR(10),
    side VARCHAR(4),
    userId VARCHAR(10)
  );`;
  try {
    await client.query(query);
    console.log("orderTable created");
  } catch (error) {
    console.log("orderTable error", error);
  }
}
export async function userTable(){
  
  const query=`
        DROP TABLE IF EXISTS userTable;
        CREATE TABLE IF NOT EXISTS userTable (
        userId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        email VARCHAR(20) UNIQUE NOT NULL,
        username VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL
  );`
  try{
    await client.query(query);
    console.log("usertable created");
  }catch(e){
    console.log("usertTable",e);
  }
}
async function initializeDB() {
  const markets = ["SOL","BTC"];
  for(const market of markets){
      await client.query(`
        DROP  TABLE IF EXISTS ${market}_prices CASCADE;
        CREATE TABLE IF NOT EXISTS ${market}_prices (
          time TIMESTAMP WITH TIME ZONE NOT NULL,
          price DOUBLE PRECISION,
          volume DOUBLE PRECISION,
          currency_code VARCHAR(10)
        );
      `);

      await client.query(`
        SELECT create_hypertable('${market}_prices','time', 'price', 2);
      `);

      await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS  ${market}_klines_1m AS
        SELECT
         time_bucket('1 minute', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
            FROM ${market}_prices
        GROUP BY bucket, currency_code;
      `);

      await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS ${market}_klines_1h AS
        SELECT
          time_bucket('1 hour', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
            FROM ${market}_prices
        GROUP BY bucket, currency_code;
      `);

      await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS ${market}_klines_24h AS
        SELECT
          time_bucket('1 week', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM ${market}_prices
        GROUP BY bucket, currency_code;
      `);
      }
    console.log("Database initialized successfully");
}

async function initializeTrade() {
    const query = `CREATE TABLE IF NOT EXISTS Trades (
      id VARCHAR(255) PRIMARY KEY,
      isBuyerMaker BOOLEAN,
      price DECIMAL(18, 8) NOT NULL,
      quantity VARCHAR(255) NOT NULL,
      quoteQuantity VARCHAR(255) NOT NULL,
      timestamp BIGINT NOT NULL,
      market VARCHAR(10) NOT NULL
    );`;
    try {
      await client.query(query);
      await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS market_summary AS
       SELECT
        market AS symbol, 
        FIRST(price, timestamp) AS firstPrice,
        MAX(price) AS high,
        LAST(price, timestamp) AS lastPrice,
        MIN(price) AS low,
        LAST(price, timestamp) - FIRST(price, timestamp) AS priceChange,
        (LAST(price, timestamp) - FIRST(price, timestamp)) / FIRST(price, timestamp) * 100 AS priceChangePercent,
        SUM(quoteQuantity::NUMERIC) AS quoteVolume,
        COUNT(*) AS trades,
        SUM(quantity::NUMERIC) AS volume
    FROM Trades
    WHERE timestamp >= EXTRACT(EPOCH FROM NOW() - INTERVAL '24 hours') * 1000 -- Ensure the timestamp is within the last 24 hours
    GROUP BY market;
`)
      console.log(`Trades table created`);
    } catch (e) {
      console.log("initializeTrade error", e);
    }
}

async function main() {
  try {
    await orderTable();
    await userTable();
    await initializeDB();
    await initializeTrade();
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

main();
