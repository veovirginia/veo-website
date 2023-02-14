import { useContext, useEffect, useState } from "react"
import { prisma } from "../helpers/db"
import { StepOne, StepTwo, StepThree } from "../components/steps"
import { AnimatePresence, motion } from "framer-motion"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import Layout from "../components/layouts/Layout"
import { OnboardContext } from "../context/onboardContext"
import { OnboardContextInfo } from "../types/types"

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
      <AnimatePresence>
         <motion.div className="flex flex-1">
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
         </motion.div>
      </AnimatePresence>
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
            destination: "/access",
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
      const { name, phone, graduation, major, idea, onboarded } = res
      if (onboarded) {
         return {
            redirect: {
               destination: "/platform",
            },
         }
      }
      try {
         const dbUser = await prisma.user.findUnique({
            where: {
               email: session.user.email,
            },
         })
         if (dbUser?.onboarded) {
            return {
               redirect: {
                  destination: "/platform",
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
      return {
         props: {
            data: {
               name,
               phone,
               graduation,
               major,
               idea,
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
