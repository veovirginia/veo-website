import { useContext, useEffect, useState } from "react"
import { Input } from "../inputs"
import StepHeader from "./StepHeader"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import "yup-phone"
import { yupResolver } from "@hookform/resolvers/yup"
import { PatternInput } from "../inputs"
import { OnboardContext } from "../../context/onboardContext"
import { motion } from "framer-motion"
import { ArrowButton } from "../buttons"

interface Inputs {
   name: string
   phone: string
   graduation: string
   major: string
   idea: string
}

const schema = yup.object().shape({
   name: yup
      .string()
      .max(128, "Must not exceed 128 characters")
      .required("Name required"),
   phone: yup
      .string()
      .phone("US", true, "Must be a valid US phone number")
      .required("Phone number required"),
   graduation: yup
      .string()
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/g, "Must be a valid date")
      .required("Expected graduation required"),
   major: yup
      .string()
      .matches(/^[a-zA-Z- ]+$/, "Must be a valid major")
      .max(32, "Must not exceed 32 characters")
      .required("Primary major required"),
   idea: yup.string().max(32, "Must not exceed 32 characters"),
})

export default function StepOne() {
   const [isLoading, setLoading] = useState(true)
   const formContext = useContext(OnboardContext)
   const {
      control,
      getValues,
      setValue,
      formState: { errors, isValid },
   } = useForm<Inputs>({
      resolver: yupResolver(schema),
      defaultValues: {
         name: formContext?.formValues.info.name,
         phone: formContext?.formValues.info.phone,
         graduation: formContext?.formValues.info.graduation,
         major: formContext?.formValues.info.major,
         idea: formContext?.formValues.info.idea,
      },
      shouldUnregister: false,
      mode: "onChange",
   })
   const nextHandler = () => {
      if (formContext) {
         const { updateInfo, updateStep } = formContext
         updateInfo(getValues())
         updateStep(2)
      }
   }
   useEffect(() => {
      if (formContext) {
         const { name, phone, graduation, major, idea } =
            formContext.formValues.info
         setValue("name", name)
         setValue("phone", phone)
         setValue("graduation", graduation)
         setValue("major", major)
         setValue("idea", idea)
         setLoading(false)
      }
   }, [formContext, setValue])
   return (
      <motion.div className="flex flex-col w-full max-w-2xl mx-auto">
         <StepHeader
            step="1/3"
            title="Tell us about yourself"
            description="Help us get to know you better"
         />
         {isLoading ? (
            <div className="flex justify-center text-noir-300 pt-12">
               Loading user information...
            </div>
         ) : (
            <motion.form
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 50, opacity: 0 }}
               className="flex flex-col justify-between h-full px-4"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <Controller
                     name="name"
                     control={control}
                     render={({ field: { value, onChange } }) => (
                        <Input
                           label="Full Name"
                           placeholder="John Doe"
                           type="text"
                           required
                           value={value}
                           onChange={onChange}
                           error={errors.name}
                        />
                     )}
                  />
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
                  <ArrowButton
                     type="button"
                     disabled={!isValid}
                     direction="right"
                     className="w-32"
                     onClick={nextHandler}
                  >
                     Continue
                  </ArrowButton>
               </div>
            </motion.form>
         )}
      </motion.div>
   )
}
