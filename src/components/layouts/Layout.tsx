import { signOut, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Navbar from "../Navbar"
import { ReactNode } from "react"

interface LayoutProps {
   children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
   return (
      <div className="bg-noir-900 w-full min-h-screen">
         <Navbar />
         {children}
      </div>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { req } = context
   const session = await getSession({ req })

   if (!session) {
      return {
         redirect: "/login",
      }
   }
   return {
      props: {},
   }
}
