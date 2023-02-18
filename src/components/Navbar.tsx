import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "./buttons"
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
               <Button onClick={() => signOut()} type="button" text="Log out" />
            ) : (
               <Link href="/access" passHref>
                  <Button
                     type="button"
                     text="Platform Access"
                     variant="secondary"
                  />
               </Link>
            )}
         </div>
      </div>
   )
}

export default Navbar
