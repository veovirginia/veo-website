import { Input } from "../components/inputs"
import Layout from "../components/layouts/Layout"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import Alert from "../components/Alert"
import { ArrowButton } from "../components/buttons"

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
   const [status, setStatus] = useState("")
   const [isVisible, setVisible] = useState(false)

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
      const { email } = values
      const response = await signIn("email", {
         email,
         redirect: false,
         callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/platform`,
      })
      if (response?.ok) {
         setMessage("Check your email for a signin link!")
         setStatus("success")
      } else {
         setMessage("Error signing in. Please try again.")
         setStatus("error")
      }
      setVisible(true)
   }
   return (
      <Layout
         page="Platform Access"
         description="Sign in using your UVA email to access the VEO Platform."
      >
         <div className="max-w-md w-full mx-auto pt-24 px-4">
            <div className="text-center pb-8">
               <h1 className="text-3xl font-bold text-white mx-auto font-display">
                  Welcome to
                  <span className="ml-2 bg-gradient-to-br from-[#2a63ff] via-[#613cf4] to-[#ea3be1] overflow-visible bg-clip-text text-transparent">
                     VEO
                  </span>
               </h1>
               <p className="text-base pt-2 text-noir-300">
                  Join the premiere entrepreneurship community
               </p>
            </div>
            {isVisible && message && status === "success" && (
               <Alert
                  message={message}
                  variant="success"
                  onClose={() => setVisible(!isVisible)}
               />
            )}
            {isVisible && message && status === "error" && (
               <Alert
                  message={message}
                  variant="error"
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
               <ArrowButton
                  text="Sign in"
                  type="submit"
                  disabled={!isValid}
                  direction="right"
                  className="w-full"
               />
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
            destination: "/platform",
         },
      }
   }

   return {
      props: {},
   }
}
