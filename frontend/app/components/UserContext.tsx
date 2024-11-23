"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwt from "jsonwebtoken"
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
export type UserContextType = {
    user: User | null; // user can be an object or null
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setuseronsignin:()=>void // setUser function
  };





// Create a UserContext
export const UserContext = createContext<UserContextType|null>(null);

// UserContext Provider
export const UserProvider = ({ children }:{children:ReactNode}) => {
    const [user, setUser] = useState<User|null>(null);
    console.log("inside provider")
    useEffect(() => {
        // Check if there's a JWT in cookies on page load
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
       
        if (token) {
            try {
                console.log("token",token)
                const decodedUser :User= jwt.decode(token) as User; // Decode JWT token
                setUser(decodedUser); // Set user context
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
       
        // else{
        //     setUser({id:"1",name:"sam",email:"saddasd",role:'asdasdas'})
        // }
    }, []);
    function setuseronsignin(){
        const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
        if(token){
        const decodedUser :User= jwt.decode(token) as User; // Decode JWT token
            setUser(decodedUser);
        }
    }
    console.log("user=",user)
    return (
        <UserContext.Provider value={{ user, setUser ,setuseronsignin}}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to access user context
export const useUser = () => useContext(UserContext);