import { useState } from "react"
import cn from "classnames"
import StepOne from "../components/onboard/StepOne"
import StepTwo from "../components/onboard/StepTwo"
import { AnimatePresence } from "framer-motion"

export default function Onboard() {
   const [step, setStep] = useState(1)
   return (
      <div className="bg-background w-full min-h-screen relative">
         <div className="pt-20 max-w-2xl mx-auto min-h-[40rem] flex flex-col justify-between">
            <AnimatePresence>
               <div>
                  {step === 1 && <StepOne />}
                  {step === 2 && <StepTwo />}
                  {step === 3 && <div>hi</div>}
               </div>
               <div
                  className={cn("flex w-full", {
                     "justify-center": step == 1,
                     "justify-between": step >= 2,
                  })}
               >
                  <button
                     onClick={() => setStep(step - 1)}
                     className={cn("rounded bg-white text-black px-6 py-2", {
                        hidden: step === 1,
                        block: step >= 2,
                     })}
                  >
                     Go back
                  </button>
                  <button
                     onClick={() => step < 3 && setStep(step + 1)}
                     className="rounded bg-white text-black px-16 py-2"
                  >
                     Continue
                  </button>
               </div>
            </AnimatePresence>
         </div>
      </div>
   )
}
