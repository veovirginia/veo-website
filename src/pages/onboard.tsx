import { useState } from "react"
import cn from "classnames"
import StepOne from "../components/onboard/StepOne"
import StepTwo from "../components/onboard/StepTwo"
import { AnimatePresence } from "framer-motion"

export default function Onboard() {
   const [step, setStep] = useState(1)
   return (
      <div className="bg-background w-full min-h-screen relative flex items-center p-4">
         <div className="w-full max-w-2xl mx-auto min-h-[40rem] flex flex-col md:justify-between">
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
                     className={cn("rounded border-gray-500 border-2 text-white md:px-6 py-3 md:mt-0 mr-4 w-full md:w-auto grow md:grow-0 basis-1/2 md:basis-auto", {
                        hidden: step === 1,
                        block: step >= 2,
                     })}
                  >
                     Go back
                  </button>
                  <button
                     onClick={() => step < 3 && setStep(step + 1)}
                     className="rounded bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 md:mt-0 w-full md:w-48 grow md:grow-0 basis-1/2 md:basis-auto"
                  >
                     {step != 3 ? "Continue" : "Finish"}
                  </button>
               </div>
            </AnimatePresence>
         </div>
      </div>
   )
}
