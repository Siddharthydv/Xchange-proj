require('dotenv').config();
import { Client } from 'pg';
import { createClient } from 'redis';  
import { DbMessage } from './types';
import { newOrder, PricesTable, updateOrders, updateTrades } from './dbFunctions';
import { refreshViews } from './cron';

const pgClient = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD,
    port: 5432,
});
pgClient.connect();

async function main() {
    console.log("inside main");
    console.log(process.env.REDIS_DOMAIN,process.env.REDIS_PORT)
    const redisClient = createClient(
        {
            socket:{
                host:process.env.REDIS_DOMAIN,
                port:Number(process.env.REDIS_PORT)
            }
        }
    );
    await redisClient.connect();
    console.log("connected to redis");

    while (true) {
        const response = await redisClient.rPop("db_processor" as string)
       try{
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
       }catch(e){console.log(e)};
       }

}

main();

setInterval(() => {
    refreshViews()
}, 1000 * 10 );
