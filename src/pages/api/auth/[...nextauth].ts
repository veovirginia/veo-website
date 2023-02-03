import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../lib/prismadb"
import NextAuth from "next-auth/next"
import Email from "next-auth/providers/email"
import { NextAuthOptions } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { NextApiRequest, NextApiResponse } from "next"

export const ONE_DAY = 86400
export const SEVEN_DAYS = 604800

const EmailProvider = Email({
   id: "email",
   name: "email",
   server: {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
      },
   },
   from: process.env.EMAIL_FROM,
})

const session = async ({ session, token }: any) => {
   // TODO: type this
   const { user } = token

   return {
      ...session,
      user,
   }
}

const jwtCallback = async ({ token, user }: any) =>
   user ? { ...token, user } : token

const signIn = async ({ user }: any) => {
   const { email } = user as AdapterUser

   const dbUser = await prisma.user.upsert({
      where: {
         email,
      },
      update: {},
      create: {
         email: "dsoa@virginia.edu",
         name: "",
      },
   })

   return !!dbUser
}

export const authOptions = (): NextAuthOptions => ({
   adapter: PrismaAdapter(prisma),
   providers: [EmailProvider],
   pages: {
      signIn: "/access",
      // signOut: "/signout",
      // error: "/auth/error", // error code passed in query string as ?error=
      newUser: "/onboard", // new users will be directed here on first sign in (leave the property out if not of interest)
   },
   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      session,
      jwt: jwtCallback,
      signIn,
   },
   session: {
      strategy: "jwt",
      maxAge: ONE_DAY,
      updateAge: SEVEN_DAYS,
   },
})

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
   return NextAuth(req, res, authOptions())
}
