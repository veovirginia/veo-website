import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

export default NextAuth({
   providers: [
      GoogleProvider({
         name: "Google",
         clientId: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
      }),
   ],
   secret: NEXTAUTH_SECRET,
   pages: {
      signIn: "/login",
   },
})
