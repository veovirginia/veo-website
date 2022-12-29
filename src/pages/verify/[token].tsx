import { GetServerSidePropsContext } from "next"
import AuthLayout from "../../components/layouts/AuthLayout"
import axios from "axios"
import { ApiResponse } from "../../types/response"
import { useEffect, useState } from "react"

interface VerifyEmailProps {
   token: string
   response: ApiResponse
}

export default function VerifyEmail({ token, response }: VerifyEmailProps) {
   const [success, setSuccess] = useState(false)

   useEffect(() => {
      console.log(response)
      if (response.error) {
         setSuccess(false)
      }
   }, [response])
   return (
      <AuthLayout>
         <div className="max-w-sm w-full mx-auto px-4 pt-24 text-center text-noir-300">
            {success ? (
               <p className="">Email successfully verified!</p>
            ) : (
               <p className="">
                  Unable to verify account email at the moment. Please try again
                  later.
               </p>
            )}
         </div>
      </AuthLayout>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { query } = context
   let res
   try {
      const { data } = await axios(
         "http://localhost:3000/api/auth/verifyemail",
         {
            headers: {
               Authorization: `Bearer ${query.token}`,
            },
         }
      )
      res = data
   } catch (error: any) {
      res = { error: "Unable to verify email at the moment." }
   }

   return {
      props: {
         token: query.token,
         response: await res,
      },
   }
}
