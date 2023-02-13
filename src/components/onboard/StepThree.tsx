import StepHeader from "../StepHeader"
import cn from "classnames"
import { useContext, useEffect, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { OnboardContext } from "../../context/onboardContext"
import axios from "axios"
import Alert from "../Alert"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

export default function StepThree() {
   const formContext = useContext(OnboardContext)
   const [isScheduled, setScheduled] = useState(false)
   const [isVisible, setVisible] = useState(true)
   const [message, setMessage] = useState("")
   const router = useRouter()
   const { data: session } = useSession()
   useEffect(() => {
      ;(async function () {
         const cal = await getCalApi()
         //@ts-ignore:next-line
         cal("ui", {
            theme: "dark",
            styles: { branding: { brandColor: "#030303" } },
            hideEventTypeDetails: false,
         })
         if (cal) {
            console.log("cal not undefined")
            cal("on", {
               action: "bookingSuccessful",
               callback: (e: any) => {
                  const { data } = e.detail
                  if (data.confirmed === true) {
                     setScheduled(true)
                  }
               },
            })
         }
      })()
   }, [])

   const backHandler = () => {
      if (formContext) {
         const { updateStep } = formContext
         updateStep(2)
      }
   }

   const submitHandler = async () => {
      try {
         const res = await axios("/api/user", {
            method: "put",
            data: formContext?.formValues.info,
         })
         if (res.status === 200) router.push("/pending")
      } catch (error: any) {
         setMessage(
            "Unable to update user information. Please try again later."
         )
         setVisible(true)
      }
   }

   return (
      <div className="flex flex-col w-full">
         <StepHeader
            step="3/3"
            title="Schedule a time and day"
            description="Let us know when you want to meet"
         />
         <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="flex flex-col h-full px-4"
         >
            {isVisible && message && (
               <div className="max-w-2xl mx-auto pt-4">
                  <Alert
                     message={message}
                     variant="error"
                     onClose={() => setVisible(!isVisible)}
                  />
               </div>
            )}
            <div className="my-8">
               <Cal
                  calLink="entrepreneurship/onboard"
                  style={{ width: "100%", height: "100%", overflow: "auto" }}
                  config={{
                     name: formContext?.formValues.info.name,
                     email: session?.user?.email,
                     notes: `Meeting with ${formContext?.formValues.meeting.member[0]}`,
                  }}
               />
            </div>
            <div className="max-w-2xl mx-auto w-full flex justify-between items-center pb-4">
               <button
                  type="button"
                  onClick={() => backHandler()}
                  className="rounded border px-4 py-2 bg-transparent border-noir-800 text-noir-200"
               >
                  Back
               </button>
               <button
                  type="button"
                  disabled={!isScheduled}
                  onClick={() => submitHandler}
                  className={cn("rounded border px-8 py-2", {
                     "bg-zinc-50 text-neutral-900 border-zinc-50": isScheduled,
                     "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                        !isScheduled,
                  })}
               >
                  Finish
               </button>
            </div>
         </motion.div>
      </div>
   )
}
