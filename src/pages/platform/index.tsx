import { GetServerSidePropsContext } from "next"
import { useSession, getSession, signOut, signIn } from "next-auth/react"
import { useEffect } from "react"
import { prisma } from "../../helpers/db/index"
import { useRouter } from "next/router"

interface DashboardProps {
   refreshSession?: boolean
}

export default function Dashboard({ refreshSession }: DashboardProps) {
   const { data: session } = useSession()
   const router = useRouter()

   useEffect(() => {
      if (refreshSession) {
         signIn("refresh-session", {
            redirect: true,
            callbackUrl: `http://localhost:3000/${router.pathname}`,
            id: session?.user.id,
            // @ts-ignore
            token: session?.token,
            email: session?.user.email,
         })
      }
   }, [
      refreshSession,
      router.pathname,
      //@ts-ignore
      session?.token,
      session?.user.email,
      session?.user.id,
   ])

   return (
      <div className="text-white">
         <h1>Welcome to veo</h1>
         {router.pathname}
         <button onClick={() => console.log(session)}>log session</button>
         <button onClick={() => signOut()}>logout</button>
      </div>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { req } = context
   const session = await getSession({ req })

   if (!session) {
      return {
         redirect: {
            destination: "/access",
         },
      }
   }
   if (!session.user.onboarded) {
      try {
         const dbUser = await prisma.user.findUnique({
            where: {
               email: session.user.email,
            },
         })
         if (dbUser?.onboarded) {
            return {
               props: {
                  refreshSession: true,
               },
            }
         } else {
            return {
               redirect: {
                  destination: "/onboard",
               },
            }
         }
      } catch (error: any) {
         return {
            props: {
               error: "Unable to retrieve user information.",
            },
         }
      }
   }
   return {
      props: {},
   }
}

Dashboard.defaultProps = {
   refreshSession: false,
}
