import type { NextPage } from "next"
import { SiSubstack, SiInstagram } from "react-icons/si"
import Head from "next/head"
import Link from "next/link"
import { Button } from "../components/buttons"

const Home: NextPage = () => {
   return (
      <div>
         <Head>
            <title>Virginia Entrepreneurship Organization</title>
            <meta
               property="og:title"
               content="Virginia Entrepreneurship Organization"
               key="title"
            />
            <meta
               property="og:description"
               content="A community of builders at the University of Virginia. Join us to learn about entrepreneurship, how to get involved, and discover resources available to you."
            />
            <meta
               name="description"
               content="A community of builders at the University of Virginia. Join us to learn about entrepreneurship, how to get involved, and discover resources available to you."
               key="desc"
            />
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
         <main className="w-full min-h-screen p-4 flex flex-col max-w-5xl mx-auto">
            <div className="mx-auto text-center mt-auto">
               <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2a63ff] via-[#5530ed] to-[#ea3be1] mx-auto">
                  <svg
                     width="36"
                     height="30"
                     viewBox="0 0 49 41"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M4.59708 12.6994C1.586 7.66561 0.277745 2.26984 0 0.201172L39.0175 41C35.1866 39.2665 26.0825 34.6676 20.3132 30.1395C13.1016 24.4793 8.36087 18.9916 4.59708 12.6994Z"
                        fill="white"
                     />
                     <path
                        d="M4.39595 10.5445C3.0977 8.61951 0.632103 2.67205 0 0.201172L39.0175 41C36.3454 40.0231 25.8871 33.3574 21.0315 29.3062C10.5661 20.5747 6.89559 14.2509 4.39595 10.5445Z"
                        fill="white"
                     />
                     <path
                        d="M25.2838 33.6447C17.9803 38.9313 14.883 39.6496 10.1135 41L48.786 0C46.2866 6.17731 43.4709 12.3546 38.96 19.0778C35.0617 24.8881 28.8752 31.045 25.2838 33.6447Z"
                        fill="white"
                     />
                     <path
                        d="M21.1465 35.3973C18.1844 37.5283 13.9923 39.6783 10.1141 40.9999L48.786 0C47.9263 2.7119 41.7595 13.6349 38.0694 18.4169C29.6223 29.3637 25.1402 32.5241 21.1465 35.3973Z"
                        fill="white"
                     />
                  </svg>
               </div>
               <h1 className="text-zinc-50 font-semibold text-2xl font-display">
                  Virginia Entrepreneurship Organization
               </h1>
               <p className="text-base text-neutral-400 pt-1">
                  A community of builders at the University of Virginia
               </p>
               <div className="pt-4">
                  <Link href="/access">
                     <Button type="button" className="mx-auto">
                        Go to Platform
                     </Button>
                  </Link>
               </div>
            </div>
            <div className="mt-auto mx-auto flex items-center space-x-2 p-4">
               <p className="text-neutral-500 text-sm">Connect with us:</p>
               <a
                  href="https://instagram.com/veoatuva/"
                  target="_blank"
                  rel="noreferrer"
               >
                  <SiInstagram className="text-base text-[#C13584]" />
               </a>
               <a
                  href="https://veovirginia.substack.com/"
                  target="_blank"
                  rel="noreferrer"
               >
                  <SiSubstack className="text-base text-[#F76719]" />
               </a>
            </div>
         </main>
      </div>
   )
}

export default Home
