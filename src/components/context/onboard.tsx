import { createContext, useContext, useState } from "react"

// interface FormTypes {
//    about: AboutType
//    member: string
//    scheduled: boolean
// }

// interface AboutType {
//    phone: string
//    graduation: string
//    major: string
// }

const Context = createContext<any>(undefined)

export function OnboardProvider({ children }: any) {
   const [formValues, setForm] = useState({
      about: {
         phone: "",
         graduation: "",
         major: "",
      },
      member: "",
      scheduled: false,
   })
   return (
      <Context.Provider value={[formValues, setForm]}>
         {children}
      </Context.Provider>
   )
}

export function useOnboardContext() {
   return useContext(Context)
}
