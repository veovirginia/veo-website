import StepHeader from "../StepHeader"
import { motion } from "framer-motion"
import MemberRow from "../MemberRow"
import { useState } from "react"

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

export default function StepTwo() {
   const [selectedRow, setRow] = useState(-1)
   return (
      <div>
         <StepHeader
            step="2/3"
            title="Chat with us"
            description="Select a member to meet with. Coffee's on us."
         />
         <div className="my-16 space-y-2 max-h-[24rem] overflow-auto">
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
      </div>
   )
}
