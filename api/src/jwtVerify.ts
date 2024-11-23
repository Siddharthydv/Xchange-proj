import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
type decodedToken={
  userid: Number
  email: string,
  username: string,
  password: string,
  iat: Number,
  exp: Number,
}
// Middleware to authenticate token
export const jwtVerify = (req: Request, res: Response, next: NextFunction)=> {
  const token = req.cookies?.token;
  console.log(token)
  if (!token) return res.sendStatus(401);  // Unauthorized if no token
  
  jwt.verify(token,'secret', (err:any, user:any) => {
    if (err) return res.sendStatus(403);  // Forbidden if token is invalid
    console.log(jwt.decode(token))
    req.body.userId=String ((jwt.decode(token) as JwtPayload)?.userid);
  //  req.body.userId= // Attach user info to the request object
    next();  // Proceed to the next middleware or route handler
  });
};

