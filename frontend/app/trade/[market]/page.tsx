"use client"; 
import { MarketBar } from "@/app/components/MarketBar"; 
import { SwapUI } from "@/app/components/SwapUI"; 
import { TradeView } from "@/app/components/TradeView"; 
import { Depth } from "@/app/components/depth/Depth"; 
import { useParams } from "next/navigation"; 
import { useState } from "react"; 
import { Trades } from "@/app/components/Trades"; 
import { UserAssets } from "@/app/components/UserAssets"; 
import { UserProvider, useUser } from "@/app/components/UserContext";  

export default function Page() {   
  const { market } = useParams();   
  const [view, setView] = useState<"depth" | "trade">("depth");   
  const user = useUser();    

  return (   
    <>
      {/* Outer container with overflow-x hidden */}
      <div className="flex flex-row h-full w-full overflow-x-hidden space-x-3 ">
        <div className="flex flex-col flex-1 space-y-4 space-x-4">
          {/* Added space between components with space-y-4 */}
          <MarketBar market={market as string} />
          
          <div className="flex flex-row h-[500px] border-y border-slate-800 space-x-5 box-border ">
            {/* Left Content */}
            <div className="flex flex-col flex-1 bg-baseBackgroundL1 overflow-hidden ">
              <TradeView market={market as string} />
            </div>
             
            {/* Middle Panel */}
            <div className="flex flex-col w-[300px] h-full ">
              <div className="items-center justify-start flex-row flex space-x-2">
                {/* Depth Button */}
                <div className="flex justify-center flex-col cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3">
                  <button
                    onClick={() => setView("depth")}
                    className={`px-2 py-1 ${view === "depth" ? "font-bold" : ""}`}
                  >
                    Depth
                  </button>
                </div>
                {/* Trade Button */}
                <div className="flex justify-center flex-col cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextHighEmphasis px-3 bg-baseBackgroundL2">
                  <button
                    onClick={() => setView("trade")}
                    className={`px-2 py-1 ${view === "trade" ? "font-bold" : ""}`}
                  >
                    Trade
                  </button>
                </div>
              </div>
              {/* Conditionally render based on the selected view */}
              {view === "depth" ? (
                <Depth market={market as string} />
              ) : (
                <Trades market={market as string} />
              )}
            </div>
          </div>
          
          <UserAssets market={market as string} />
        </div>
         
        {/* Divider */}
        <div className="w-[2px] flex-col border-slate-800 border-l"></div>
         
        {/* Right Content */}
        <div className="flex flex-col w-[380px] overflow-hidden">
          <SwapUI market={market as string} />
        </div>
      </div>
    </>
  ); 
}