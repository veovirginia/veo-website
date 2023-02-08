import StepHeader from "../StepHeader"
import cn from "classnames"
import MemberRow from "../MemberRow"
import { useContext, useState } from "react"
import { OnboardContext } from "../../context/onboardContext"
import { motion } from "framer-motion"

const members = [
   {
      name: "Alex Becker",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1675828166/alex_photo.jpg",
      major: "Computer Science + Commerce",
      grad: "2023",
   },
   {
      name: "Jason He",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1675828166/jason_photo.jpg",
      major: "Computer Science + Commerce",
      grad: "2024",
   },
   {
      name: "David Xiang",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1675828166/alex_photo.jpg",
      major: "Computer Science + Statistics",
      grad: "2024",
   },
]

export default function StepTwo() {
   const formContext = useContext(OnboardContext)
   const [selectedRow, setRow] = useState(
      formContext?.formValues.meeting.member[1]
   )
   const backHandler = () => {
      if (formContext) {
         const { updateStep } = formContext
         updateStep(1)
      }
   }
   const nextHandler = () => {
      if (formContext) {
         const { updateMeeting, updateStep } = formContext
         if (selectedRow) {
            updateMeeting({
               member: [members[selectedRow - 1].name, selectedRow - 1],
               isScheduled: false,
            })
         }
         updateStep(3)
      }
   }
   return (
      <motion.div className="flex flex-col w-full max-w-2xl mx-auto">
         <StepHeader
            step="2/3"
            title="Chat with us"
            description="Meet with a member to learn about VEO"
         />
         <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="flex flex-col h-full px-4"
         >
            <div className="my-8 space-y-2 max-h-[24rem] overflow-auto">
               {members.map((member, idx) => {
                  idx += 1
                  return (
                     <MemberRow
                        index={idx}
                        key={member.name}
                        {...member}
                        onclick={(idx) => setRow(idx)}
                        selected={selectedRow}
                     />
                  )
               })}
            </div>
            <div className="flex justify-between items-center ">
               <button
                  type="button"
                  onClick={() => backHandler()}
                  className="rounded border px-4 py-2 bg-transparent border-noir-800 text-noir-200"
               >
                  Back
               </button>
               <button
                  type="button"
                  onClick={() => nextHandler()}
                  className={cn("rounded border px-8 py-2", {
                     "bg-zinc-50 text-neutral-900 border-zinc-50":
                        selectedRow && selectedRow > 0,
                     "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                        selectedRow && selectedRow <= 0,
                  })}
               >
                  Continue
               </button>
            </div>
         </motion.div>
      </motion.div>
   )
}
