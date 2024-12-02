import jwt from "jsonwebtoken"
import { Request,Response } from "express";
import { Client } from "pg";
type Rowtype=[
  {
    username:string,
    userid:string,
    password:string,
    email:string

  }
]
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
        if(payloads.rows.length===0){
          console.log('insidepay',payloads.rows)
          return res.json("user does not exist")
            
        }
        console.log("game over")
        if(password!==(payloads.rows as Rowtype)?.[0].password)
        {
          return res.json("invalid password")
        }
       	const token = jwt.sign(payloads?.rows?.[0],"secret",options)
        res.cookie('token', token, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          maxAge: 3600000 // 1 hour
        });
        console.log(token)
        res.status(200).json(payloads.rows[0]);

}
