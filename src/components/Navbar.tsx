import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Logo from "./SVG/Logo"

const Navbar = () => {
   const { data: session } = useSession()
   return (
      <div className="max-w-5xl mx-auto py-5 flex items-center justify-between px-4">
         <div className="cursor-pointer flex items-center space-x-4 relative">
            <span className="z-10">
               <Logo />
            </span>
            <h1 className="z-10 font-semibold text-xl text-white tracking-wider">
               VEO
            </h1>
            {/* <div className="opacity-30 absolute -top-[8rem] -left-[8rem] circle-bg h-[24rem] w-[24rem] rounded-full" /> */}
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
                     className="text-white px-8 py-2 rounded-full bg-transparent border-neutral-700 hover:border-white hover:bg-white hover:text-black transition-colors duration-125 border"
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
