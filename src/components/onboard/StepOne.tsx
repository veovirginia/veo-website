import { useContext } from "react"
import cn from "classnames"
import Input from "../Input"
import StepHeader from "../StepHeader"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import "yup-phone"
import { yupResolver } from "@hookform/resolvers/yup"
import PatternInput from "../PatternInput"
import { OnboardContext } from "../../context/onboardContext"

interface Inputs {
   phone: string
   graduation: string
   major: string
   idea: string
}

const schema = yup.object().shape({
   phone: yup
      .string()
      // @ts-ignore:next-line
      .phone("US", true, "Must be a valid US phone number")
      .required("Phone number required"),
   graduation: yup
      .string()
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/g, "Must be a valid date")
      .required("Expected graduation required"),
   major: yup
      .string()
      .matches(/^[a-zA-Z ]+$/, "Must be a valid major")
      .max(32, "Must not exceed 32 characters")
      .required("Primary major required"),
   idea: yup.string().max(32, "Must not exceed 32 characters"),
})

export default function StepOne() {
   const formContext = useContext(OnboardContext)
   const {
      control,
      getValues,
      formState: { errors, isValid },
   } = useForm<Inputs>({
      resolver: yupResolver(schema),
      defaultValues: {
         phone: formContext?.formValues.info.phone,
         graduation: formContext?.formValues.info.graduation,
         major: formContext?.formValues.info.major,
         idea: formContext?.formValues.info.idea,
      },
      mode: "onChange",
   })
   const nextHandler = () => {
      if (formContext) {
         const { updateInfo, updateStep } = formContext
         updateInfo(getValues())
         updateStep(2)
      }
   }
   return (
      <div className="flex flex-col w-full max-w-2xl mx-auto">
         <StepHeader
            step="1/3"
            title="Tell us about yourself"
            description="Help us get to know you better."
         />
         <form className="flex flex-col justify-between h-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
               <Controller
                  name="phone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <PatternInput
                        label="Phone"
                        placeholder="(###) ### ####"
                        format="(###) ### ####"
                        required
                        value={value}
                        onValueChange={onChange}
                        error={errors.phone}
                     />
                  )}
               />
               <Controller
                  name="graduation"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <PatternInput
                        label="Expected Graduation"
                        placeholder="MM/YY"
                        format="##/##"
                        required
                        value={value}
                        onValueChange={onChange}
                        error={errors.graduation}
                     />
                  )}
               />
               <Controller
                  name="major"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <Input
                        label="Major"
                        placeholder="Computer Science"
                        type="text"
                        required
                        value={value}
                        onChange={onChange}
                        error={errors.major}
                     />
                  )}
               />
               <Controller
                  name="idea"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <Input
                        label="Idea"
                        placeholder="The next big thing..."
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={errors.idea}
                     />
                  )}
               />
            </div>
            <div className="flex justify-center">
               <button
                  type="button"
                  onClick={() => nextHandler()}
                  className={cn("rounded border px-8 py-2", {
                     "bg-zinc-50 text-neutral-900 border-zinc-50": isValid,
                     "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                        !isValid,
                  })}
               >
                  Continue
               </button>
            </div>
         </form>
      </div>
   )
}
