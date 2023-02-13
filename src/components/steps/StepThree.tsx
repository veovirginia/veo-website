import StepHeader from "./StepHeader"
import cn from "classnames"
import { useContext, useEffect, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { OnboardContext } from "../../context/onboardContext"
import axios from "axios"
import Alert from "../Alert"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { signIn, useSession } from "next-auth/react"
import { Button } from "../buttons"

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
            cal("on", {
               action: "bookingSuccessful",
               callback: (error: any) => {
                  const { data } = error.detail
                  if (data.confirmed === true) {
                     console.log("dkoa")
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
         console.log(formContext?.formValues)
         const res = await axios("/api/user", {
            method: "put",
            data: formContext?.formValues.info,
         })
         if (res.status === 200) {
            console.log("doak")
            signIn("refresh-session", {
               redirect: true,
               callbackUrl: "http://localhost:3000/pending",
               id: session?.user.id,
               // @ts-ignore
               token: session?.token,
               email: session?.user.email,
               refresh: true,
            })
         }
      } catch (error: any) {
         setMessage(
            "Unable to update user information. Please try again later."
         )
         setVisible(true)
      }

      // router.push("/pending")
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
                  // style={{ width: "100" }}
                  config={{
                     name: formContext?.formValues.info.name,
                     email: session?.user?.email,
                     notes: `Meeting with ${formContext?.formValues.meeting.member[0]}`,
                  }}
               />
            </div>
            <div className="max-w-2xl mx-auto w-full flex justify-between items-center pb-10">
               <Button
                  text="Back"
                  type="button"
                  variant="secondary"
                  className="w-24"
                  onClick={backHandler}
               />
               <Button
                  text="Finish"
                  type="button"
                  className="w-32"
                  disabled={!isScheduled}
                  onClick={submitHandler}
               />
            </div>
         </motion.div>
      </div>
   )
}
