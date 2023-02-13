import { GetServerSidePropsContext } from "next"
import { useSession, getSession } from "next-auth/react"

export default function Dashboard() {
   const { data: session } = useSession()

   return (
      <div className="text-white">
         <h1>hello</h1>
         <button onClick={() => console.log(session)}>log session</button>
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
   if (!session.user.name) {
      return {
         redirect: {
            destination: "/onboard",
         },
      }
   }
   return {
      props: {},
   }
}
