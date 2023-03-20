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
   from: "Virginia Entrepreneurship Organization",
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
   const urlBuffer = Buffer.from(encodeURIComponent(url))
   const base64URL = urlBuffer.toString("base64")
   const emailURL = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/access/${base64URL}`
   return `Sign in to ${host}\n${emailURL}\n\n`
}

function html({ url, host, email }: Record<"url" | "host" | "email", string>) {
   const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`
   const escapedHost = `${host.replace(/\./g, "&#8203;.")}`

   const backgroundColor = "#030303"

   const textColor = "#d4d4d8"
   const mainBackgroundColor = "#121212"
   const buttonBackgroundColor = "#fafafa"
   const buttonBorderColor = "#fafafa"
   const buttonTextColor = "#030303"

   const urlBuffer = Buffer.from(encodeURIComponent(url))
   const base64URL = urlBuffer.toString("base64")
   const emailURL = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/access/${base64URL}`

   return `
   <body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${emailURL}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
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
