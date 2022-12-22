import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../lib/prismadb"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyPassword } from "../../../helpers/auth"

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: {
               label: "email",
               type: "text",
            },
            password: { label: "password", type: "password" },
         },
         async authorize(credentials: any, req: any) {
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

            const isValid = await verifyPassword(
               credentials.password,
               user.password
            )

            if (!isValid) {
               throw new Error("Password not found for user.")
               return null
            }

            return {
               email: user.email,
               name: user.name,
               accountVerified: user.accountVerified,
               emailVerified: user.emailVerified,
               image: user.image,
               role: user.role,
            } as any // https://stackoverflow.com/a/74457313 or https://github.com/nextauthjs/next-auth/issues/2080
         },
      }),
   ],

   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      async session({ session, user, token }: any) {
         session.user.accessToken = token.accessToken
         session.user.refreshToken = token.refreshToken
         session.user.accessTokenExpires = token.accessTokenExpires

         return session
      },
   },

   session: {
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
   },
})
