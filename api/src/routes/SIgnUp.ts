import { Request,Response } from "express";
import { Client } from "pg";
import { RedisManager } from "../RedisManager";
const client = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
  });
  client.connect();
export async function SignUp(req:Request,res:Response){
    const {username ,password,email}=req.body;
    const query=`INSERT INTO userTable(username,password,email) 
                 VALUES($1,$2,$3)
                 RETURNING userId,username`;
    const values=[username,password,email];
    const response=await client.query(query,values);
    console.log(response.rows);
    //send this data to engine for creating a user inside a engine with the corresponding username and userId
   const userid= await RedisManager.getInstance().sendAndAwait({type:"CREATE_USER",data:response?.rows?.[0]});
    res.json(userid)
}