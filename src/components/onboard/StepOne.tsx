import Input from "../Input"
import StepHeader from "../StepHeader"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import * as yup from "yup"
import "yup-phone"
import { yupResolver } from "@hookform/resolvers/yup"

type Inputs = {
   phone: string
   graduation: string
   major: string
   idea: string
}

const schema = yup.object().shape({
   phone: yup
      .string()
      .phone()
      .required("Phone number required"),
   graduation: yup
      .date()
      .required("Expected graduation required"),
   major: yup
      .string()
      .matches(/^[a-zA-Z]+$/, "Must be a valid major")
      .max(32, "Must not exceed 32 characters")
      .required("Primary major required"),
   idea: yup
      .string()
      .max(32, "Must not exceed 32 characters")
})

export default function StepOne() {
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
   } = useForm<Inputs>({
      resolver: yupResolver(schema),
      defaultValues: {
         phone: "",
         graduation: "",
         major: "",
         idea: "",
      },
      mode: "onChange",
   })
   return (
      <div>
         <StepHeader
            step="1/3"
            title="Tell us about yourself"
            description="Help us get to know you better."
         />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
            <Controller
                  name = "phone"
                  control = { control }
                  render = {({ field: { value, onChange } }) => (
                     <Input
                        label = "Phone"
                        placeholder = "(123) 456 7890"
                        type = "text"
                        required
                        value = { value }
                        onChange = { onChange }
                        error = { errors.phone }
                        />
                  )}
            />
            <Controller
                  name = "graduation"
                  control = { control }
                  render = {({ field: { value, onChange } }) => (
                     <Input
                        label = "Graduation"
                        placeholder = "MM/YY"
                        type = "text"
                        required
                        value = { value }
                        onChange = { onChange }
                        error = { errors.graduation }
                        />
                  )}
            />
            <Controller
                  name = "major"
                  control = { control }
                  render = {({ field: { value, onChange } }) => (
                     <Input
                        label="Major"
                        placeholder = "Computer Science"
                        type = "text"
                        required
                        value = { value }
                        onChange = { onChange }
                        error = { errors.major }
                        />
                  )}
            />
            <Controller
                  name = "idea"
                  control = { control }
                  render = {({ field: { value, onChange } }) => (
                     <Input
                        label="Idea"
                        placeholder = ""
                        type = "text"
                        value = { value }
                        onChange = { onChange }
                        error = { errors.idea }
                        />
                  )}
            />
         </div>
      </div>
   )
}
