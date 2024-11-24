"use client"
import { useRouter } from "next/navigation";
import { signup } from "../utils/httpClient"
import React from "react";

export default function SignUp(){
    const router=useRouter()
    const onclickhanddler=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget); // Pass the form element
        const email:string= formData.get('email') as string;
        const password = formData.get('password') as string;
        const username=formData.get('username') as string
        console.log(username,password,email)
        const userCreated=await signup(email,password,username);
        if(userCreated)
            router.push('/signin');
    }

    return <div className="flex justify-center items-center h-full"><div className="z-10 rounded-xl border border-baseBorderLight bg-baseBackgroundL1 px-6 pb-6 pt-8 space-y-6 w-[380px] ">
    <div className="flex flex-col items-center text-center">
      <svg width="33" height="48" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <h1 className="mt-6 text-2xl font-medium">Create Account</h1>
    </div>
    <form onSubmit={onclickhanddler}>
      <div>
        <div className="w-full pb-1.5">
          <input
            className="h-12 rounded-xl border-2 border-solid bg-baseBackgroundL0 px-4 text-base text-baseTextHighEmphasis placeholder-baseTextLowEmphasis outline-none ring-0 focus:ring-0 border-baseBorderLight focus:border-accentBlue w-full"
            name="email"
            placeholder="Email"
          />
          <div className="h-2"></div>
        </div>
      </div>
      <div>
        <div className="w-full pb-1.5">
          <input
            className="h-12 rounded-xl border-2 border-solid bg-baseBackgroundL0 px-4 text-black text-baseTextHighEmphasis placeholder-baseTextLowEmphasis outline-none ring-0 focus:ring-0 border-baseBorderLight focus:border-accentBlue w-full"
            name="username"
            placeholder="Username"
          />
          <div className="h-2"></div>
        </div>
      </div>
      <div className="pb-2">
        <div className="flex h-12 justify-between rounded-xl border-2 border-solid bg-baseBackgroundL0 border-baseBorderLight focus-within:border-accentBlue">
          <input
            type="password"
            className="rounded-xl border-0 bg-baseBackgroundL0 pl-4 text-black text-baseTextHighEmphasis placeholder-baseTextLowEmphasis outline-none ring-0 focus:ring-0 w-full"
            name="password"
            placeholder="Password"
          />
          <button className="bg-transparent" type="button" tabIndex={-1}>
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
              className="lucide lucide-eye my-auto mr-3 h-5 w-5 text-baseIcon"
            >
              <path
                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
              ></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <div className="h-2"></div>
        <div className="flex h-5 justify-between px-1">
          <div className="my-auto flex space-x-1.5">
            <div className="h-1.5 w-8 rounded bg-base-700"></div>
            <div className="h-1.5 w-8 rounded bg-base-700"></div>
            <div className="h-1.5 w-8 rounded bg-base-700"></div>
            <div className="h-1.5 w-8 rounded bg-base-700"></div>
            <div className="h-1.5 w-8 rounded bg-base-700"></div>
          </div>
        </div>
      </div>
      <div className="mt-2 pb-2">
        <div className="flex h-12 justify-between rounded-xl border-2 border-solid bg-baseBackgroundL0 border-baseBorderLight focus-within:border-accentBlue">
          <input
            type="password"
            className="rounded-xl border-0 bg-baseBackgroundL0 pl-4 text-black text-baseTextHighEmphasis placeholder-baseTextLowEmphasis outline-none ring-0 focus:ring-0 w-full"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <button className="bg-transparent" type="button" tabIndex={-1}>
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
              className="lucide lucide-eye my-auto mr-3 h-5 w-5 text-baseIcon"
            >
              <path
                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
              ></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <div className="h-2"></div>
      </div>
      <div className="mt-1 flex">
        <div className="flex items-center flex-row">
          <input
            className="form-checkbox rounded border-2 border-baseBorderMed bg-base-950 text-transparent shadow-transparent outline-none ring-0 ring-transparent checked:border-baseBorderMed checked:bg-base-900 checked:hover:border-baseBorderMed focus:bg-base-900 focus:ring-0 focus:ring-offset-0 focus:checked:border-baseBorderMed h-5 w-5 cursor-pointer"
            type="checkbox"
            name="agreed"
          />
        </div>
        <label className="ml-2 text-xs/5">
          By signing up, I agree to the
          <a
            className="font-medium text-accentBlue hover:text-baseTextMedEmphasis text-xs"
            target="_blank"
            href="https://support.backpack.exchange/en/articles/484225"
          >
            User Agreement
          </a>
          and
          <a
            className="font-medium text-accentBlue hover:text-baseTextMedEmphasis text-xs"
            target="_blank"
            href="https://support.backpack.exchange/articles/privacy-policy"
          >
            Privacy Policy
          </a>.
        </label>
      </div>
      <div className="mt-6">
        <button 
          type="submit"
          aria-label="Login"
          className="h-12 rounded-xl bg-buttonPrimaryBackground px-4 py-2 text-center text-base font-semibold text-buttonPrimaryText hover:opacity-90 focus:outline-none focus:ring-blue-200 disabled:text-base-600 disabled:opacity-80 w-full"
        >
          Create Account
        </button>
      </div>
      <div className="w-full border-t border-solid border-baseBorderLight mt-6 mb-4"></div>
  
    </form>
  </div>
  </div>
}