import { createContext, useState } from "react"
import {
   OnboardContextForm,
   OnboardContextInfo,
   OnboardContextInterface,
   OnboardContextMeeting,
} from "../types/onboard"

export const OnboardContext = createContext<OnboardContextInterface | null>(
   null
)

interface OnboardProviderProps {
   children: JSX.Element
}

export default function OnboardProvider({ children }: OnboardProviderProps) {
   const [formValues, setValues] = useState<OnboardContextForm>({
      info: {
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
   function updateInfo(values: OnboardContextInfo) {
      setValues({ ...formValues, info: { ...values } })
   }
   function updateMeeting(values: OnboardContextMeeting) {
      setValues({ ...formValues, meeting: { ...values } })
   }
   return (
      <OnboardContext.Provider
         value={{ formValues, updateInfo, updateMeeting }}
      >
         {children}
      </OnboardContext.Provider>
   )
}
