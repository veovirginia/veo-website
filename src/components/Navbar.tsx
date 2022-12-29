import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Logo from "./SVG/Logo"

const Navbar = () => {
   const { data: session } = useSession()
   return (
      <div className="w-full max-w-5xl mx-auto py-5 flex items-center justify-between px-4">
         <div className="cursor-pointer flex items-center space-x-4 relative">
            <span className="z-10">
               <Logo />
            </span>
            <h1 className="z-10 font-semibold text-lg text-white tracking-wider">
               VEO
            </h1>
         </div>
         <div className="flex items-center space-x-8 text-sm">
            {session?.user ? (
               <button onClick={() => signOut()} className="text-white">
                  Log out
               </button>
            ) : (
               <p className="flex items-center text-neutral-400 space-x-6">
                  <Link href="/login" passHref>
                     <span className="cursor-pointer">Login</span>
                  </Link>
                  <Link href="/signup" passHref>
                     <button
                        type="button"
                        className="text-zinc-50 px-4 py-2 rounded bg-transparent border-neutral-700 hover:border-zinc-50 hover:bg-zinc-50 hover:text-neutral-900 transition-colors duration-125 border"
                     >
                        Signup
                     </button>
                  </Link>
               </p>
            )}
         </div>
      </div>
   )
}

export default Navbar
