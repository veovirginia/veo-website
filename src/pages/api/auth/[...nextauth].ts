import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../../lib/prismadb'
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const res = await fetch("/your/endpoint", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
      
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }      
      })
   ],
   secret: NEXTAUTH_SECRET,
   pages: {
      signIn: "/login",
   },
})
