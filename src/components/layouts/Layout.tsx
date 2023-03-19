import { signOut, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Navbar from "../Navbar"
import { ReactNode } from "react"
import Head from "next/head"

interface LayoutProps {
   page: string
   description: string
   children: ReactNode
}

export default function Layout({ page, description, children }: LayoutProps) {
   return (
      <>
         <Head>
            <title>Virginia Entrepreneurship Organization | {page}</title>
            <meta
               property="og:title"
               content={`Virginia Entrepreneurship Organization | ${page}`}
               key="title"
            />
            <meta name="description" content={description} key="desc" />
            <link
               rel="apple-touch-icon"
               sizes="180x180"
               href="/apple-touch-icon.png"
            />
            <link
               rel="icon"
               type="image/png"
               sizes="32x32"
               href="/favicon-32x32.png"
            />
            <link
               rel="icon"
               type="image/png"
               sizes="16x16"
               href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
               rel="mask-icon"
               href="/safari-pinned-tab.svg"
               color="#0070f3"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
         </Head>
         <div className="w-full min-h-screen">
            <Navbar />
            {children}
         </div>
      </>
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
