declare global {
   namespace NodeJS {
      interface ProcessEnv {
         CREDENTIALS: string
         CALENDAR_ID: string
         GOOGLE_CLIENT_ID: string
         GOOGLE_CLIENT_SECRET: string
         NEXTAUTH_SECRET: string
         NEXT_PUBLIC_NEXTAUTH_URL: string
         NODE_ENV: "development" | "production" | "staging"
         MAILJET_API_KEY: string
         MAILJET_SECRET_KEY: string
      }
   }
}

export {}
