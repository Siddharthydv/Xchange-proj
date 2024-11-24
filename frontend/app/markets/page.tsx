import { Markets } from "../components/Markets";
import Image from "next/image";
import myImage from '../../public/bg3.jpg'
export default function Page() {
    return  <main className="flex min-h-screen flex-col items-center justify-between p-24 space-y-3">
      <div className="relative bg-gray-100 rounded-md border border-black flex w-3/5 flex-1 items-center justify-center scrollbar-none p-10 ">
    <Image className=" "
      src={myImage} // Replace with your image path
      alt="Landing Page"
      layout="fill" // Makes the image cover the parent container
      objectFit="cover" // Ensures the image scales properly
      priority // Ensures the image loads faster
    />
  
  </div>
    <Markets />
  </main>
}