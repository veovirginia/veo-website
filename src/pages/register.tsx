import Link from "next/link"
import Input from "../components/Input"
import { BiLockAlt } from "react-icons/bi"
import RegisterPattern from "../components/SVG/RegisterPattern"
import Logo from "../components/SVG/Logo"

export default function Register() {
   return (
      <div className="bg-background w-full min-h-screen relative">
         <div className="max-w-5xl mx-auto py-10 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
               <Logo />
               <h1 className="text-xl text-white">VEO</h1>
            </div>
            <div className="flex items-center space-x-8">
               <Link href="/login" passHref>
                  <h2 className="text-white opacity-60">Login</h2>
               </Link>
               <Link href="/register" passHref>
                  <button
                     type="button"
                     className="shadow-lg text-black px-8 py-2 rounded-full bg-white"
                  >
                     Join
                  </button>
               </Link>
            </div>
         </div>
         <div className="max-w-md mx-auto pt-32 px-4">
            <div className="text-center">
               <h1 className="text-4xl font-semibold text-white mx-auto">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-red-500 to-blue-500 overflow-visible bg-clip-text text-transparent">
                     VEO
                  </span>
               </h1>
               <p className="text-lg pt-2 text-white opacity-60">
                  The premiere entrepreneurship organization
               </p>
            </div>
            <div className="pt-10 space-y-4 pb-12">
               <Input title="Full Name" placeholder="John Doe" type="text" />
               <Input
                  title="Email"
                  placeholder="johndoe@email.com"
                  type="text"
               />
               <Input title="Password" placeholder="********" type="password" />
               <Input
                  title="Confirm Password"
                  placeholder="********"
                  type="password"
               />
            </div>
            {/* Hover animating gradient */}
            <button className="w-full p-2 bg-gradient-to-l rounded from-[#741DE2] to-[#136CD6] text-white flex justify-center items-center space-x-2">
               <BiLockAlt className="h-5 w-5" />
               <span>Create account</span>
            </button>
            <div className="flex justify-center items-center pt-4 space-x-2">
               <p className="text-white opacity-60">Already have an account?</p>
               <Link href="/login" passHref>
                  <p className="text-[#136CD6]">Log in</p>
               </Link>
            </div>
         </div>
         {/* <div className="absolute bottom-0 right-0 pointer-events-none">
            <RegisterPattern />
         </div> */}
      </div>
   )
}
