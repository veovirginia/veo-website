import StepHeader from "./StepHeader"
import MemberRow from "../MemberRow"
import { useContext, useState } from "react"
import { OnboardContext } from "../../context/onboardContext"
import { motion } from "framer-motion"
import { ArrowButton, Button } from "../buttons"

const members = [
   {
      name: "Alex Becker",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1676328098/alex_photo.png",
      major: "Computer Science + Commerce",
      grad: "2023",
      calendar: "alexmbckr/veo-onboard-meeting",
   },
   {
      name: "Jason He",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1676328034/jason_photo.png",
      major: "Computer Science + Commerce",
      grad: "2024",
      calendar: "jasonjche/veo-onboard-meeting",
   },
   {
      name: "David Xiang",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1676318501/david_photo.png",
      major: "Computer Science + Statistics",
      grad: "2024",
      calendar: "davidxiang/veo-onboard-meeting",
   },
   {
      name: "Michael Fatemi",
      image: "https://res.cloudinary.com/dblodzwva/image/upload/v1676328034/jason_photo.png",
      major: "Computer Science",
      grad: "2025",
      calendar: "michael-fatemi-vnsw6q/veo-onboard-meeting",
   },
   // {
   //    name: "Clara Grimmelbein",
   //    image: "https://res.cloudinary.com/dblodzwva/image/upload/v1676318421/clara_photo.png",
   //    major: "Computer Science + Commerce",
   //    grad: "2026",
   // },
   // {
   //    name: "Daivik Siddhi",
   //    image: "https://res.cloudinary.com/dblodzwva/image/upload/v1676327863/daivik_photo.png",
   //    major: "Computer Science + Economics",
   //    grad: "2025",
   // },
]

export default function StepTwo() {
   const formContext = useContext(OnboardContext)
   const [selectedRow, setRow] = useState(
      formContext?.formValues.meeting.member.index
   )
   const backHandler = () => {
      if (formContext) {
         const { updateStep } = formContext
         updateStep(1)
      }
   }
   const nextButton = () => {
      if (formContext) {
         const { updateMeeting, updateStep } = formContext
         // Better than `if (selectedRow)` because this method counts 0 as valid
         if (selectedRow !== undefined) {
            console.log("sel row: ", selectedRow)
            console.log(members[selectedRow])
            updateMeeting({
               member: {
                  name: members[selectedRow].name,
                  calendar: members[selectedRow].calendar,
                  index: selectedRow,
               },
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
            <div className="my-8 max-h-[24rem] overflow-auto">
               {members.map((member, i) => {
                  return (
                     <MemberRow
                        index={i}
                        key={member.name}
                        {...member}
                        onclick={() => setRow(i)}
                        selected={selectedRow}
                     />
                  )
               })}
            </div>
            <div className="flex justify-between items-center ">
               <Button
                  type="button"
                  variant="secondary"
                  className="w-24"
                  onClick={backHandler}
               >
                  Back
               </Button>
               <ArrowButton
                  type="button"
                  disabled={selectedRow === undefined || selectedRow < 0}
                  direction="right"
                  className="w-32"
                  onClick={nextButton}
               >
                  Next
               </ArrowButton>
            </div>
         </motion.div>
      </motion.div>
   )
}
