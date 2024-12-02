import { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const wss = new WebSocketServer({host: '0.0.0.0', port: Number(process.env.PORT)});

wss.on("connection", (ws, req) => {
    
    
    UserManager.getInstance().addUser(ws);
    console.log("Added new user");
});

