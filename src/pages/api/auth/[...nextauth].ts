import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const { GOOGLE_CLIENT_ID = "", GOOGLE_CLIENT_SECRET = "" } = process.env

export default NextAuth({
   providers: [
      GoogleProvider({
         name: "Google",
         clientId: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/login",
   },
})
