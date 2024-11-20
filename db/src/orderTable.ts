import { Client } from "pg";

export async function orderTable(client:Client){
    const query=`CREATE TABLE orderTable (
    orderId VARCHAR(50) PRIMARY KEY,
    executedQty NUMERIC,
    market VARCHAR(50),
    price VARCHAR(10),
    quantity VARCHAR(10),
    side VARCHAR(4) 
);`
 await client.query(query);
} 