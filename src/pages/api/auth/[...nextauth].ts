import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../lib/prismadb"
import NextAuth from "next-auth/next"
import Email from "next-auth/providers/email"
import { NextAuthOptions } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { NextApiRequest, NextApiResponse } from "next"
import _ from "lodash"
import jwt, { verify } from "jsonwebtoken"
import Credentials from "next-auth/providers/credentials"
import nodemailer from "nodemailer"

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
   async sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
   }) {
      const { host } = new URL(url)
      const transport = nodemailer.createTransport(server)
      await transport.sendMail({
         to: email,
         from,
         subject: `Sign in to ${host}`,
         text: text({ url, host }),
         html: html({ url, host, email }),
      })
   },
})

function text({ url, host }: Record<"url" | "host", string>) {
   return `Sign in to ${host}\n${url}\n\n`
}

function html({ url, host, email }: Record<"url" | "host" | "email", string>) {
   // Insert invisible space into domains and email address to prevent both the
   // email address and the domain from being turned into a hyperlink by email
   // clients like Outlook and Apple mail, as this is confusing because it seems
   // like they are supposed to click on their email address to sign in.
   const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`
   const escapedHost = `${host.replace(/\./g, "&#8203;.")}`

   // Some simple styling options
   const backgroundColor = "#f9f9f9"

   return `
   <body style="background: ${backgroundColor};">
   Sign in to ${escapedHost}. Your signin link is <a href="${url}" target="_blank">${url}</a>
   </body>
 `
}

const CredentialsProvider = Credentials({
   id: "refresh-session",
   name: "refresh-session",
   credentials: {},
   // @ts-ignore
   async authorize(credentials: any) {
      const { token, refresh, email } = credentials

      if (token) {
         try {
            const id = await verify(token, process.env.NEXTAUTH_SECRET)
            if (!id) return null

            const dbUser = await prisma.user.findUnique({
               where: {
                  id: id as string,
               },
            })
            if (dbUser && dbUser.email !== email) return false
            if (!dbUser) return false
            return { ...dbUser, refresh }
         } catch (e) {
            console.log(e)
         }
      }
      return null
   },
})

const session = async ({ session, token }: any) => {
   // TODO: type this
   const { user } = token
   const authToken = jwt.sign(user.id, process.env.NEXTAUTH_SECRET)
   const sessionUser = _.omit(user, ["createdAt", "updatedAt", "emailVerified"])

   return {
      ...session,
      user: { ...sessionUser },
      token: authToken,
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
         email,
      },
   })

   return !!dbUser
}

export const authOptions = (): NextAuthOptions => ({
   adapter: PrismaAdapter(prisma),
   providers: [EmailProvider, CredentialsProvider],
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
