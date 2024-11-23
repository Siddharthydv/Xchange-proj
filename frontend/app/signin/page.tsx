"use client"
import React from "react";
import axios from "axios";
import { signIn } from "../utils/httpClient";
import { useRouter } from "next/navigation";
import { useUser } from "../components/UserContext";

export default function SignIn() {
    const router=useRouter()
    const user=useUser()
    const loginHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget); // Pass the form element
        const email:string= formData.get('email') as string;
        const password = formData.get('password') as string;
        console.log(email,password)
        const response=await signIn(email,password);
        console.log(response)
        if(response){
            user?.setuseronsignin();
            router.push('/trade/SOL_USDC')
        }
    }
    return (
        <div className="thin-scroll flex flex-1 flex-col overflow-auto bg-baseBackgroundL0 text-baseTextHighEmphasis mt-40">
            <div className="relative flex flex-1 flex-col">
                <div className="absolute left-1/2 top-1/2 my-auto h-full w-full max-w-[1280px] -translate-x-1/2 -translate-y-1/2">
                    <img
                        alt="Grid"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="opacity-10"
                        src="/grid-background.svg"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: 0,
                            color: 'transparent',
                        }}
                    />
                    <img
                        alt="Candlesticks"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="opacity-20"
                        src="/candlestick-chart.svg"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: 0,
                            color: 'transparent',
                        }}
                    />
                    <div className="flex h-full w-full">
                        <div className="h-full w-1/2 bg-gradient-to-r from-baseBackgroundL0 to-transparent opacity-80"></div>
                        <div className="h-full w-1/2 bg-gradient-to-l from-baseBackgroundL0 to-transparent opacity-80"></div>
                    </div>
                </div>
                <div className="mx-auto flex h-full flex-1 items-center justify-center bg-cover pb-20">
                    <div className="z-10 w-[380px] space-y-6 rounded-xl border border-baseBorderLight bg-baseBackgroundL1 px-6 pb-6 pt-8">
                        <div className="flex flex-col items-center text-center">
                            <svg
                                width="33"
                                height="48"
                                viewBox="0 0 11 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_1_803)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.54201 1.25805C7.12356 1.25805 7.66905 1.33601 8.1741 1.48059C7.67963 0.328169 6.65297 0 5.51038 0C4.36555 0 3.3371 0.329459 2.84375 1.48738C3.3451 1.33771 3.88824 1.25805 4.4678 1.25805H6.54201ZM4.33478 2.41504C1.57335 2.41504 0 4.58743 0 7.2672V10.02C0 10.288 0.223858 10.5 0.5 10.5H10.5C10.7761 10.5 11 10.288 11 10.02V7.2672C11 4.58743 9.17041 2.41504 6.40899 2.41504H4.33478ZM5.49609 7.29102C6.46259 7.29102 7.24609 6.50751 7.24609 5.54102C7.24609 4.57452 6.46259 3.79102 5.49609 3.79102C4.5296 3.79102 3.74609 4.57452 3.74609 5.54102C3.74609 6.50751 4.5296 7.29102 5.49609 7.29102ZM0 12.118C0 11.8501 0.223858 11.6328 0.5 11.6328H10.5C10.7761 11.6328 11 11.8501 11 12.118V15.0293C11 15.5653 10.5523 15.9998 10 15.9998H1C0.447715 15.9998 0 15.5653 0 15.0293V12.118Z"
                                        fill="#E33E3F"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_803">
                                        <rect width="11" height="16" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                            <h1 className="mt-6 text-2xl font-medium">Sign in</h1>
                        </div>
                        <form onSubmit={loginHandler}>
                            <div className="w-full pb-1.5">
                                <input
                                    className="h-12 w-full rounded-xl border-2 border-solid border-baseBorderLight bg-baseBackgroundL0 px-4 text-neutral-900 text-baseTextHighEmphasis placeholder-baseTextLowEmphasis outline-none ring-0 focus:border-accentBlue focus:ring-0"
                                    name="email"
                                    placeholder="Email"
                                />
                                <div className="h-2"></div>
                            </div>
                            <div className="w-full pb-1.5">
                                <input
                                    className="h-12 w-full rounded-xl border-2 border-solid border-baseBorderLight bg-baseBackgroundL0 px-4 text-neutral-900 text-baseTextHighEmphasis placeholder-baseTextLowEmphasis outline-none ring-0 focus:border-accentBlue focus:ring-0"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <div className="h-2"></div>
                            </div>
                            <div className="mt-4 flex justify-between py-1.5">
                                <div className="flex justify-center space-x-1">
                                    <p className="text-sm font-base text-baseTextHighEmphasis">New here?</p>
                                    <a
                                        className="text-sm font-medium text-accentBlue hover:text-baseTextMedEmphasis"
                                        href="/signup"
                                    >
                                        Sign up
                                    </a>
                                </div>
                                <a
                                    className="text-sm font-medium text-blue-400 hover:text-baseTextMedEmphasis"
                                    href="/forgot-password"
                                >
                                    Forgot Password
                                </a>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    aria-label="Login"
                                    className="h-12 w-full rounded-xl bg-buttonPrimaryBackground px-4 py-2 text-center text-base font-semibold text-buttonPrimaryText hover:opacity-90 focus:outline-none focus:ring-blue-200 disabled:opacity-80 disabled:text-base-600"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
