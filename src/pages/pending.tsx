import { AnimatePresence } from "framer-motion"
import { GetServerSidePropsContext } from "next"
import { useSession, getSession } from "next-auth/react"
import Layout from "../components/layouts/Layout"
import LinkCard from "../components/LinkCard"

const resources = [
   {
      link: "https://hoosbuilding.veovirginia.com/",
      title: "Hoos Building",
      description:
         "Check out the curated list of startups that began here at UVA.",
   },
   {
      link: "https://hoosbuilding.veovirginia.com/",
      title: "UVA Entrepreneurship",
      description:
         "Find entrepreneurship resources at UVA and the Charlottesville area.",
   },
   {
      link: "https://www.instagram.com/veoatuva/",
      title: "VEO Instagram",
      description: "Follow us on Instagram for latest news.",
   },
   {
      link: "https://veovirginia.substack.com/",
      title: "VEO Substack",
      description: "Subscribe to our newsletter to stay up to date with VEO.",
   },
]

export default function Pending() {
   return (
      <Layout>
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
                     <div className="max-w-2xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 gap-4 pt-12">
                        {resources.map((resource) => (
                           <LinkCard key={resource.title} {...resource} />
                        ))}
                     </div>
                  </div>
               </div>
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
   if (session.user.name) {
      return {
         redirect: {
            destination: "/platform",
         },
      }
   }
   return {
      props: {},
   }
}
