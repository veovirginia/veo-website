import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import OnboardProvider from "../context/onboardContext"

function MyApp({
   Component,
   pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
   return (
      <SessionProvider session={session}>
         <OnboardProvider>
            <Component {...pageProps} />
         </OnboardProvider>
      </SessionProvider>
   )
}

export default MyApp
