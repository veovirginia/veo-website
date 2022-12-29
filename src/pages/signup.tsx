import Link from "next/link"
import Input from "../components/Input"
import Layout from "../components/layouts/Layout"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames"
import axios from "axios"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import Router from "next/router"
import { getCsrfToken, getSession } from "next-auth/react"
import { BiX } from "react-icons/bi"
import Alert from "../components/Alert"

type Inputs = {
   name: string
   email: string
   password: string
}

const schema = yup.object().shape({
   name: yup.string().required("Name required"),
   email: yup
      .string()
      .email("Invalid email")
      .matches(/@virginia.edu/i, "Must be a UVA email")
      .required("Email required"),
   password: yup
      .string()
      .min(8, "Must be at least 8 characters")
      .max(32, "Must not exceed 32 characters")
      .matches(/(?=.*[a-z])/, "Must contain a lowercase letter")
      .matches(/(?=.*[A-Z])/, "Must contain an uppercase letter")
      .matches(/(?=.*[0-9])/, "Must contain a number")
      .matches(/(?=.*[-+_!@#$%^&*., ?])/, "Must contain a special character")
      .required("Password required"),
})

export default function Signup() {
   const [message, setMessage] = useState("")
   const [isVisible, setVisible] = useState(false)
   // Todo: add notification for messages
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
   } = useForm<Inputs>({
      resolver: yupResolver(schema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
      mode: "onChange",
   })
   const submitHandler = async (values: Inputs) => {
      try {
         const { data } = await axios({
            method: "post",
            url: "/api/auth/signup",
            data: values,
         })
         if (data.success) {
            Router.push("/login")
         }
      } catch (error: any) {
         console.log(error.response)
         setMessage("Unable to create account. Please try again later.")
         setVisible(true)
      }
      reset()
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
                  Join the premiere entrepreneurship community.
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
               <div className="pt-4 space-y-4 pb-8">
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
                  <Controller
                     name="password"
                     control={control}
                     render={({ field: { value, onChange } }) => (
                        <Input
                           label="Password"
                           placeholder="********"
                           type="password"
                           required
                           value={value}
                           onChange={onChange}
                           error={errors.password}
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
                  <span>Create account</span>
               </button>
               <div className="flex justify-center items-center pt-4 space-x-2">
                  <p className="text-noir-400">Already have an account?</p>
                  <Link href="/login" passHref>
                     <p className="cursor-pointer text-blue-500">Log in</p>
                  </Link>
               </div>
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
      props: {
         csrfToken: await getCsrfToken(context),
      },
   }
}
