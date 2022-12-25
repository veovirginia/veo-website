import { signIn, getCsrfToken, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import AuthLayout from "../components/layouts/AuthLayout"
import Input from "../components/Input"
import axios from "axios"
import Link from "next/link"

type Inputs = {
   name: string
   email: string
   password: string
}

export default function Login() {
   // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
   const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      defaultValues: {
         email: "",
         password: "",
      },
      mode: "onBlur",
   })
   const submitHandler = async (values: any) => {
      const result = await signIn("credentials", {
         redirect: false,
         email: values.email,
         password: values.password,
      })

      if (!result?.error) {
         console.log("success")
      } else {
         console.log("unsuccessful login")
      }

      console.log(result)
   }

   return (
      <AuthLayout>
         <div className="max-w-sm w-full mx-auto px-4 pt-24">
            <div className="text-center">
               <h1 className="text-3xl font-semibold text-zinc-50 mx-auto">
                  Login
               </h1>
               <p className="text-base pt-2 text-noir-300">
                  Welcome back to VEO.
               </p>
            </div>
            <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
               <div className="w-full space-y-4 pt-10 pb-8">
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
                        />
                     )}
                  />
               </div>
               <button
                  type="submit"
                  // onClick={() => signIn()}
                  className="text-base w-full px-2 py-2 rounded bg-zinc-50 text-neutral-900 flex justify-center items-center space-x-2"
               >
                  <span>Login</span>
               </button>
               <div className="flex justify-center items-center pt-4 space-x-2">
                  <p className="text-noir-400">Don&apos;t have an account?</p>
                  <Link href="/signup" passHref>
                     <p className="cursor-pointer text-blue-500">Sign up</p>
                  </Link>
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
