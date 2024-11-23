import express from "express";
import cors from "cors";
import { orderRouter } from "./routes/order";
import { depthRouter } from "./routes/depth";
import { tradesRouter } from "./routes/trades";
import { klineRouter } from "./routes/kline";
import { tickersRouter } from "./routes/ticker";
import { signIn } from "./routes/signIn";
import { SignUp } from "./routes/SIgnUp";
import cookieParser   from 'cookie-parser'
const app = express();
app.use(cors({
    origin: 'http://localhost:3002',  // Replace with your frontend URL
    credentials: true                   // Allow cookies and other credentials
  }));
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1/order", orderRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/trades", tradesRouter);
app.use("/api/v1/klines", klineRouter);
app.use("/api/v1/tickers", tickersRouter);
app.post('/api/v1/signIn',signIn)
app.post('/api/v1/signUp',SignUp)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});