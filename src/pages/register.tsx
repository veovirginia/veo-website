import Link from "next/link"
import Input from "../components/Input"
import { BiLockAlt } from "react-icons/bi"
import RegisterPattern from "../components/SVG/RegisterPattern"
import Navbar from "../components/Navbar"

export default function Register() {
   return (
      <div className="bg-background w-full min-h-screen relative">
         <Navbar />
         <div className="max-w-md mx-auto pt-32 px-4">
            <div className="text-center">
               <h1 className="text-4xl font-semibold text-white mx-auto">
                  Welcome to
                  {/* Animating gradient? */}
                  <span className="ml-2">VEO</span>
               </h1>
               <p className="text-lg pt-2 text-white opacity-60">
                  The premiere entrepreneurship organization
               </p>
            </div>
            <div className="pt-10 space-y-4 pb-12">
               <Input label="Full Name" placeholder="John Doe" type="text" />
               <Input
                  label="Email"
                  placeholder="johndoe@email.com"
                  type="text"
               />
               <Input label="Password" placeholder="********" type="password" />
               <Input
                  label="Confirm Password"
                  placeholder="********"
                  type="password"
               />
            </div>
            {/* Hover animating gradient */}
            <button className="w-full p-2 rounded bg-white text-black flex justify-center items-center space-x-2">
               <BiLockAlt className="h-5 w-5" />
               <span>Create account</span>
            </button>
            <div className="flex justify-center items-center pt-4 space-x-2">
               <p className="text-white opacity-60">Already have an account?</p>
               <Link href="/login" passHref>
                  <p className="cursor-pointer text-[#136CD6]">Log in</p>
               </Link>
            </div>
         </div>
         <div className="opacity-50 absolute bottom-0 right-0 pointer-events-none">
            <RegisterPattern />
         </div>
      </div>
   )
}
