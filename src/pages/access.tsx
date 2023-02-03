import Input from "../components/Input"
import Layout from "../components/layouts/Layout"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"

import Alert from "../components/Alert"

interface FormFields {
   email: string
}

const schema = yup.object().shape({
   email: yup
      .string()
      .email("Invalid email")
      .matches(
         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@virginia.edu/i,
         "Must be a UVA email"
      )
      .required("Email required"),
})

export default function Access() {
   const [message, setMessage] = useState("")
   const [isVisible, setVisible] = useState(false)
   // Todo: add notification for messages
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm<FormFields>({
      resolver: yupResolver(schema),
      defaultValues: {
         email: "",
      },
      mode: "onChange",
   })
   const submitHandler = async (values: FormFields) => {
      console.log("dkso")
      const { email } = values
      const response = await signIn("email", { email })
      console.log(response)
   }
   return (
      <Layout>
         <div className="max-w-sm w-full mx-auto pt-24 px-4">
            <div className="text-center pb-4">
               <h1 className="text-3xl font-semibold text-white mx-auto">
                  Welcome to
                  {/* Animating gradient? */}
                  <span className="ml-2 bg-gradient-to-br from-[#2a63ff] via-[#613cf4] to-[#ea3be1] overflow-visible bg-clip-text text-transparent">
                     VEO
                  </span>
               </h1>
               <p className="text-base pt-2 text-noir-300">
                  Join the premiere entrepreneurship community
               </p>
            </div>
            {isVisible && message && (
               <Alert
                  message={message}
                  variant="alert"
                  onClose={() => setVisible(!isVisible)}
               />
            )}
            <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
               <div className="pt-4 space-y-4 pb-2">
                  <Controller
                     name="email"
                     control={control}
                     render={({ field: { value, onChange } }) => (
                        <Input
                           label="Email"
                           placeholder="johndoe@virginia.edu"
                           type="text"
                           required
                           value={value}
                           onChange={onChange}
                           error={errors.email}
                        />
                     )}
                  />
               </div>
               <button
                  type="submit"
                  disabled={!isValid}
                  className={cn(
                     "transition-colors duration-125 text-base w-full px-2 py-2 border rounded flex justify-center items-center space-x-2",
                     {
                        "bg-zinc-50 text-neutral-900 border-zinc-50": isValid,
                        "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                           !isValid,
                     }
                  )}
               >
                  <span>Sign in</span>
               </button>
            </form>
         </div>
      </Layout>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { req } = context
   const session = await getSession({ req })

   if (session) {
      return {
         redirect: {
            destination: "/onboard",
         },
      }
   }

   return {
      props: {},
   }
}
