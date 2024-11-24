import Image from "next/image";
import myImage from "../public/bg2.jpg"
import myImage1 from '../public/bg4.webp'
import { Markets } from "./components/Markets";
export default function Home() {
  return (
    <div className="relative bg-black  flex flex-grow scrollbar-none p-10 items-center justify-center">
    <Image className="rounded-md "
      src={myImage} // Replace with your image path
      alt="Landing Page"
      layout="fill" // Makes the image cover the parent container
      objectFit="cover" // Ensures the image scales properly
      priority // Ensures the image loads faster
    />
    <div className="z-10 text-5xl font-extrabold">Trade Smarter, Faster, and Securely — Your Gateway to the Future of Crypto</div>
    {/* <div className="z-10 flex border border-red-500 bg-black bg-opacity-50  w-fit space-x-2 h-2/3">
      <div className="text text-4xl font-mono font-bold">
        YOUR ONE STOP <br></br>TO EXCHANGE CRYPTO
      </div>
    <Image className="rounded-md  "
      src={myImage1} // Replace with your image path
      alt="Landing Page"
       // Makes the image cover the parent container
      objectFit="cover" // Ensures the image scales properly
      priority // Ensures the image loads faster
    />
    </div> */}
    
  </div>
  

  );
}
