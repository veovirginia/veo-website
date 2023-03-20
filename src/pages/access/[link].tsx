import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../../components/buttons"
import Layout from "../../components/layouts/Layout"

interface AccessLinkProps {
   uri: string
}

const BASE64_PATTERN =
   /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

export default function AccessLink({ uri }: AccessLinkProps) {
   const [email, setEmail] = useState("")
   useEffect(() => {
      const url = new URL(uri)
      const uriParams = new URLSearchParams(url.searchParams)
      const email = uriParams.get("email")
      setEmail(email ?? "")
      console.log(uri)
   }, [uri])

   return (
      <Layout page="Email Signin" description="">
         <div className="max-w-md w-full mx-auto pt-24 px-4 text-center">
            {email ? (
               <div>
                  <h1 className="font-semibold text-zinc-50 text-3xl font-display">
                     Almost there!
                  </h1>
                  <p className="text-base font-regular tracking-wide pt-1 text-noir-300">
                     Click the button below to sign in
                  </p>
                  <Link href={uri}>
                     <Button type="button" className="mx-auto mt-4">
                        Authenticate as{" "}
                        <span className="font-medium pl-1">
                           {email.split("@")[0]}
                        </span>
                     </Button>
                  </Link>
               </div>
            ) : (
               <div>
                  <h1 className="font-semibold text-zinc-50 text-3xl font-display">
                     Uh oh!
                  </h1>
                  <p className="text-base font-regular tracking-wide pt-1 text-noir-300">
                     The email provided was invalid. Please sign in again.
                  </p>
                  <Link href={uri}>
                     <Button
                        type="button"
                        variant="secondary"
                        className="mx-auto mt-4"
                     >
                        Back to Sign In
                     </Button>
                  </Link>
               </div>
            )}
         </div>
      </Layout>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { params } = context

   if (
      !params ||
      !params.link ||
      !(params.link as string).match(BASE64_PATTERN)
   ) {
      return {
         redirect: {
            destination: "/access",
         },
      }
   }

   const { link } = params
   try {
      const encodedURI = Buffer.from(link as string, "base64").toString()
      const uri = decodeURIComponent(encodedURI)
      return {
         props: {
            uri,
         },
      }
   } catch (e: unknown) {
      return {
         redirect: {
            destination: "/access",
         },
      }
   }
}
