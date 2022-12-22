import { signIn, getCsrfToken, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Layout from "../components/layouts/Layout"
import Input from "../components/Input"

type Inputs = {
   name: string
   email: string
   password: string
}

export default function Login() {
   // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
   const { control, handleSubmit } = useForm({
      defaultValues: {
         name: "",
         email: "",
         password: "",
         select: {},
      },
   })
   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

   return (
      <Layout>
         <div className="max-w-md mx-auto px-4 pt-16">
            <div className="text-center">
               <h1 className="text-4xl font-semibold text-white mx-auto">
                  Welcome to
                  {/* Animating gradient? */}
                  <span className="ml-2 bg-gradient-to-br from-[#2a63ff] via-[#613cf4] to-[#ea3be1] overflow-visible bg-clip-text text-transparent">
                     VEO
                  </span>
               </h1>
               <p className="text-lg pt-2 text-white opacity-60">
                  The premiere entrepreneurship organization
               </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="space-y-4 pt-12">
                  <Controller
                     name="name"
                     control={control}
                     render={({ field: { value, onChange } }) => (
                        <Input
                           label="Full name"
                           placeholder="John Doe"
                           type="text"
                           required
                           value={value}
                           // onChange={onChange}
                        />
                     )}
                  />
                  {/* <Input
                     label="Email"
                     placeholder="johndoe@email.com"
                     type="text"
                  />
                  <Input
                     label="Password"
                     placeholder="********"
                     type="password"
                  /> */}
               </div>
               {/* Hover animating gradient */}
               <div className="pt-8">
                  <button
                     onClick={() => signIn()}
                     className="w-full px-2 py-3 rounded-full bg-white text-black flex justify-center items-center space-x-2"
                  >
                     <span>Login</span>
                  </button>
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
