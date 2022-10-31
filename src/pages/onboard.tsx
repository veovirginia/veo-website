import { useState } from "react"
import cn from "classnames"
import StepOne from "../components/onboard/StepOne"

const steps = [
   {
      title: "Tell us about yourself",
      description: "Some short description here about this page.",
   },
   {
      title: "Chat with us",
      description: "Choose a member to meet with. Coffee’s on us.",
   },
   {
      title: "Schedule a time and day",
      description: "Let us know when you want to meet.",
   },
]

export default function Onboard() {
   const [step, setStep] = useState(0)
   return (
      <div className="bg-background w-full min-h-screen relative">
         <div className="pt-20 max-w-2xl mx-auto min-h-[40rem] flex flex-col justify-between">
            <div>
               <div className="text-center">
                  <p>
                     <span className="w-fit text-lg font-medium bg-gradient-to-br from-[#F675A8] to-[#9581FF] overflow-visible bg-clip-text text-transparent tracking-[0.25rem] pb-6">
                        {(step + 1).toString()}/3
                     </span>
                  </p>
                  <h1 className="font-semibold text-white text-4xl">
                     {steps[step].title}
                  </h1>
                  <p className="text-base font-regular tracking-wide pt-2 text-white opacity-60">
                     {steps[step].description}
                  </p>
               </div>
               <StepOne />
            </div>
            <div
               className={cn("flex w-full", {
                  "justify-center": step == 0,
                  "justify-between": step >= 1,
               })}
            >
               <button
                  onClick={() => setStep(step - 1)}
                  className={cn("rounded bg-white text-black px-6 py-2", {
                     hidden: step === 0,
                     block: step >= 1,
                  })}
               >
                  Go back
               </button>
               <button
                  onClick={() => step < 2 && setStep(step + 1)}
                  className="rounded bg-white text-black px-16 py-2"
               >
                  Continue
               </button>
            </div>
         </div>
      </div>
   )
}
