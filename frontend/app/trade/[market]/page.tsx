"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";

import { useState } from "react";

import { Trades } from "@/app/components/Trades";
import { UserAssets } from "@/app/components/UserAssets";
export default function Page() {
    const { market } = useParams();
    const [view, setView] = useState<"depth" | "trade">("depth"); // State to track the selected view

    return (
        <div className="flex flex-row h-full space-x-10 w-full">
            <div className="flex flex-col flex-1">
                <MarketBar market={market as string} />
                <div className="flex flex-row h-[500px] border-y border-slate-800 space-x-2">
                    <div className="flex flex-col flex-1 bg-baseBackgroundL1">
                        <TradeView market={market as string} />
                    </div>
                    <div className="flex flex-col w-[250px] overflow-hidden bg-baseBackgroundL1">
                        <div className="items-center justify-start flex-row flex space-x-2"><div className="flex justify-center flex-col cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3">
                            <button
                                    onClick={() => setView("depth")}
                                    className={`px-2 py-1 ${view === "depth" ? "font-bold" : ""}`}
                                >
                                    Depth
                            </button>
                        </div>
                        <div className="flex justify-center flex-col cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextHighEmphasis px-3 bg-baseBackgroundL2">
                            <button
                                onClick={() => setView("trade")}
                                className={`px-2 py-1 ${view === "trade" ? "font-bold" : ""}`}
                            >
                                Trade
                            </button>
                        </div></div>
                        {/* Conditionally render based on the selected view */}
                        {view === "depth" ? (
                            <Depth market={market as string} />
                        ) : (
                            <Trades market={market as string} />
                        )}
                    </div>
                </div>
                <UserAssets/>
            </div>
            <div className="w-[2px] flex-col border-slate-800 border-l"></div>
            <div>
                <div className="flex flex-col w-[250px]">
                    <SwapUI market={market as string} />
                </div>
            </div>
        </div>
    );
}
