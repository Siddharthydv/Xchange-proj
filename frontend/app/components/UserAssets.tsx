import { useState } from "react"
import { OrderHistory } from "./assets/OrderHistory";
import { OpenOrders } from "./assets/OpenOrders";
import { Fills } from "./assets/Fills";
import { useUser } from "./UserContext";
import { Assets } from "./assets/Assets";

export function UserAssets({market}:{market:string}){
  const [column,setcolumn]=useState("Assets");
  const user=useUser();
  console.log("userAssests",user?.user);
    return <div className="flex flex-col">
    <div className="flex flex-col overflow-hidden rounded-lg bg-baseBackgroundL1">
      <div className="flex items-center justify-between flex-row p-4">
        <div className="flex flex-row items-center justify-center space-x-2">
          <div onClick={()=>{setcolumn("Assets")}} 
            className={`flex flex-col ${column==="Assets"?'bg-pink-300':''} justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3`}
          >
            My Assets
          </div>
          <div
            className="flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3"
          >
            <div onClick={()=>{setcolumn("OpenOrders")}} className={`flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] ${column==="OpenOrders"?'bg-pink-300':''} text-baseTextHighEmphasis px-3`}>
              Open Orders</div>
          </div>
          <div onClick={()=>{setcolumn("FillHistory")}}
            className={`flex flex-col ${column==="FillHistory"?'bg-pink-300':''} justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3`}
          >
            Fill History
          </div>
          <div onClick={()=>{setcolumn("OrderHistory")}}
            className={`flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] ${column==="OrderHistory"?'bg-pink-300':''} text-baseTextHighEmphasis px-3`}
          >
            Order History
          </div>
        </div>
      </div>
            <div className="flex flex-1">
              <div
                className="flex flex-col items-center justify-center flex-1 gap-6 rounded-xl bg-baseBackgroundL2 "
              >
            {column==="Assets"&&user?.user &&(<Assets/>)}
            {column==="OrderHistory"&&user?.user && (<OrderHistory market={market}/>)}
            {column==="FillHistory" &&  (<Fills market={market}/>) }
            {column==="OpenOrders" &&   (<OpenOrders market={market}/>)}
              </div>
            </div>
          </div>
      
     
    <div className="flex flex-1"></div>
  </div>
  
}