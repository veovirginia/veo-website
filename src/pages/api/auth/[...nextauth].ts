import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../lib/prismadb"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyPassword } from "../../../helpers/auth"

// Sign in
const ONE_DAY_IN_SECONDS = 24 * 60 * 60
const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60
async function authorize(
   credentials: { email: string; password: string } | undefined
) {
   if (!credentials) {
      throw new Error("Credentials must be provided.")
   }

   const user = await prisma.user.findUnique({
      where: {
         email: credentials.email,
      },
   })

   if (!user) {
      throw new Error("User not found.")
   }

   const isValid = await verifyPassword(credentials.password, user.password)

   if (!isValid) {
      throw new Error("Password not found for user.")
   }
   return {
      id: user.id,
      email: user.email,
      name: user.name,
      accountVerified: user.accountVerified,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
   }
}

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: {},
            password: {},
         },
         authorize,
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      async session({ session, token }: any) {
         const { user } = token
         session = { ...session, user }
         return session
      },
      async jwt({ token, user }: any) {
         if (user) {
            token.user = user
         }
         return token
      },
   },
   session: {
      strategy: "jwt",
      maxAge: THIRTY_DAYS_IN_SECONDS,
      updateAge: ONE_DAY_IN_SECONDS,
   },
})
