import { useState } from "react"
import cn from "classnames"
import StepOne from "../components/onboard/StepOne"
import StepTwo from "../components/onboard/StepTwo"
import { AnimatePresence } from "framer-motion"
import StepThree from "../components/onboard/StepThree"
import { getSession, useSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Layout from "../components/layouts/Layout"
import OnboardProvider from "../context/onboardContext"

export default function Onboard() {
   const { data: session } = useSession()
   const [step, setStep] = useState(1)

   return (
      <Layout>
         <AnimatePresence>
            <OnboardProvider>
               <div className="pt-12 min-h-[40rem] flex flex-col justify-between">
                  <div className="flex flex-1">
                     {step === 1 && <StepOne onNext={() => setStep(2)} />}
                     {step === 2 && (
                        <StepTwo
                           onBack={() => setStep(1)}
                           onNext={() => setStep(3)}
                        />
                     )}
                     {step === 3 && <StepThree onBack={() => setStep(2)} />}
                  </div>
               </div>
            </OnboardProvider>
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
            destination: "/login",
         },
      }
   }
   return {
      props: {},
   }
}
