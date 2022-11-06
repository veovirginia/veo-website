import { useSession, signOut, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Navbar from "../Navbar"
import { ReactNode } from "react"

interface LayoutProps {
   children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
   const { data: session } = useSession()

   return (
      <div className="bg=background w-full min-h-screen relative">
         <Navbar session={session} />
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
