import Link from "next/link"
import Input from "../components/Input"
import AuthLayout from "../components/layouts/AuthLayout"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames"
import axios from "axios"

type Inputs = {
   name: string
   email: string
   password: string
}

const schema = yup.object().shape({
   email: yup.string().email("Invalid email").required("Email required"),
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
      mode: "onBlur",
   })
   const submitHandler = async (values: any) => {
      const { data } = await axios({
         method: "post",
         url: "/api/auth/register",
         data: values,
      })
      console.log(data)
      reset()
   }
   return (
      <AuthLayout>
         <div className="max-w-sm w-full mx-auto pt-24 px-4">
            <div className="text-center">
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
            <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
               <div className="pt-10 space-y-4 pb-8">
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
      </AuthLayout>
   )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//    const { req } = context
//    const session = await getSession({ req })

//    if (session) {
//       return {
//          redirect: {
//             destination: "/onboard",
//          },
//       }
//    }

//    return {
//       props: {
//          csrfToken: await getCsrfToken(context),
//       },
//    }
// }
