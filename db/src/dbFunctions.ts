    import { Client } from "pg";

export async function newOrder(pgClient:Client,orderData:any)
{
    console.log("creating new order");
                    const {orderId,executedQty,market,quantity,price,side,userId}=orderData;
                    const query=`INSERT INTO orderTable (orderId,market,executedQty,quantity,price,side,userId) VALUES ($1,$2,$3,$4,$5,$6,$7 )`;
                    const values=[orderId,market,executedQty,quantity,price,side,userId];
                    const response=await pgClient.query(query,values);
                    console.log(response)
                    return response;
}           

export async function updateOrders(pgClient:Client,orderData:any)
{
    console.log("Updating fill orders");
                    const {orderId,executedQty}=orderData;
                    const query=`UPDATE orderTable
                    SET executedQty = executedQty + $1
                    WHERE orderId = $2`;
                    const values=[executedQty,orderId];
                    await pgClient.query(query,values);
}

export async function PricesTable(pgClient:Client,data:any)
{
    console.log("adding data");
               
                const price = data.price;
                const timestamp = new Date(data.timestamp);
                const volume=data.quantity
                const [asset,quoteAsset]=data.market.split("_");
                const query = `INSERT INTO ${asset}_prices (time, price,volume,currency_code) VALUES ($1, $2,$3,$4)`;
                // TODO: How to add volume?
                const values = [timestamp,price,volume,quoteAsset];
                await pgClient.query(query, values);
                console.log(data);
}   

export async function updateTrades(pgClient:Client,data:any){
    console.log('updating Tradestable')
    const {market,id,isBuyerMaker,price,quantity,quoteQuantity,timestamp}=data;

    const query=`INSERT into Trades (id,isBuyerMaker,price,quantity,quoteQuantity,timestamp,market) 
                 VALUES($1,$2,$3,$4,$5,$6,$7)`;
    const values=[id,isBuyerMaker,price,quantity,quoteQuantity,timestamp,market]
    await pgClient.query(query,values);
}