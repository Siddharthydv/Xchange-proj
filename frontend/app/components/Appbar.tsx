"use client";

import { usePathname } from "next/navigation";
import { PrimaryButton, SuccessButton } from "./core/Button"
import { useRouter } from "next/navigation";
import { UserContext, UserProvider, useUser } from "./UserContext";
import { useContext, useState } from "react";

export const Appbar = () => {
    const route = usePathname();
    const router = useRouter()
    const User=useContext(UserContext)
    console.log("appbar",User)
    function Logout(){
        console.log("logout")
        User?.setUser(null);
         document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        router.push('/');
    }
    return<div className="text-white border-b border-slate-800">
        <div className="flex justify-between items-center p-2">
            <div className="flex">
                <div className={`text-xl pl-4 flex flex-col justify-center cursor-pointer text-white`} onClick={() => router.push('/')}>
                    Exchange
                </div>
                <div className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/markets') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/markets')}>
                    Markets
                </div>
                <div className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    Trade
                </div>
            </div>
            <div className="flex">
                <div className="p-2 mr-2">

               {!User?.user &&(<><SuccessButton>SignUp</SuccessButton>
                    <PrimaryButton>SignIn</PrimaryButton></>)}
                {User?.user &&(<SuccessButton onClick={Logout} >LogOut</SuccessButton>)}
                </div>
            </div>
        </div>
    </div>

}

