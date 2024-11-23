import { getTrades } from "../utils/httpClient";
import { useEffect, useState } from "react";
import { Trade } from "../utils/types";
import { SignalingManager } from "../utils/SignalingManager";
export function Trades({market}:{market:string}){
    const [trades,setTrades]=useState<Trade[]>();
    let c=0;
    useEffect(()=>{
      getTrades(market).then(t =>{
        t.sort((a, b) => b.timestamp - a.timestamp);
        setTrades(t);
      } );
      SignalingManager.getInstance().registerCallback("trade",(data:Trade)=>{
        console.log(data);
        setTrades((prev)=>{
          const newTrades = [data, ...(prev || [])];
          newTrades.sort((a, b) => b.timestamp - a.timestamp);
        return newTrades;
        })
      },`TRADE-${market}`)
      SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`trade@${market}`]});
      return ()=>{
        SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`trade@${market}`]});
        SignalingManager.getInstance().deRegisterCallback("trade", `TRADE-${market}`);
      }
    },[])
    return (
        <div className="overflow-y-auto">
          <div className="flex flex-row border-b-1 border-b-borderColor w-full flex-1"><p className="w-[33.3%] px-1 text-left text-xs font-semibold text-baseTextMedEmphasis">Price (USDC)</p><p className="w-[33.3%] px-1 text-right text-xs font-semibold text-baseTextMedEmphasis">Qty (SOL)</p></div>
          {trades &&
            trades.map((trade, index) => {
              let date=new Date(Number(trade.timestamp))
              let time=date.toLocaleTimeString();
                c++;
                 return(
              <div key={c} className="flex flex-row w-full cursor-default bg-transparent hover:bg-white/4">
                <div className="flex items-center flex-row py-2 w-[33.3%] ">
                  <div className={`w-full text-sm font-normal capitalize tabular-nums text-baseTextHighEmphasis/90 text-redText px-1 text-left undefined`}>{Number(trade.price).toPrecision(4)}
                  </div>
                  </div><div className="flex items-center flex-row py-2 w-[33.3%] ">
                    <div className="w-full text-sm font-normal capitalize tabular-nums text-baseTextHighEmphasis/90 text-right undefined">{Number(trade.quantity)}
                    </div></div><div className="flex items-center flex-row py-2 w-[33.3%] ">
                    <div className="w-full text-sm font-normal capitalize tabular-nums text-baseTextHighEmphasis/90 text-right text-baseTextMedEmphasis undefined">
                      {time}
                    </div>
                  </div>
                </div>
            )})}
        </div>
      );   
}
