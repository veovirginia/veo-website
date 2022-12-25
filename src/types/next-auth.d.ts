import NextAuth from "next-auth"

declare module "next-auth" {
   interface Session {
      user: {
         email: string
         name: string
         accountVerified: boolean
         emailVerified: boolean
         image: string
         role: string
      } & DefaultSession["user"]
   }
}
