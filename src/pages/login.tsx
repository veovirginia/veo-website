import { signIn, getProviders, getCsrfToken, getSession } from "next-auth/react"
import { BiDoorOpen } from "react-icons/bi"
import RegisterPattern from "../components/SVG/RegisterPattern"
import { GetServerSidePropsContext } from "next"
import Layout from "../components/layouts/Layout"

export default function Login({ providers }: any) {
   return (
      <Layout>
         <div className="max-w-md mx-auto pt-32 px-4">
            <div className="text-center">
               <h1 className="text-4xl font-semibold text-white mx-auto">
                  Welcome to
                  {/* Animating gradient? */}
                  <span className="ml-2 bg-gradient-to-br from-[#2a63ff] via-[#613cf4] to-[#ea3be1] overflow-visible bg-clip-text text-transparent">
                     VEO
                  </span>
               </h1>
               <p className="text-lg pt-2 text-white opacity-60">
                  The premiere entrepreneurship organization
               </p>
            </div>
            <div className="space-y-4 pt-24">
               {/* Hover animating gradient */}
               <button
                  onClick={() => signIn(providers.google.id)}
                  className="w-full p-2 rounded bg-white text-black flex justify-center items-center space-x-2"
               >
                  <BiDoorOpen className="h-5 w-5" />
                  <span>Login with {providers.google.name}</span>
               </button>
            </div>
         </div>
         <div className="opacity-50 absolute bottom-0 right-0 pointer-events-none">
            <RegisterPattern />
         </div>
      </Layout>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const providers = await getProviders()
   const { req } = context
   const session = await getSession({ req })

   if (session) {
      return {
         redirect: {
            destination: "/onboard",
         },
      }
   }

   return {
      props: {
         providers: providers,
         csrfToken: await getCsrfToken(context),
      },
   }
}
