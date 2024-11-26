import jwt from "jsonwebtoken"
import { Request,Response } from "express";
import { Client } from "pg";
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.HOST,
  database: process.env.DATABASE as string,
  password: process.env.PASSWORD,
  port: Number(process.env.PG_PORT),});
client.connect();
export async function signIn(req:Request,res:Response){
        console.log('inside')
        const email=req.body.email;
        const password=req.body.password;
        console.log(email)
        const options={
            expiresIn:'1h',
        }
        //check whether user is registered or not
        const query=`SELECT * FROM userTable WHERE email=$1`
        const values=[email]
        const payloads=await client.query(query,values); 
        if(!payloads.rows){
            res.sendStatus(200).json("user does not exist");
            return;
        }
        console.log(payloads.rows)
        if(!payloads)
          return res.sendStatus(404).json("user does not exists")
        const token = jwt.sign(payloads?.rows?.[0],"secret",options)
        res.cookie('token', token, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
          maxAge: 3600000 // 1 hour
        });
        console.log(token)
        res.status(200).json(payloads.rows[0]);

}