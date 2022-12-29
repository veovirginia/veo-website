import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import { OnboardContextForm } from "../../../types/onboard"

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

   if (!req.headers.authorization) {
      return res.status(401).json({ error: "Must be logged in." })
   }

   const info: OnboardContextForm = req.body

   // Update account in DB
   //    try {
   //       await prisma.user.update(
   // 		where: {
   // 			email: ""
   // 		}, {
   //          data: {

   //          },
   //       })
   //    } catch (error: any) {
   //       console.log(error)
   //       throw error
   //    }

   // Return creation status
   return res.status(201).json({
      success: true,
      message: "Updated user.",
   })
}
