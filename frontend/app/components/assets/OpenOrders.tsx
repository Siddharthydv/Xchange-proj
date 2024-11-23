import { openOrders } from "@/app/utils/httpClient";
import { useEffect, useState } from "react";
type OpenOrders={
    executedqty: string
    market: string
    orderid: string
    price: string
    quantity: string
    side: string
    userid: string
}
export function OpenOrders({market}:{market:string}){
    const [data,setData]=useState<OpenOrders[]>([])
    useEffect(()=>{
        async function A(){
            const response:OpenOrders[]= await openOrders(market);
            console.log(response)
            setData(response);
            }
            A();
    },[market])
    return <>
    <table className="min-w-full">
        <thead>
    <tr>
    
        <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
        <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-start text-left">
            Asset
        </div>
        </th>

        <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
        <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
            <button type="button" className="" data-rac="" id="react-aria7551413685-:r7j:">Side</button>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down h-4 w-4"
            >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
            </svg>
        </div>
        </th>
        
        
        <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
        <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
            <button type="button" className="" data-rac="" id="react-aria7551413685-:r7m:">Price</button>
        </div>
        </th>
    
        <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
        <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
            Qty
        </div>
        </th>
        
        <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
        <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
            ExQty
        </div>
        </th>
    </tr>
        </thead>
        <tbody className="gap-2 divide-y  divide-baseBorderLight">
            {data?.map(record=>{
                return <tr className="hover:bg-white/4">
                {/* Asset Column */}
                <td className="w-[5%] px-1 py-2 text-sm tabular-nums">
                    <a href="/trade/AAVE_USDC">
                    <div className="flex items-center py-0">
                        <div
                        className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
                        style={{ width: "36px", height: "36px" }}
                        >
                        <div className="relative">
                            <img
                            alt="AAVE Logo"
                            loading="lazy"
                            width="36"
                            height="36"
                            decoding="async"
                            data-nimg="1"
                            className=""
                            src="https://backpack.exchange/coins/aave.svg"
                            style={{ color: "transparent" }}
                            />
                        </div>
                        </div>
                        <div className="ml-2 flex flex-col">
                        <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
                            {record.market}
                        </p>
                        
                        </div>
                    </div>
                    </a>
                </td>
        
                {/* Total Balance Column */}
                <td className="text-right w-[20%] px-1 py-2 text-sm tabular-nums">
                    <div className="flex items-end flex-col gap-1.5">
                    <p className="font-medium text-baseTextHighEmphasis">{record.side}</p>
                    
                    </div>
                </td>
        
                {/* Available Balance Column */}
                <td className="text-right w-[20%] px-1 py-2 text-sm tabular-nums">
                    <div className="flex items-end flex-col">
                    <p className="font-medium text-baseTextHighEmphasis">{record.price}</p>
                    </div>
                </td>
        
                {/* Open Orders Column */}
                <td className="text-right w-[20%] px-1 py-2 text-sm tabular-nums">
                    <div className="flex items-end flex-col">
                    <p className="font-medium text-baseTextHighEmphasis">{record.quantity}</p>
                    </div>
                </td>
                <td className="text-right w-[20%] px-1 py-2 text-sm tabular-nums">
                    <div className="flex items-end flex-col">
                    <p className="font-medium text-baseTextHighEmphasis">{record.executedqty}</p>
                    </div>
                </td>
                {/* Actions Column */}
              
                        </tr>
            })}
                
        </tbody>
    </table>
    </>
}
