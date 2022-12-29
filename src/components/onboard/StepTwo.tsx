import StepHeader from "../StepHeader"
import cn from "classnames"
import MemberRow from "../MemberRow"
import { useContext, useState } from "react"
import { OnboardContext } from "../../context/onboardContext"

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

interface StepTwoProps {
   onBack: () => void
   onNext: () => void
}

export default function StepTwo({ onBack, onNext }: StepTwoProps) {
   const formContext = useContext(OnboardContext)
   const [selectedRow, setRow] = useState(
      formContext?.formValues.meeting.member[1]
   )
   const nextHandler = () => {
      if (selectedRow) {
         formContext?.updateMeeting({
            member: [members[selectedRow].name, selectedRow],
            isScheduled: false,
         })
      }
      onNext()
   }
   return (
      <div className="flex flex-col w-full max-w-2xl mx-auto">
         <StepHeader
            step="2/3"
            title="Chat with us"
            description="Select a member to meet with. Coffee's on us."
         />
         <div className="flex flex-col h-full px-4">
            <div className="my-8 space-y-2 max-h-[24rem] overflow-auto">
               {members.map(({ name, major, grad }, idx) => {
                  return (
                     <MemberRow
                        index={idx}
                        key={name}
                        name={name}
                        major={major}
                        grad={grad}
                        onclick={(idx) => setRow(idx)}
                        selected={selectedRow}
                     />
                  )
               })}
            </div>
            <div className="flex justify-between items-center ">
               <button
                  type="button"
                  onClick={() => onBack()}
                  className="rounded border px-8 py-2 bg-transparent border-noir-800 text-noir-200"
               >
                  Back
               </button>
               <button
                  type="button"
                  onClick={() => nextHandler()}
                  className={cn("rounded border px-16 py-2", {
                     "bg-zinc-50 text-neutral-900 border-zinc-50":
                        selectedRow && selectedRow >= 0,
                     "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                        selectedRow && selectedRow < 0,
                  })}
               >
                  Continue
               </button>
            </div>
         </div>
      </div>
   )
}
