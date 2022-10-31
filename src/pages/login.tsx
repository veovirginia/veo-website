import Link from "next/link"
import Input from "../components/Input"
import { BiDoorOpen } from "react-icons/bi"
import RegisterPattern from "../components/SVG/RegisterPattern"
import Navbar from "../components/Navbar"

export default function Login() {
   return (
      <div className="bg-background w-full min-h-screen relative">
         <Navbar />
         <div className="max-w-md mx-auto pt-32 px-4">
            <div className="text-center">
               <h1 className="text-4xl font-semibold text-white mx-auto">
                  {/* Animating gradient? */}
                  <span className="mr-2 bg-gradient-to-br from-[#2a63ff] via-[#613cf4] to-[#ea3be1] overflow-visible bg-clip-text text-transparent">
                     VEO
                  </span>
                  Access
               </h1>
               <p className="text-lg pt-2 text-white opacity-60">
                  Login to your account
               </p>
            </div>
            <div className="pt-10 space-y-4 pb-12">
               <Input
                  title="Email"
                  placeholder="johndoe@email.com"
                  type="text"
               />
               <Input title="Password" placeholder="********" type="password" />
            </div>
            {/* Hover animating gradient */}
            <button className="w-full p-2 rounded bg-white text-black flex justify-center items-center space-x-2">
               <BiDoorOpen className="h-5 w-5" />
               <span>Access Dashboard</span>
            </button>
            <div className="flex justify-center items-center pt-4 space-x-2">
               <p className="text-white opacity-60">
                  Don&apos;t have an account?
               </p>
               <Link href="/register" passHref>
                  <p className="cursor-pointer text-[#136CD6]">Register</p>
               </Link>
            </div>
         </div>
         <div className="opacity-50 absolute bottom-0 right-0 pointer-events-none">
            <RegisterPattern />
         </div>
      </div>
   )
}
