import { signIn, getCsrfToken, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import cn from "classnames"
import AuthLayout from "../components/layouts/Layout"
import Input from "../components/Input"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useState } from "react"
import Router from "next/router"
import Alert from "../components/Alert"

type Inputs = {
   name: string
   email: string
   password: string
}

const schema = yup.object().shape({
   email: yup
      .string()
      .email("Invalid email")
      .matches(/@virginia.edu/i, "Must be a UVA email")
      .required("Email required"),
   password: yup
      .string()
      .min(8, "Must be at least 8 characters")
      .max(32, "Must not exceed 32 characters")
      .required("Password required"),
})

export default function Login() {
   const [message, setMessage] = useState("")
   const [isVisible, setVisible] = useState(false)
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
   } = useForm<Inputs>({
      resolver: yupResolver(schema),
      defaultValues: {
         email: "",
         password: "",
      },
      mode: "onChange",
   })
   const submitHandler = async (values: Inputs) => {
      const response = await signIn("credentials", {
         redirect: false,
         email: values.email,
         password: values.password,
      })

      if (response?.error) {
         setMessage("Unable to login. Please try again later.")
         setVisible(true)
      } else {
         Router.push("/login")
      }
   }

   return (
      <AuthLayout>
         <div className="max-w-sm w-full mx-auto px-4 pt-24">
            <div className="text-center pb-4">
               <h1 className="text-3xl font-semibold text-zinc-50 mx-auto">
                  Platform Access
               </h1>
               <p className="text-base pt-2 text-noir-300">
                  Welcome back to VEO.
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
               <div className="w-full space-y-4 pt-4 pb-8">
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
                  <span>Log in</span>
               </button>
               <div className="flex justify-center items-center pt-4 space-x-2">
                  <p className="text-noir-400">Don&apos;t have an account?</p>
                  <p className="cursor-pointer text-blue-500">
                     <Link href="/signup" passHref>
                        Sign up
                     </Link>
                  </p>
               </div>
            </form>
         </div>
      </AuthLayout>
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
