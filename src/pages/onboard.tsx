import { useContext, useEffect, useState } from "react"
import { prisma } from "../helpers/db/index"
import StepOne from "../components/onboard/StepOne"
import StepTwo from "../components/onboard/StepTwo"
import { AnimatePresence } from "framer-motion"
import StepThree from "../components/onboard/StepThree"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Layout from "../components/layouts/Layout"
import { OnboardContext } from "../context/onboardContext"
import { OnboardContextInfo } from "../types/onboard"

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

interface OnboardPageProps {
   data: OnboardContextInfo
}

export default function Onboard({ data }: OnboardPageProps) {
   const formContext = useContext(OnboardContext)

   useEffect(() => {
      if (formContext) {
         const { updateInfo } = formContext
         updateInfo(data)
      }
   }, [])

   return (
      <Layout>
         <AnimatePresence>
            <div className="pt-12 min-h-[40rem] flex flex-col justify-between">
               <OnboardSteps />
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
            destination: "/login",
         },
      }
   }
   try {
      const res = await prisma.user.findUnique({
         where: {
            email: session.user.email,
         },
      })
      if (!res) {
         return {
            props: {},
         }
      }
      return {
         props: {
            data: {
               phone: res.phoneNumber,
               graduation: res.graduation,
               major: res.major,
               idea: res.idea,
            },
         },
      }
   } catch (error: any) {
      return {
         props: {
            error: "Unable to retrieve user information.",
         },
      }
   }
}
