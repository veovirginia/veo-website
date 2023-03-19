import { AnimatePresence } from "framer-motion"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import Link from "next/link"
import { prisma } from "../helpers/db"
import { useRouter } from "next/router"
import { Button } from "../components/buttons"
import Layout from "../components/layouts/Layout"
import LinkCard from "../components/LinkCard"

const resources = [
   {
      link: "https://hoosbuilding.veovirginia.com/",
      title: "Hoos Building",
      description:
         "Check out the curated list of startups that began here at UVA.",
      color: "#E57200",
   },
   {
      link: "https://hoosbuilding.veovirginia.com/",
      title: "UVA Entrepreneurship",
      description:
         "Find entrepreneurship resources at UVA and the Charlottesville area.",
      color: "#362FD9",
   },
   {
      link: "https://www.instagram.com/veoatuva/",
      title: "VEO Instagram",
      description: "Follow us on Instagram for latest news.",
      color: "#D61355",
   },
   {
      link: "https://veovirginia.substack.com/",
      title: "VEO Substack",
      description: "Subscribe to our newsletter to stay up to date with VEO.",
      color: "#6C00FF",
   },
]

export default function Pending() {
   const router = useRouter()
   return (
      <Layout
         page="Pending Approval"
         description="Hang tight! Your account is awaiting approval from administrators."
      >
         <AnimatePresence>
            <div className="flex flex-col w-full max-w-2xl mx-auto px-4">
               <div>
                  <div className="pt-12 flex flex-col justify-between text-center">
                     {/* Put graphic here */}
                     <h1 className="font-semibold text-zinc-50 text-3xl">
                        Hang tight!
                     </h1>
                     <p className="text-base font-regular tracking-wide pt-1 text-noir-300">
                        While you&apos;re waiting for your coffee chat, check
                        out these links
                     </p>
                     <div className="max-w-2xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 border-zinc-800 gap-2 mt-12">
                        {resources.map((resource) => (
                           <LinkCard key={resource.title} {...resource} />
                        ))}
                     </div>
                  </div>
               </div>
               <Link href="/onboard">
                  <Button
                     text="Back to Onboarding"
                     className="mt-8 w-fit mx-auto"
                     variant="secondary"
                     onClick={() => router.push("/onboard")}
                     type={"button"}
                  />
               </Link>
            </div>
         </AnimatePresence>
      </Layout>
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
   if (session.user.onboarded) {
      return {
         redirect: {
            destination: "/platform",
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
                  redirect: {
                     destination: "/platform",
                  },
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
   return {
      props: {},
   }
}
