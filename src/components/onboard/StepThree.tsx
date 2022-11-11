import StepHeader from "../StepHeader"
import { motion } from "framer-motion"
import { useState } from "react"
// import { InlineWidget, useCalendlyEventListener } from "react-calendly"

const members = [
   {
      name: "Alex Becker",
      major: "Computer Science + Commerce",
      grad: "2023",
   },
   {
      name: "Jason He",
      major: "Computer Science + Commerce",
      grad: "2024",
   },
   {
      name: "David Xiang",
      major: "Computer Science + Statistics",
      grad: "2024",
   },
]

export default function StepThree() {
   // useCalendlyEventListener({
   //    onProfilePageViewed: () => console.log("onProfilePageViewed"),
   //    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
   //    onEventTypeViewed: () => console.log("onEventTypeViewed"),
   //    onEventScheduled: (e) => console.log(e.data.payload),
   // })

   return (
      <div>
         <StepHeader
            step="3/3"
            title="Schedule a time and day"
            description="Let us know when you want to meet."
         />
         <div className="space-y-2 py-6">
            {/* <InlineWidget url="https://calendly.com/veovirginia/20min" /> */}
         </div>
      </div>
   )
}
