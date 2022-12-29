import StepHeader from "../StepHeader"
import cn from "classnames"
import { useEffect, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"

interface StepThreeProps {
   onBack: () => void
}

export default function StepThree({ onBack }: StepThreeProps) {
   const [isScheduled, setScheduled] = useState(false)
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
                  const { data, type, namespace } = e.detail
                  if (data.confirmed === true) {
                     setScheduled(true)
                  }
               },
            })
         }
      })()
   }, [])

   return (
      <div className="flex flex-col w-full">
         <StepHeader
            step="3/3"
            title="Schedule a time and day"
            description="Let us know when you want to meet."
         />
         <div className="flex flex-col h-full px-4">
            <div className="my-8">
               <Cal
                  calLink="entrepreneurship/onboard"
                  style={{ width: "100%", height: "100%", overflow: "auto" }}
               />
            </div>
            <div className="max-w-2xl mx-auto w-full flex justify-between items-center pb-4">
               <button
                  type="button"
                  onClick={() => onBack()}
                  className="rounded border px-8 py-2 bg-transparent border-noir-800 text-noir-200"
               >
                  Back
               </button>
               <button
                  type="button"
                  onClick={() => console.log("done")}
                  className={cn("rounded border px-16 py-2", {
                     "bg-zinc-50 text-neutral-900 border-zinc-50": isScheduled,
                     "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                        !isScheduled,
                  })}
               >
                  Continue
               </button>
            </div>
         </div>
      </div>
   )
}
