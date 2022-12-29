import { useContext, useEffect, useState } from "react"
import cn from "classnames"
import StepOne from "../components/onboard/StepOne"
import StepTwo from "../components/onboard/StepTwo"
import { AnimatePresence } from "framer-motion"
import StepThree from "../components/onboard/StepThree"
import { getSession, useSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Layout from "../components/layouts/Layout"
import OnboardProvider, { OnboardContext } from "../context/onboardContext"

function OnboardSteps() {
   const [step, setStep] = useState(1)
   const formContext = useContext(OnboardContext)

   useEffect(() => {
      if (formContext) {
         const { step: ctxStep } = formContext
         setStep(ctxStep)
      }
   }, [formContext])
   return (
      <div className="flex flex-1">
         {step === 1 && <StepOne />}
         {step === 2 && <StepTwo />}
         {step === 3 && <StepThree />}
      </div>
   )
}

export default function Onboard() {
   return (
      <Layout>
         <AnimatePresence>
            <OnboardProvider>
               <div className="pt-12 min-h-[40rem] flex flex-col justify-between">
                  <OnboardSteps />
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
