import Image from "next/image";
import myImage from "../public/bg2.jpg"
import { Markets } from "./components/Markets";
export default function Home() {
  return (
    <div className="relative bg-gray-100 h-screen flex items-center justify-center scrollbar-none p-10 ">
    <Image className="rounded-md "
      src={myImage} // Replace with your image path
      alt="Landing Page"
      layout="fill" // Makes the image cover the parent container
      objectFit="cover" // Ensures the image scales properly
      priority // Ensures the image loads faster
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
        Welcome to Our Website
      </h1>
    </div>
  </div>
  

  );
}
