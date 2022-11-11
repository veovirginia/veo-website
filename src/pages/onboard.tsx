import { useState } from "react"
import { OnboardProvider } from "../components/context/onboard"
import cn from "classnames"
import StepOne from "../components/onboard/StepOne"
import StepTwo from "../components/onboard/StepTwo"
import { AnimatePresence } from "framer-motion"
import StepThree from "../components/onboard/StepThree"
import { getSession, useSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Layout from "../components/layouts/Layout"

export default function Onboard() {
   const { data: session } = useSession()
   const [step, setStep] = useState(1)

   return (
      <Layout>
         <OnboardProvider>
            <div className="pt-20 max-w-2xl mx-auto min-h-[40rem] flex flex-col justify-between">
               <AnimatePresence>
                  <div>
                     {step === 1 && <StepOne />}
                     {step === 2 && <StepTwo />}
                     {step === 3 && <StepThree />}
                  </div>
                  <div
                     className={cn("flex w-full", {
                        "justify-center": step == 1,
                        "justify-between": step >= 2,
                     })}
                  >
                     <button
                        onClick={() => setStep(step - 1)}
                        className={cn("rounded bg-white text-black px-6 py-2", {
                           hidden: step === 1,
                           block: step >= 2,
                        })}
                     >
                        Go back
                     </button>
                     <button
                        onClick={() => step < 3 && setStep(step + 1)}
                        className="rounded bg-white text-black px-16 py-2"
                     >
                        {step < 3 ? "Continue" : "Finish"}
                     </button>
                  </div>
               </AnimatePresence>
            </div>
         </OnboardProvider>
      </Layout>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { req } = context
   const session = await getSession({ req })

   if (!session) {
      return {
         redirect: {
            destination: "/login",
         },
      }
   }
   return {
      props: {},
   }
}
