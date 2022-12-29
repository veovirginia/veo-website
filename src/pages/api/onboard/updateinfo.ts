import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import { OnboardContextForm } from "../../../types/onboard"
import { getSession } from "next-auth/react"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   // Check empty body
   if (!req.body) {
      return res.status(400).json({ error: "Empty request body." })
   }

   // Check request method
   if (req.method !== "POST") {
      return res.status(405).json({ error: "Invalid HTTP method." })
   }

   const session = await getSession({ req })

   // Check if logged in
   if (!session) {
      return res.status(401).json({ error: "Must be logged in." })
   }

   const { info }: OnboardContextForm = req.body
   const { phone, graduation, major, idea } = info

   console.log(info)

   // Update account in DB
   try {
      await prisma.user.update({
         where: {
            email: session.user.email,
         },
         data: {
            phoneNumber: phone,
            graduation: graduation,
            major: major,
            idea: idea,
         },
      })
   } catch (error: any) {
      return res.status(500).json({
         error: "Unable to update user information. Please try again later.",
      })
   }

   // Return creation status
   return res.status(200).json({
      success: true,
      message: "Updated user.",
   })
}
