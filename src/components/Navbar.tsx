import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Logo from "./SVG/Logo"

interface NavbarProps {
   session: Session | null
}

const Navbar = ({ session }: NavbarProps) => {
   return (
      <div className="max-w-5xl mx-auto py-10 flex items-center justify-between px-4">
         <div className="cursor-pointer flex items-center space-x-4 relative">
            <span className="z-10">
               <Logo />
            </span>
            <h1 className="z-10 font-semibold text-xl text-white tracking-wider">
               VEO
            </h1>
            <div className="opacity-30 absolute -top-[8rem] -left-[8rem] circle-bg h-[24rem] w-[24rem] rounded-full" />
         </div>
         <div className="flex items-center space-x-8">
            {session?.user ? (
               <button onClick={() => signOut()} className="text-white">
                  Log out
               </button>
            ) : (
               <Link href="/register" passHref>
                  <button
                     type="button"
                     className="shadow-lg text-black px-8 py-2 rounded-full bg-white"
                  >
                     Join
                  </button>
               </Link>
            )}
         </div>
      </div>
   )
}

export default Navbar
