import { Client } from 'pg';
import { createClient } from 'redis';  
import { DbMessage } from './types';
import { newOrder, PricesTable, updateOrders, updateTrades } from './dbFunctions';

const pgClient = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});
pgClient.connect();

async function main() {
    const redisClient = createClient();
    await redisClient.connect();
    console.log("connected to redis");

    while (true) {
        const response = await redisClient.rPop("db_processor" as string)
        if (!response) {

        }  else {
            const data: DbMessage = JSON.parse(response);
            if (data.type === "TRADE_ADDED") {
                console.log(data.data);
               await  PricesTable(pgClient,data.data);
                await updateTrades(pgClient,data.data)
                await pgClient.query('REFRESH MATERIALIZED VIEW market_summary');
                const query=`SELECT * FROM market_summary WHERE symbol=$1`;
               console.log(data.data.market)
                const values=[data.data.market];
                const response=await pgClient.query(query,values);
                //@ts-ignore
                const row=response.rows[0];
                row.e='ticker';
                console.log("ticker response=",response.rows)
               redisClient.publish(`ticker.${data.data.market}`,JSON.stringify({stream:`ticker.${data.data.market}`,data:row}));
                
               
            }
            else if(data.type==="ORDER_UPDATE"){
                const orderData=data.data;
                if(orderData.market)
                    await newOrder(pgClient,orderData)
                else
                   await updateOrders(pgClient,orderData);
            }
        }
    }

}

main();