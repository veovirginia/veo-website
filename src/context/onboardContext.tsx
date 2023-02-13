import { createContext, useState } from "react"
import {
   OnboardContextForm,
   OnboardContextInfo,
   OnboardContextInterface,
   OnboardContextMeeting,
} from "../types/types"

export const OnboardContext = createContext<OnboardContextInterface | null>(
   null
)

interface OnboardProviderProps {
   children: JSX.Element
}

export default function OnboardProvider({ children }: OnboardProviderProps) {
   const [step, setStep] = useState<number>(1)
   const [formValues, setValues] = useState<OnboardContextForm>({
      info: {
         name: "",
         phone: "",
         graduation: "",
         major: "",
         idea: "",
      },
      meeting: {
         member: ["", -1],
         isScheduled: false,
      },
   })
   const updateStep = (page: number) => {
      setStep(page)
   }
   const updateInfo = (values: OnboardContextInfo) => {
      setValues({ ...formValues, info: { ...values } })
   }
   const updateMeeting = (values: OnboardContextMeeting) => {
      setValues({ ...formValues, meeting: { ...values } })
   }
   return (
      <OnboardContext.Provider
         value={{ step, formValues, updateStep, updateInfo, updateMeeting }}
      >
         {children}
      </OnboardContext.Provider>
   )
}
